const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');
const os = require('os');
const QRCode = require('qrcode');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;

// Load question bank
const QUESTIONS_PATH = path.join(__dirname, 'data', 'questions.json');
function loadQuestionBank() {
  const raw = fs.readFileSync(QUESTIONS_PATH, 'utf8');
  return JSON.parse(raw);
}
let questionBank = loadQuestionBank();

// Classic KVIZBOX 11-step ladder (in points, no money) + endless bonus levels
const BASE_LADDER = [50, 100, 200, 400, 600, 800, 1200, 1600, 2400, 3600, 6000];
function getLadderValue(step) {
  if (step <= 0) return 0;
  if (step <= BASE_LADDER.length) return BASE_LADDER[step - 1];
  const extra = step - BASE_LADDER.length;
  if (extra === 1) return 8000;
  if (extra === 2) return 10000;
  if (extra === 3) return 13000;
  if (extra === 4) return 16000;
  return 16000 + (extra - 4) * 5000;
}

function getLanIp() {
  const nets = os.networkInterfaces();
  const candidates = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        candidates.push({ name, address: net.address });
      }
    }
  }
  // Prefer typical private Wi-Fi/LAN ranges (192.168.x.x, 10.x.x.x)
  const preferred = candidates.find(c => c.address.startsWith('192.168.') || c.address.startsWith('10.'));
  return (preferred || candidates[0])?.address || 'localhost';
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/network-info', (req, res) => {
  const lanIp = getLanIp();
  res.json({
    lanIp,
    port: PORT,
    lanUrl: `http://${lanIp}:${PORT}`
  });
});

app.get('/api/qr', async (req, res) => {
  try {
    const text = String(req.query.text || '');
    if (!text) return res.status(400).json({ error: 'Missing text' });
    const dataUrl = await QRCode.toDataURL(text, {
      width: 260,
      margin: 2,
      color: { dark: '#1a0a05', light: '#ffffff' }
    });
    res.json({ dataUrl });
  } catch (err) {
    res.status(500).json({ error: 'QR generation failed' });
  }
});

app.get('/api/questions', (req, res) => {
  // Reload from disk so edits to questions.json take effect without restart
  try {
    questionBank = loadQuestionBank();
  } catch (e) {
    // fallback to cached
  }
  res.json({
    categories: questionBank.categories,
    questions: questionBank.questions,
    baseLadder: BASE_LADDER
  });
});

// ==================== MULTIPLAYER ENGINE ====================
const rooms = new Map();

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return rooms.has(code) ? generateRoomCode() : code;
}

function clearRoomTimers(room) {
  if (room.timer) {
    clearInterval(room.timer);
    room.timer = null;
  }
  if (room.timeout) {
    clearTimeout(room.timeout);
    room.timeout = null;
  }
}

function getCategoryMap() {
  const m = new Map();
  for (const c of questionBank.categories) m.set(c.id, c);
  return m;
}

function sanitizeRoomForClient(room) {
  const catMap = getCategoryMap();
  const players = [...room.players.values()].map(p => ({
    id: p.id,
    name: p.name,
    isHost: p.isHost,
    status: p.status,
    score: p.score,
    currentStep: p.currentStep,
    hasAnswered: p.answered !== null,
    hasDecided: p.decision !== null,
    decision: room.phase === 'decision' ? null : p.decision,
    lastResult: p.lastResult,
    eliminatedAt: p.eliminatedAt || null
  }));

  let publicQuestion = null;
  if (room.currentQuestion && (room.phase === 'question' || room.phase === 'reveal')) {
    const q = room.currentQuestion;
    const cat = catMap.get(q.category);
    publicQuestion = {
      id: q.id,
      category: q.category,
      categoryName: cat ? `${cat.icon} ${cat.name}` : q.category,
      type: q.type,
      question: q.question,
      image: q.image || null,
      redImage: q.redImage || null,
      blueImage: q.blueImage || null,
      redText: q.redText || null,
      blueText: q.blueText || null,
      correct: room.phase === 'reveal' ? q.correct : null
    };
  }

  return {
    code: room.code,
    phase: room.phase,
    roundNumber: room.roundNumber,
    timeLeft: room.timeLeft,
    maxTime: room.maxTime,
    settings: room.settings,
    players,
    activeCount: players.filter(p => p.status === 'active').length,
    stoppedCount: players.filter(p => p.status === 'stopped').length,
    eliminatedCount: players.filter(p => p.status === 'eliminated').length,
    picker: room.picker,
    categoryOptions: room.categoryOptions,
    question: publicQuestion,
    revealData: room.phase === 'reveal' ? room.revealData : null,
    ladderCurrent: getLadderValue(room.roundNumber),
    ladderNext: getLadderValue(room.roundNumber + 1),
    baseLadder: BASE_LADDER,
    leaderboard: room.phase === 'gameover' ? computeLeaderboard(room) : null
  };
}

function emitRoomState(room) {
  const state = sanitizeRoomForClient(room);
  io.to(room.code).emit('room:state', state);
}

function computeLeaderboard(room) {
  const list = [...room.players.values()].map(p => ({
    id: p.id,
    name: p.name,
    status: p.status,
    score: p.score,
    currentStep: p.currentStep,
    totalAnswerTimeMs: p.totalAnswerTimeMs,
    eliminatedAt: p.eliminatedAt || null
  }));
  list.sort((a, b) => {
    // Primary: locked/active score descending
    if (b.score !== a.score) return b.score - a.score;
    // Secondary: how many questions they survived (furthest reached)
    if (b.currentStep !== a.currentStep) return b.currentStep - a.currentStep;
    // Tertiary: faster total answer time
    return a.totalAnswerTimeMs - b.totalAnswerTimeMs;
  });
  return list;
}

function getActivePlayers(room) {
  return [...room.players.values()].filter(p => p.status === 'active');
}

function getAvailableCategories(room) {
  const counts = new Map();
  for (const q of questionBank.questions) {
    if (!room.usedQuestionIds.has(q.id)) {
      counts.set(q.category, (counts.get(q.category) || 0) + 1);
    }
  }
  return questionBank.categories.filter(c => (counts.get(c.id) || 0) > 0);
}

function pickRandomQuestion(room, categoryId = null) {
  let pool = questionBank.questions.filter(q => !room.usedQuestionIds.has(q.id));
  if (pool.length === 0) {
    room.usedQuestionIds.clear();
    pool = [...questionBank.questions];
  }
  if (categoryId) {
    const catPool = pool.filter(q => q.category === categoryId);
    if (catPool.length > 0) pool = catPool;
  }

  // Balanced ~50/50 selection between photo questions and text_only questions
  const photoPool = pool.filter(q => q.type === 'two_images' || (q.type === 'one_image' && q.image));
  const textPool = pool.filter(q => q.type === 'text_only' || (q.type !== 'two_images' && !q.image));

  let targetPool = pool;
  if (photoPool.length > 0 && textPool.length > 0) {
    const pCnt = room.photoCount || 0;
    const tCnt = room.textCount || 0;
    const wantPhoto = pCnt === 0 && tCnt === 0
      ? Math.random() < 0.7
      : (pCnt <= tCnt ? Math.random() < 0.68 : Math.random() < 0.32);
    targetPool = wantPhoto ? photoPool : textPool;
  } else if (photoPool.length > 0) {
    targetPool = photoPool;
  } else if (textPool.length > 0) {
    targetPool = textPool;
  }

  const chosen = targetPool[Math.floor(Math.random() * targetPool.length)];
  room.usedQuestionIds.add(chosen.id);
  const isPhoto = chosen.type === 'two_images' || (chosen.type === 'one_image' && chosen.image);
  if (isPhoto) room.photoCount = (room.photoCount || 0) + 1;
  else room.textCount = (room.textCount || 0) + 1;
  return chosen;
}

function startReadyPhase(room) {
  clearRoomTimers(room);
  room.phase = 'ready';
  room.roundNumber = 0;
  room.usedQuestionIds.clear();
  room.photoCount = 0;
  room.textCount = 0;
  room.lastPickerId = null;
  room.currentCategoryId = null;
  room.currentQuestion = null;
  room.revealData = null;

  for (const p of room.players.values()) {
    p.status = 'active';
    p.score = 0;
    p.currentStep = 0;
    p.answered = null;
    p.decision = null;
    p.lastResult = null;
    p.totalAnswerTimeMs = 0;
    p.eliminatedAt = null;
  }

  room.timeLeft = 3;
  room.maxTime = 3;
  emitRoomState(room);

  room.timer = setInterval(() => {
    room.timeLeft--;
    if (room.timeLeft <= 0) {
      clearRoomTimers(room);
      startNextRound(room);
    } else {
      emitRoomState(room);
    }
  }, 1000);
}

function startNextRound(room) {
  clearRoomTimers(room);
  const active = getActivePlayers(room);
  if (active.length === 0) {
    finishGame(room);
    return;
  }

  room.roundNumber++;
  room.revealData = null;
  for (const p of room.players.values()) {
    p.answered = null;
    p.decision = null;
    p.lastResult = null;
  }

  const pickEvery = Number(room.settings.categoryPickEvery ?? 1);
  const shouldPickNow = pickEvery > 0 && ((room.roundNumber - 1) % pickEvery === 0);

  if (shouldPickNow) {
    startCategoryPickPhase(room, active);
  } else {
    const catId = pickEvery > 0 ? room.currentCategoryId : null;
    const q = pickRandomQuestion(room, catId);
    startQuestionPhase(room, q);
  }
}

function startCategoryPickPhase(room, activePlayers) {
  clearRoomTimers(room);
  let availCats = getAvailableCategories(room);
  if (availCats.length === 0) {
    room.usedQuestionIds.clear();
    availCats = getAvailableCategories(room);
  }

  // Pick a random active player (avoid repeating same picker if >= 2 active)
  let candidates = activePlayers;
  if (activePlayers.length > 1 && room.lastPickerId) {
    candidates = activePlayers.filter(p => p.id !== room.lastPickerId);
  }
  const picker = candidates[Math.floor(Math.random() * candidates.length)];
  room.lastPickerId = picker.id;
  room.picker = { id: picker.id, name: picker.name };

  // Shuffle and pick up to 4 categories for fast, fun choosing
  const shuffled = [...availCats].sort(() => Math.random() - 0.5);
  room.categoryOptions = shuffled.slice(0, Math.min(4, shuffled.length));

  room.phase = 'category_pick';
  room.timeLeft = room.settings.categoryPickTime;
  room.maxTime = room.settings.categoryPickTime;
  emitRoomState(room);

  room.timer = setInterval(() => {
    room.timeLeft--;
    if (room.timeLeft <= 0) {
      clearRoomTimers(room);
      const randCat = room.categoryOptions[Math.floor(Math.random() * room.categoryOptions.length)];
      room.currentCategoryId = randCat?.id || null;
      const q = pickRandomQuestion(room, room.currentCategoryId);
      startQuestionPhase(room, q);
    } else {
      emitRoomState(room);
    }
  }, 1000);
}

function startQuestionPhase(room, question) {
  clearRoomTimers(room);
  room.currentQuestion = question;
  room.picker = null;
  room.categoryOptions = null;
  room.phase = 'question';
  room.questionStartedAt = Date.now();
  room.timeLeft = room.settings.answerTime;
  room.maxTime = room.settings.answerTime;
  emitRoomState(room);

  room.timer = setInterval(() => {
    room.timeLeft--;
    if (room.timeLeft <= 0) {
      clearRoomTimers(room);
      revealRound(room);
    } else {
      emitRoomState(room);
    }
  }, 1000);
}

function revealRound(room) {
  clearRoomTimers(room);
  room.phase = 'reveal';
  const correct = room.currentQuestion.correct;
  let redCount = 0;
  let blueCount = 0;

  for (const p of room.players.values()) {
    if (p.status !== 'active') continue;
    if (p.answered === 'red') redCount++;
    if (p.answered === 'blue') blueCount++;

    if (p.answered === correct) {
      p.currentStep++;
      p.score = getLadderValue(p.currentStep);
      p.lastResult = 'correct';
    } else {
      p.status = 'eliminated';
      p.score = 0;
      p.eliminatedAt = room.roundNumber;
      p.lastResult = p.answered === null ? 'timeout' : 'wrong';
    }
  }

  room.revealData = { correct, redCount, blueCount };
  emitRoomState(room);

  room.timeout = setTimeout(() => {
    const remaining = getActivePlayers(room);
    if (remaining.length === 0) {
      finishGame(room);
    } else if (room.settings.allowStop && room.roundNumber >= room.settings.allowStopFrom) {
      startDecisionPhase(room);
    } else {
      startNextRound(room);
    }
  }, 3000);
}

function startDecisionPhase(room) {
  clearRoomTimers(room);
  room.phase = 'decision';
  room.timeLeft = room.settings.decisionTime;
  room.maxTime = room.settings.decisionTime;
  for (const p of room.players.values()) {
    p.decision = null;
  }
  emitRoomState(room);

  room.timer = setInterval(() => {
    room.timeLeft--;
    if (room.timeLeft <= 0) {
      clearRoomTimers(room);
      finalizeDecisions(room);
    } else {
      emitRoomState(room);
    }
  }, 1000);
}

function finalizeDecisions(room) {
  clearRoomTimers(room);
  for (const p of room.players.values()) {
    if (p.status !== 'active') continue;
    if (p.decision === 'stop') {
      p.status = 'stopped';
      // p.score stays locked in!
    }
    // If 'continue' or null (timed out), stays active and proceeds
  }

  const remaining = getActivePlayers(room);
  if (remaining.length === 0) {
    finishGame(room);
  } else {
    startNextRound(room);
  }
}

function finishGame(room) {
  clearRoomTimers(room);
  room.phase = 'gameover';
  room.timeLeft = 0;
  emitRoomState(room);
}

// ==================== SOCKET HANDLERS ====================
io.on('connection', (socket) => {
  let currentRoomCode = null;

  socket.on('room:create', ({ name } = {}, cb) => {
    const cleanName = String(name || 'Játékvezető').trim().slice(0, 18) || 'Játékvezető';
    const code = generateRoomCode();
    const room = {
      code,
      phase: 'lobby',
      roundNumber: 0,
      timeLeft: 0,
      maxTime: 0,
      settings: {
        answerTime: 10,
        decisionTime: 7,
        categoryPickTime: 10,
        allowStop: true,
        allowStopFrom: 3,
        categoryPickEvery: 1
      },
      players: new Map(),
      usedQuestionIds: new Set(),
      lastPickerId: null,
      picker: null,
      categoryOptions: null,
      currentQuestion: null,
      revealData: null,
      timer: null,
      timeout: null
    };

    room.players.set(socket.id, {
      id: socket.id,
      name: cleanName,
      isHost: true,
      status: 'active',
      score: 0,
      currentStep: 0,
      answered: null,
      decision: null,
      lastResult: null,
      totalAnswerTimeMs: 0
    });

    rooms.set(code, room);
    currentRoomCode = code;
    socket.join(code);

    if (typeof cb === 'function') cb({ ok: true, code, playerId: socket.id });
    emitRoomState(room);
  });

  socket.on('room:join', ({ code, name } = {}, cb) => {
    const cleanCode = String(code || '').trim().toUpperCase();
    const cleanName = String(name || 'Játékos').trim().slice(0, 18) || 'Játékos';
    const room = rooms.get(cleanCode);
    if (!room) {
      if (typeof cb === 'function') cb({ ok: false, error: 'Nem található ilyen szobakód!' });
      return;
    }

    const isLate = room.phase !== 'lobby';
    room.players.set(socket.id, {
      id: socket.id,
      name: cleanName,
      isHost: false,
      status: isLate ? 'eliminated' : 'active',
      score: 0,
      currentStep: 0,
      answered: null,
      decision: null,
      lastResult: null,
      totalAnswerTimeMs: 0
    });

    currentRoomCode = cleanCode;
    socket.join(cleanCode);

    if (typeof cb === 'function') cb({ ok: true, code: cleanCode, playerId: socket.id, spectator: isLate });
    emitRoomState(room);
  });

  socket.on('room:settings', (patch = {}) => {
    const room = rooms.get(currentRoomCode);
    if (!room || room.phase !== 'lobby') return;
    const player = room.players.get(socket.id);
    if (!player?.isHost) return;

    if ([8, 10, 12, 15].includes(Number(patch.answerTime))) {
      room.settings.answerTime = Number(patch.answerTime);
    }
    if (typeof patch.allowStop === 'boolean') {
      room.settings.allowStop = patch.allowStop;
    }
    if ([0, 1, 2, 3, 4].includes(Number(patch.categoryPickEvery))) {
      room.settings.categoryPickEvery = Number(patch.categoryPickEvery);
    }
    emitRoomState(room);
  });

  socket.on('room:start', () => {
    const room = rooms.get(currentRoomCode);
    if (!room || (room.phase !== 'lobby' && room.phase !== 'gameover')) return;
    const player = room.players.get(socket.id);
    if (!player?.isHost) return;
    try { questionBank = loadQuestionBank(); } catch (e) {}
    startReadyPhase(room);
  });

  socket.on('room:restart', () => {
    const room = rooms.get(currentRoomCode);
    if (!room) return;
    const player = room.players.get(socket.id);
    if (!player?.isHost) return;
    clearRoomTimers(room);
    room.phase = 'lobby';
    room.roundNumber = 0;
    room.currentQuestion = null;
    room.revealData = null;
    room.picker = null;
    room.categoryOptions = null;
    for (const p of room.players.values()) {
      p.status = 'active';
      p.score = 0;
      p.currentStep = 0;
      p.answered = null;
      p.decision = null;
      p.lastResult = null;
      p.totalAnswerTimeMs = 0;
    }
    emitRoomState(room);
  });

  socket.on('game:pick_category', ({ categoryId } = {}) => {
    const room = rooms.get(currentRoomCode);
    if (!room || room.phase !== 'category_pick') return;
    if (room.picker?.id !== socket.id) return;
    const valid = room.categoryOptions?.some(c => c.id === categoryId);
    if (!valid) return;

    clearRoomTimers(room);
    room.currentCategoryId = categoryId;
    const q = pickRandomQuestion(room, categoryId);
    startQuestionPhase(room, q);
  });

  socket.on('game:answer', ({ choice } = {}) => {
    const room = rooms.get(currentRoomCode);
    if (!room || room.phase !== 'question') return;
    if (choice !== 'red' && choice !== 'blue') return;
    const player = room.players.get(socket.id);
    if (!player || player.status !== 'active' || player.answered !== null) return;

    player.answered = choice;
    player.totalAnswerTimeMs += Math.max(0, Date.now() - room.questionStartedAt);

    // Check if all active players have answered
    const active = getActivePlayers(room);
    const allAnswered = active.every(p => p.answered !== null);
    if (allAnswered) {
      revealRound(room);
    } else {
      emitRoomState(room);
    }
  });

  socket.on('game:decision', ({ decision } = {}) => {
    const room = rooms.get(currentRoomCode);
    if (!room || room.phase !== 'decision') return;
    if (decision !== 'stop' && decision !== 'continue') return;
    const player = room.players.get(socket.id);
    if (!player || player.status !== 'active' || player.decision !== null) return;

    player.decision = decision;

    const active = getActivePlayers(room);
    const allDecided = active.every(p => p.decision !== null);
    if (allDecided) {
      finalizeDecisions(room);
    } else {
      emitRoomState(room);
    }
  });

  socket.on('room:leave', () => {
    handleLeave();
  });

  socket.on('disconnect', () => {
    handleLeave();
  });

  function handleLeave() {
    if (!currentRoomCode) return;
    const room = rooms.get(currentRoomCode);
    if (!room) {
      currentRoomCode = null;
      return;
    }
    const leaving = room.players.get(socket.id);
    room.players.delete(socket.id);
    socket.leave(currentRoomCode);
    currentRoomCode = null;

    if (room.players.size === 0) {
      clearRoomTimers(room);
      rooms.delete(room.code);
      return;
    }

    // Transfer host if host left
    if (leaving?.isHost) {
      const nextHost = room.players.values().next().value;
      if (nextHost) nextHost.isHost = true;
    }

    // If picker disconnected during category_pick, pick randomly immediately
    if (room.phase === 'category_pick' && room.picker?.id === socket.id) {
      clearRoomTimers(room);
      const randCat = room.categoryOptions?.[0];
      const q = pickRandomQuestion(room, randCat?.id);
      startQuestionPhase(room, q);
      return;
    }

    // Check if remaining active players all answered/decided
    const active = getActivePlayers(room);
    if (room.phase === 'question') {
      if (active.length === 0) {
        finishGame(room);
        return;
      }
      if (active.every(p => p.answered !== null)) {
        revealRound(room);
        return;
      }
    } else if (room.phase === 'decision') {
      if (active.length === 0) {
        finishGame(room);
        return;
      }
      if (active.every(p => p.decision !== null)) {
        finalizeDecisions(room);
        return;
      }
    }

    emitRoomState(room);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  const lanIp = getLanIp();
  console.log('====================================================');
  console.log('   KVIZBOX BLUE-RED (Think & Drink Pub Quiz) FUT!   ');
  console.log('====================================================');
  console.log(`  Helyi gép:       http://localhost:${PORT}`);
  console.log(`  Telefon/Tablet:  http://${lanIp}:${PORT}`);
  console.log(`  Kérdésbank:      ${questionBank.questions.length} kérdés (${questionBank.categories.length} témakör)`);
  console.log('====================================================');
});
