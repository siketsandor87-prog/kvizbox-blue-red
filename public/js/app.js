(() => {
  // ==================== SVG ASSETS ====================
  const THINK_DRINK_SVG = `
    <svg viewBox="0 0 260 96" xmlns="http://www.w3.org/2000/svg" aria-label="Think & Drink Pub Quiz">
      <defs>
        <filter id="glowPink" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- Magenta Neon ? -->
      <text x="8" y="68" font-family="Montserrat, sans-serif" font-weight="900" font-size="66"
            fill="none" stroke="#ff3ec8" stroke-width="3.2" filter="url(#glowPink)">?</text>
      <!-- THINK -->
      <text x="52" y="34" font-family="Montserrat, sans-serif" font-weight="900" font-size="29"
            fill="#ffe0f7" stroke="#ff2ebd" stroke-width="1.4" filter="url(#glowPink)">THINK</text>
      <!-- & -->
      <text x="158" y="34" font-family="Montserrat, sans-serif" font-weight="900" font-size="26"
            fill="#fff2a8" stroke="#ffb700" stroke-width="1.1">&amp;</text>
      <!-- DRINK -->
      <text x="52" y="68" font-family="Montserrat, sans-serif" font-weight="900" font-size="35"
            fill="#d6fbff" stroke="#18d8ff" stroke-width="1.6" filter="url(#glowCyan)">DRINK</text>
      <!-- Pub Quiz -->
      <text x="90" y="88" font-family="Pacifico, cursive" font-size="18"
            fill="#ffd84d" stroke="#804000" stroke-width="0.6">Pub Quiz</text>
      <!-- Neon Beer Mug -->
      <g transform="translate(194, 14)" stroke="#ff40d0" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#glowPink)">
        <path d="M8 14 C6 6 16 4 20 9 C24 3 36 5 35 14" stroke="#ffe5f8"/>
        <rect x="6" y="14" width="30" height="42" rx="5"/>
        <path d="M36 22 H44 C48 22 48 44 44 44 H36"/>
        <line x1="15" y1="22" x2="15" y2="48" stroke-width="2.2"/>
        <line x1="26" y1="22" x2="26" y2="48" stroke-width="2.2"/>
      </g>
    </svg>
  `;

  const NEON_MUG_SVG = `
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#ff9d2e" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 22 C14 12 26 8 33 14 C39 7 53 10 52 22" stroke="#fff0c4"/>
        <rect x="16" y="22" width="38" height="46" rx="7" fill="rgba(255,140,0,0.16)"/>
        <path d="M54 30 H64 C69 30 69 54 64 54 H54"/>
        <line x1="27" y1="32" x2="27" y2="58" stroke-width="2.6"/>
        <line x1="42" y1="32" x2="42" y2="58" stroke-width="2.6"/>
      </g>
    </svg>
  `;

  const CHECKMARK_SVG = `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8aff7a"/>
          <stop offset="50%" stop-color="#22c93b"/>
          <stop offset="100%" stop-color="#0b7a1e"/>
        </linearGradient>
      </defs>
      <path d="M26 108 L76 156 L176 42 L152 22 L74 112 L48 86 Z"
            fill="url(#chkGrad)" stroke="#e8ffe8" stroke-width="7" stroke-linejoin="round"/>
    </svg>
  `;

  const REDX_SVG = `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="xGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff8a8a"/>
          <stop offset="45%" stop-color="#eb1e1e"/>
          <stop offset="100%" stop-color="#8c0808"/>
        </linearGradient>
      </defs>
      <path d="M44 26 L100 82 L156 26 L174 44 L118 100 L174 156 L156 174 L100 118 L44 174 L26 156 L82 100 L26 44 Z"
            fill="url(#xGrad)" stroke="#ffe0e0" stroke-width="7" stroke-linejoin="round"/>
    </svg>
  `;

  function buildAlarmSVG(seconds) {
    const urgent = seconds <= 3;
    const numColor = urgent ? '#ff2424' : '#c91868';
    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Bells -->
        <ellipse cx="22" cy="22" rx="13" ry="9" transform="rotate(-35 22 22)" fill="#ff5ca8" stroke="#fff" stroke-width="2.5"/>
        <ellipse cx="78" cy="22" rx="13" ry="9" transform="rotate(35 78 22)" fill="#ff5ca8" stroke="#fff" stroke-width="2.5"/>
        <!-- Feet -->
        <line x1="28" y1="84" x2="20" y2="94" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
        <line x1="72" y1="84" x2="80" y2="94" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
        <!-- Body -->
        <circle cx="50" cy="54" r="36" fill="#ff74b8" stroke="#fff" stroke-width="3.5"/>
        <circle cx="50" cy="54" r="29" fill="#fff"/>
        <!-- Countdown number -->
        <text x="50" y="66" text-anchor="middle" font-family="Montserrat, sans-serif" font-weight="900"
              font-size="34" fill="${numColor}">${Math.max(0, seconds)}</text>
      </svg>
    `;
  }

  function makeFallbackImageData(label = 'KVIZBOX') {
    const safe = String(label).replace(/[<>&"]/g, '');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3c0d2e"/><stop offset="100%" stop-color="#140418"/></linearGradient></defs>
      <rect width="480" height="320" fill="url(#g)"/>
      <text x="240" y="150" text-anchor="middle" font-family="Montserrat,sans-serif" font-weight="900" font-size="42" fill="#ffd000">?</text>
      <text x="240" y="200" text-anchor="middle" font-family="Montserrat,sans-serif" font-weight="700" font-size="20" fill="#ffffff">${safe}</text>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function setImgWithFallback(imgEl, src, fallbackLabel) {
    imgEl.onerror = null;
    imgEl.onerror = () => {
      imgEl.onerror = null;
      imgEl.src = makeFallbackImageData(fallbackLabel);
    };
    imgEl.src = src || makeFallbackImageData(fallbackLabel);
  }

  // ==================== LADDER HELPER ====================
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

  // ==================== DOM ELEMENTS ====================
  const screens = {
    home: document.getElementById('screen-home'),
    soloSettings: document.getElementById('screen-solo-settings'),
    lobby: document.getElementById('screen-lobby'),
    ready: document.getElementById('screen-ready'),
    category: document.getElementById('screen-category'),
    question: document.getElementById('screen-question'),
    decision: document.getElementById('screen-decision'),
    gameover: document.getElementById('screen-gameover'),
    leaderboard: document.getElementById('screen-leaderboard')
  };

  const els = {
    btnHomeTop: document.getElementById('btn-home-top'),
    btnMute: document.getElementById('btn-mute'),
    screenHud: document.getElementById('screen-hud'),
    hudRound: document.getElementById('hud-round'),
    hudCategory: document.getElementById('hud-category'),
    hudAlive: document.getElementById('hud-alive'),
    hudScore: document.getElementById('hud-score'),
    spectatorBanner: document.getElementById('spectator-banner'),

    authLoggedOut: document.getElementById('auth-logged-out'),
    authLoggedIn: document.getElementById('auth-logged-in'),
    authHint: document.getElementById('auth-hint'),
    googleSigninBtn: document.getElementById('google-signin-btn'),
    btnGoogleUnconfigured: document.getElementById('btn-google-unconfigured'),
    authAvatar: document.getElementById('auth-avatar'),
    authName: document.getElementById('auth-name'),
    authMeta: document.getElementById('auth-meta'),
    btnLogout: document.getElementById('btn-logout'),
    btnLeaderboard: document.getElementById('btn-leaderboard'),
    lbTotalInfo: document.getElementById('lb-total-info'),
    lbMyBanner: document.getElementById('lb-my-banner'),
    globalLeaderboardList: document.getElementById('global-leaderboard-list'),
    btnLbBack: document.getElementById('btn-lb-back'),
    btnLbRefresh: document.getElementById('btn-lb-refresh'),
    gameoverRecordBadge: document.getElementById('gameover-record-badge'),
    btnGameoverLb: document.getElementById('btn-gameover-lb'),

    soloBestLabel: document.getElementById('solo-best-label'),
    kidsBestLabel: document.getElementById('kids-best-label'),
    btnKids: document.getElementById('btn-kids'),
    inputPlayerName: document.getElementById('input-player-name'),
    inputRoomCode: document.getElementById('input-room-code'),
    btnSolo: document.getElementById('btn-solo'),
    soloBankInfo: document.getElementById('solo-bank-info'),
    soloSettingCatFreq: document.getElementById('solo-setting-cat-freq'),
    soloSettingTime: document.getElementById('solo-setting-time'),
    soloSettingAllowStop: document.getElementById('solo-setting-allow-stop'),
    btnSoloBack: document.getElementById('btn-solo-back'),
    btnSoloLaunch: document.getElementById('btn-solo-launch'),
    btnCreateRoom: document.getElementById('btn-create-room'),
    btnJoinRoom: document.getElementById('btn-join-room'),
    homeError: document.getElementById('home-error'),

    lobbyCode: document.getElementById('lobby-code'),
    lobbyQr: document.getElementById('lobby-qr'),
    lobbyUrl: document.getElementById('lobby-url'),
    lobbyPlayerCount: document.getElementById('lobby-player-count'),
    lobbyPlayers: document.getElementById('lobby-players'),
    lobbySettingsCol: document.getElementById('lobby-settings-col'),
    settingTime: document.getElementById('setting-time'),
    settingAllowStop: document.getElementById('setting-allow-stop'),
    settingCatFreq: document.getElementById('setting-cat-freq'),
    btnLeaveRoom: document.getElementById('btn-leave-room'),
    btnStartMp: document.getElementById('btn-start-mp'),
    lobbyWaitMsg: document.getElementById('lobby-wait-msg'),

    readyCountdown: document.getElementById('ready-countdown'),

    catPickerBadge: document.getElementById('cat-picker-badge'),
    catPrompt: document.getElementById('cat-prompt'),
    catAlarm: document.getElementById('cat-alarm'),
    catGrid: document.getElementById('cat-grid'),

    qLayoutTwo: document.getElementById('q-layout-two'),
    qTwoText: document.getElementById('q-two-text'),
    qTwoRedImg: document.getElementById('q-two-red-img'),
    qTwoBlueImg: document.getElementById('q-two-blue-img'),
    qTwoAlarm: document.getElementById('q-two-alarm'),
    qCardRed: document.querySelector('.q-card-red'),
    qCardBlue: document.querySelector('.q-card-blue'),

    qLayoutOne: document.getElementById('q-layout-one'),
    qOneImg: document.getElementById('q-one-img'),
    qOneText: document.getElementById('q-one-text'),
    qOneRedBtn: document.getElementById('q-one-red-btn'),
    qOneBlueBtn: document.getElementById('q-one-blue-btn'),
    qOneAlarm: document.getElementById('q-one-alarm'),

    qLayoutText: document.getElementById('q-layout-text'),
    qTextCatBadge: document.getElementById('q-text-cat-badge'),
    qTextCatIcon: document.getElementById('q-text-cat-icon'),
    qTextCatName: document.getElementById('q-text-cat-name'),
    qTextQuestion: document.getElementById('q-text-question'),
    qTextRedBtn: document.getElementById('q-text-red-btn'),
    qTextBlueBtn: document.getElementById('q-text-blue-btn'),
    qTextAlarm: document.getElementById('q-text-alarm'),

    resultOverlay: document.getElementById('result-overlay'),
    mpAnsweredPill: document.getElementById('mp-answered-pill'),

    decAlarm: document.getElementById('dec-alarm'),
    decCurrentVal: document.getElementById('dec-current-val'),
    decNextVal: document.getElementById('dec-next-val'),
    decisionLadder: document.getElementById('decision-ladder'),
    btnDecStop: document.getElementById('btn-dec-stop'),
    btnDecContinue: document.getElementById('btn-dec-continue'),
    decStatusPill: document.getElementById('dec-status-pill'),

    gameoverTitle: document.getElementById('gameover-title'),
    gameoverSubtitle: document.getElementById('gameover-subtitle'),
    gameoverLeaderboard: document.getElementById('gameover-leaderboard'),
    btnPlayAgain: document.getElementById('btn-play-again'),
    btnBackHome: document.getElementById('btn-back-home'),

    arcadeBtnRed: document.getElementById('arcade-btn-red'),
    arcadeBtnBlue: document.getElementById('arcade-btn-blue')
  };

  // Inject static SVGs
  document.querySelectorAll('[data-logo="thinkdrink"]').forEach(el => {
    el.innerHTML = THINK_DRINK_SVG;
  });
  document.querySelector('.neon-icon-mug').innerHTML = NEON_MUG_SVG;

  // ==================== APP STATE ====================
  let mode = 'idle'; // 'idle' | 'solo' | 'multiplayer'
  let questionBank = { categories: [], questions: [] };
  let kidsBank = { categories: [], questions: [] };
  let networkInfo = { lanUrl: window.location.origin };

  // Solo state
  const savedSoloSettings = (() => {
    try { return JSON.parse(localStorage.getItem('kvizbox_solo_settings') || '{}'); } catch { return {}; }
  })();
  const solo = {
    isKidsMode: false,
    phase: 'idle',
    roundNumber: 0,
    score: 0,
    usedIds: new Set(),
    currentCategoryId: null,
    currentQuestion: null,
    timeLeft: 0,
    timer: null,
    timeout: null,
    answered: null,
    bestScore: Number(localStorage.getItem('kvizbox_solo_best') || 0),
    kidsBestScore: Number(localStorage.getItem('kvizbox_kids_best') || 0),
    settings: {
      categoryPickEvery: savedSoloSettings.categoryPickEvery !== undefined ? Number(savedSoloSettings.categoryPickEvery) : 1,
      answerTime: Number(savedSoloSettings.answerTime) || 10,
      allowStop: savedSoloSettings.allowStop !== undefined ? Boolean(savedSoloSettings.allowStop) : true
    }
  };

  function getActiveSoloBank() {
    return solo.isKidsMode ? kidsBank : questionBank;
  }

  // Multiplayer state
  let socket = null;
  const mp = {
    myId: null,
    roomCode: null,
    state: null,
    myChoice: null,
    myDecision: null,
    lastPhase: null,
    lastTimeLeft: null,
    lastRound: null
  };

  // ==================== INIT ====================
  els.soloBestLabel.textContent = solo.bestScore;
  if (els.kidsBestLabel) els.kidsBestLabel.textContent = solo.kidsBestScore;
  els.btnMute.textContent = window.kvizSound.muted ? '🔇' : '🔊';

  // Restore saved player name
  const savedName = localStorage.getItem('kvizbox_player_name');
  if (savedName) els.inputPlayerName.value = savedName;

  // Check URL ?room=XXXX for instant QR join
  const urlParams = new URLSearchParams(window.location.search);
  const urlRoom = urlParams.get('room');
  if (urlRoom) {
    els.inputRoomCode.value = urlRoom.toUpperCase().slice(0, 4);
    setTimeout(() => els.inputPlayerName.focus(), 200);
  }

  // Preload question bank & network info
  fetch('/api/questions')
    .then(r => r.json())
    .then(data => {
      questionBank = data;
      if (els.soloBankInfo) {
        const photoCnt = data.questions.filter(q => q.type === 'two_images' || (q.type === 'one_image' && q.image)).length;
        const textCnt = data.questions.length - photoCnt;
        els.soloBankInfo.textContent = textCnt > 0
          ? `${data.questions.length} kérdés (${photoCnt} képes + ${textCnt} szöveges) • ${data.categories.length} témakör`
          : `${data.questions.length} képes kérdés • ${data.categories.length} témakör`;
      }
    })
    .catch(() => {});

  fetch('/api/kids-questions')
    .then(r => r.json())
    .then(data => { kidsBank = data; })
    .catch(() => {});

  fetch('/api/network-info')
    .then(r => r.json())
    .then(info => { networkInfo = info; })
    .catch(() => {});

  // ==================== GOOGLE AUTH & LEADERBOARD ====================
  const auth = {
    token: localStorage.getItem('kvizbox_auth_token') || null,
    user: null,
    rank: null,
    googleClientId: null,
    gsiInitialized: false,
    prevScreenBeforeLb: 'home'
  };

  function renderAuthUI() {
    if (auth.user) {
      els.authLoggedOut.classList.add('hidden');
      els.authLoggedIn.classList.remove('hidden');
      if (els.authHint) els.authHint.classList.add('hidden');
      els.authName.textContent = auth.user.name || 'Játékos';
      const rankTxt = auth.rank ? ` • #${auth.rank}.` : '';
      els.authMeta.textContent = `Rekord: ${auth.user.bestScore || 0} PT${rankTxt}`;
      if (auth.user.picture) {
        els.authAvatar.src = auth.user.picture;
        els.authAvatar.classList.remove('hidden');
      } else {
        els.authAvatar.classList.add('hidden');
      }
      if ((auth.user.bestScore || 0) > solo.bestScore) {
        solo.bestScore = auth.user.bestScore;
        localStorage.setItem('kvizbox_solo_best', String(solo.bestScore));
        els.soloBestLabel.textContent = solo.bestScore;
      }
      if (!els.inputPlayerName.value.trim() && auth.user.name) {
        els.inputPlayerName.value = auth.user.name.slice(0, 18);
      }
    } else {
      els.authLoggedIn.classList.add('hidden');
      els.authLoggedOut.classList.remove('hidden');
      if (els.authHint) els.authHint.classList.remove('hidden');
    }
  }

  async function handleGoogleCredential(response) {
    if (!response?.credential) return;
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credential: response.credential,
          localBestScore: solo.bestScore || 0
        })
      });
      const data = await res.json();
      if (!data.ok) {
        showHomeError(data.error || 'Sikertelen Google bejelentkezés.');
        return;
      }
      showHomeError('');
      auth.token = data.token;
      auth.user = data.user;
      auth.rank = data.rank;
      localStorage.setItem('kvizbox_auth_token', data.token);
      renderAuthUI();
    } catch {
      showHomeError('Hálózati hiba a Google bejelentkezés során.');
    }
  }

  function tryRenderGoogleButton() {
    if (!auth.googleClientId) return;
    if (window.google?.accounts?.id) {
      if (!auth.gsiInitialized) {
        window.google.accounts.id.initialize({
          client_id: auth.googleClientId,
          callback: handleGoogleCredential
        });
        auth.gsiInitialized = true;
      }
      els.googleSigninBtn.innerHTML = '';
      window.google.accounts.id.renderButton(els.googleSigninBtn, {
        theme: 'filled_black',
        size: 'medium',
        shape: 'pill',
        text: 'signin_with',
        locale: 'hu'
      });
      els.btnGoogleUnconfigured.classList.add('hidden');
    } else {
      setTimeout(tryRenderGoogleButton, 400);
    }
  }

  async function initGoogleAuth() {
    try {
      const cfgRes = await fetch('/api/auth/config');
      const cfg = await cfgRes.json();
      auth.googleClientId = cfg.googleClientId || null;
      if (auth.googleClientId) {
        tryRenderGoogleButton();
      } else {
        els.btnGoogleUnconfigured.classList.remove('hidden');
      }
    } catch {
      // ignore
    }

    if (auth.token) {
      try {
        const meRes = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        if (meRes.ok) {
          const data = await meRes.json();
          if (data.ok && data.user) {
            auth.user = data.user;
            auth.rank = data.rank;
          }
        } else {
          auth.token = null;
          localStorage.removeItem('kvizbox_auth_token');
        }
      } catch {
        // offline or transient
      }
    }
    renderAuthUI();
  }

  function logoutGoogle() {
    auth.token = null;
    auth.user = null;
    auth.rank = null;
    localStorage.removeItem('kvizbox_auth_token');
    try { window.google?.accounts?.id?.disableAutoSelect(); } catch {}
    renderAuthUI();
    if (auth.googleClientId) tryRenderGoogleButton();
  }

  async function submitScoreToAccount(score, round, gameMode) {
    if (!auth.token) {
      if (score > 0) {
        els.gameoverRecordBadge.textContent = '💡 Tipp: Jelentkezz be Google fiókkal a főmenüben, hogy a rekordjaid elmentődjenek a ranglistára!';
        els.gameoverRecordBadge.classList.add('guest-tip');
        els.gameoverRecordBadge.classList.remove('hidden');
      }
      return;
    }
    els.gameoverRecordBadge.classList.remove('guest-tip');
    try {
      const res = await fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify({ score, round, mode: gameMode })
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.ok && data.user) {
        auth.user = data.user;
        auth.rank = data.rank;
        renderAuthUI();
        if (data.isNewRecord && score > 0) {
          els.gameoverRecordBadge.textContent = `🏆 ÚJ GOOGLE REKORD! #${data.rank}. hely a ranglistán!`;
          els.gameoverRecordBadge.classList.remove('hidden');
        } else if (data.rank) {
          els.gameoverRecordBadge.textContent = `☁️ Mentve a Google fiókodhoz • #${data.rank}. hely (${data.user.bestScore} PT)`;
          els.gameoverRecordBadge.classList.remove('hidden');
        }
      }
    } catch {
      // ignore
    }
  }

  async function openGlobalLeaderboard(returnScreen = 'home') {
    auth.prevScreenBeforeLb = returnScreen;
    els.lbTotalInfo.textContent = 'Betöltés...';
    els.lbMyBanner.classList.add('hidden');
    els.globalLeaderboardList.innerHTML = '<div class="glb-empty">Ranglista betöltése...</div>';
    showScreen('leaderboard');

    try {
      const headers = auth.token ? { Authorization: `Bearer ${auth.token}` } : {};
      const res = await fetch('/api/leaderboard', { headers });
      const data = await res.json();
      if (!data.ok) throw new Error();

      els.lbTotalInfo.textContent = `${data.totalPlayers} regisztrált játékos • Top 50`;

      if (data.me) {
        els.lbMyBanner.textContent = `Te: #${data.me.rank}. hely • Rekord: ${data.me.bestScore} PONT (${data.me.gamesPlayed} játék)`;
        els.lbMyBanner.classList.remove('hidden');
      } else {
        els.lbMyBanner.textContent = 'Jelentkezz be Google fiókkal a főmenüben, hogy a rekordod felkerüljön a ranglistára!';
        els.lbMyBanner.classList.remove('hidden');
      }

      if (!data.leaderboard.length) {
        els.globalLeaderboardList.innerHTML = '<div class="glb-empty">Még nincs mentett rekord a ranglistán.<br/>Jelentkezz be Google fiókkal és légy te az első bajnok! 🏆</div>';
        return;
      }

      const medals = ['🥇', '🥈', '🥉'];
      els.globalLeaderboardList.innerHTML = data.leaderboard.map((u, idx) => {
        const rankLabel = medals[idx] || `${u.rank}.`;
        const isMe = auth.user && u.sub === auth.user.sub;
        const avatarHtml = u.picture
          ? `<img class="glb-avatar" src="${escapeHtml(u.picture)}" alt="" referrerpolicy="no-referrer" />`
          : `<div class="glb-avatar"></div>`;
        return `
          <div class="glb-row ${idx === 0 ? 'rank-1' : ''} ${isMe ? 'is-me' : ''}">
            <div class="glb-rank">${rankLabel}</div>
            ${avatarHtml}
            <div class="glb-name">${escapeHtml(u.name)}${isMe ? ' (Te)' : ''}</div>
            <div class="glb-meta">${u.bestRound || 0}. kör • ${u.gamesPlayed || 0} játék</div>
            <div class="glb-score">${u.bestScore} PT</div>
          </div>
        `;
      }).join('');
    } catch {
      els.globalLeaderboardList.innerHTML = '<div class="glb-empty">Nem sikerült betölteni a ranglistát. Próbáld újra!</div>';
    }
  }

  initGoogleAuth();

  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => {
      el.classList.toggle('active', key === name);
    });
    const inGame = name !== 'home';
    els.btnHomeTop.classList.toggle('hidden', !inGame);
    const showHud = ['category', 'question', 'decision'].includes(name);
    els.screenHud.classList.toggle('hidden', !showHud);
    if (!showHud) els.spectatorBanner.classList.add('hidden');
  }

  function showHomeError(msg) {
    if (!msg) {
      els.homeError.classList.add('hidden');
      return;
    }
    els.homeError.textContent = msg;
    els.homeError.classList.remove('hidden');
  }

  function setAlarm(container, seconds) {
    if (seconds === null || seconds === Infinity) {
      container.innerHTML = `<div class="alarm-unlimited" title="Nincs időkorlát!"><span class="inf-sym">∞</span><span class="inf-lbl">NYUGIS</span></div>`;
      container.classList.remove('urgent');
      return;
    }
    container.innerHTML = buildAlarmSVG(seconds);
    container.classList.toggle('urgent', seconds <= 3 && seconds > 0);
  }

  function renderLadder(currentStep) {
    // Show 11 steps: normally 1..11; if currentStep >= 11, shift window upward!
    const topStep = Math.max(11, currentStep + 2);
    const bottomStep = topStep - 10;
    let html = '';
    for (let s = topStep; s >= bottomStep; s--) {
      const val = getLadderValue(s);
      let cls = 'ladder-row';
      if (s === currentStep + 1) cls += ' next-target';
      else if (s === currentStep) cls += ' current';
      else if (s < currentStep) cls += ' achieved';
      html += `<div class="${cls}">${val} PONT</div>`;
    }
    els.decisionLadder.innerHTML = html;
  }

  function updateArcadeButtons(enabled, redLabel = 'PIROS', blueLabel = 'KÉK') {
    els.arcadeBtnRed.disabled = !enabled;
    els.arcadeBtnBlue.disabled = !enabled;
    els.arcadeBtnRed.querySelector('span').textContent = redLabel;
    els.arcadeBtnBlue.querySelector('span').textContent = blueLabel;
  }

  // ==================== SOLO ENGINE ====================
  function clearSoloTimers() {
    if (solo.timer) { clearInterval(solo.timer); solo.timer = null; }
    if (solo.timeout) { clearTimeout(solo.timeout); solo.timeout = null; }
  }

  function openSoloSettings() {
    window.kvizSound.ensureContext();
    window.kvizSound.buttonClick('red');
    els.soloSettingCatFreq.value = String(solo.settings.categoryPickEvery);
    els.soloSettingTime.value = String(solo.settings.answerTime);
    els.soloSettingAllowStop.checked = solo.settings.allowStop;
    if (questionBank.questions.length) {
      els.soloBankInfo.textContent = `${questionBank.questions.length} képes kérdés • ${questionBank.categories.length} témakör`;
    }
    updateArcadeButtons(false);
    showScreen('soloSettings');
  }

  function saveSoloSettingsFromUI() {
    solo.settings.categoryPickEvery = Number(els.soloSettingCatFreq.value);
    solo.settings.answerTime = Number(els.soloSettingTime.value) || 10;
    solo.settings.allowStop = els.soloSettingAllowStop.checked;
    localStorage.setItem('kvizbox_solo_settings', JSON.stringify(solo.settings));
  }

  async function startSoloGame() {
    window.kvizSound.ensureContext();
    window.kvizSound.buttonClick('red');
    saveSoloSettingsFromUI();
    try {
      const res = await fetch('/api/questions');
      questionBank = await res.json();
    } catch (e) {
      if (!questionBank.questions.length) {
        showHomeError('Nem sikerült betölteni a kérdésbankot!');
        return;
      }
    }

    mode = 'solo';
    solo.isKidsMode = false;
    clearSoloTimers();
    solo.roundNumber = 0;
    solo.score = 0;
    solo.usedIds.clear();
    solo.photoCount = 0;
    solo.textCount = 0;
    solo.currentCategoryId = null;
    solo.answered = null;
    solo.phase = 'ready';

    els.hudAlive.classList.add('hidden');
    els.spectatorBanner.classList.add('hidden');
    updateArcadeButtons(false);
    showScreen('ready');

    let count = 3;
    els.readyCountdown.textContent = count;
    window.kvizSound.readyBeep(count);

    solo.timer = setInterval(() => {
      count--;
      if (count <= 0) {
        clearSoloTimers();
        soloNextRound();
      } else {
        els.readyCountdown.textContent = count;
        window.kvizSound.readyBeep(count);
      }
    }, 1000);
  }

  async function startKidsGame() {
    window.kvizSound.ensureContext();
    window.kvizSound.buttonClick('blue');
    try {
      const res = await fetch('/api/kids-questions');
      kidsBank = await res.json();
    } catch (e) {
      if (!kidsBank.questions.length) {
        showHomeError('Nem sikerült betölteni a gyerek kérdésbankot!');
        return;
      }
    }

    mode = 'solo';
    solo.isKidsMode = true;
    clearSoloTimers();
    solo.roundNumber = 0;
    solo.score = 0;
    solo.usedIds.clear();
    solo.photoCount = 0;
    solo.textCount = 0;
    solo.currentCategoryId = null;
    solo.answered = null;
    solo.phase = 'ready';

    els.hudAlive.classList.add('hidden');
    els.spectatorBanner.classList.add('hidden');
    updateArcadeButtons(false);
    showScreen('ready');

    let count = 3;
    els.readyCountdown.textContent = count;
    window.kvizSound.readyBeep(count);

    solo.timer = setInterval(() => {
      count--;
      if (count <= 0) {
        clearSoloTimers();
        soloNextRound();
      } else {
        els.readyCountdown.textContent = count;
        window.kvizSound.readyBeep(count);
      }
    }, 1000);
  }

  function soloNextRound() {
    clearSoloTimers();
    solo.roundNumber++;
    solo.answered = null;
    els.hudRound.textContent = solo.isKidsMode
      ? `🧸 GYEREK • ${solo.roundNumber}. kérdés`
      : `${solo.roundNumber}. kérdés`;
    els.hudScore.textContent = `${solo.score} PONT`;
    els.hudCategory.classList.add('hidden');

    const pickEvery = solo.isKidsMode ? 1 : solo.settings.categoryPickEvery;
    const shouldPickNow = pickEvery > 0 && ((solo.roundNumber - 1) % pickEvery === 0);

    if (shouldPickNow) {
      soloStartCategoryPick();
    } else {
      const catId = pickEvery > 0 ? solo.currentCategoryId : null;
      soloPickQuestion(catId);
    }
  }

  function soloStartCategoryPick() {
    clearSoloTimers();
    solo.phase = 'category';
    updateArcadeButtons(false);

    const bank = getActiveSoloBank();
    let availCats = bank.categories.filter(c =>
      bank.questions.some(q => q.category === c.id && !solo.usedIds.has(q.id))
    );
    if (availCats.length === 0) {
      solo.usedIds.clear();
      availCats = [...bank.categories];
    }

    const options = [...availCats].sort(() => Math.random() - 0.5).slice(0, 4);
    els.catPickerBadge.textContent = solo.isKidsMode ? '🧸 VÁLASSZ TÉMAKÖRT!' : 'TÉMAKÖR VÁLASZTÁS';
    els.catPrompt.textContent = solo.isKidsMode
      ? 'Melyik témából jöjjön a következő kérdés? Nyugodtan választhatsz!'
      : 'Válassz témakört a következő kérdéshez!';
    els.catGrid.innerHTML = '';

    options.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'cat-btn';
      btn.innerHTML = `<span class="cat-btn-icon">${cat.icon}</span><span class="cat-btn-name">${cat.name}</span>`;
      btn.addEventListener('click', () => {
        window.kvizSound.buttonClick('blue');
        soloPickQuestion(cat.id);
      });
      els.catGrid.appendChild(btn);
    });

    window.kvizSound.categoryPick();
    showScreen('category');

    if (solo.isKidsMode) {
      solo.timeLeft = null;
      setAlarm(els.catAlarm, null);
      return;
    }

    solo.timeLeft = 10;
    setAlarm(els.catAlarm, solo.timeLeft);

    solo.timer = setInterval(() => {
      solo.timeLeft--;
      if (solo.timeLeft <= 0) {
        clearSoloTimers();
        const rand = options[Math.floor(Math.random() * options.length)];
        soloPickQuestion(rand.id);
      } else {
        setAlarm(els.catAlarm, solo.timeLeft);
        if (solo.timeLeft <= 3) window.kvizSound.tick(true);
      }
    }, 1000);
  }

  function soloPickQuestion(categoryId) {
    clearSoloTimers();
    if (categoryId) solo.currentCategoryId = categoryId;
    const bank = getActiveSoloBank();

    let pool = categoryId
      ? bank.questions.filter(q => !solo.usedIds.has(q.id) && q.category === categoryId)
      : bank.questions.filter(q => !solo.usedIds.has(q.id));
    if (pool.length === 0) {
      pool = bank.questions.filter(q => !solo.usedIds.has(q.id));
    }
    if (pool.length === 0) {
      solo.usedIds.clear();
      pool = [...bank.questions];
    }

    let diffPool = pool;
    if (!solo.isKidsMode) {
      // Progressive difficulty based on solo.roundNumber (adult mode)
      const rn = solo.roundNumber || 1;
      if (rn <= 2) {
        const p = pool.filter(q => (q.difficulty || 1) <= 2);
        if (p.length > 0) diffPool = p;
      } else if (rn <= 4) {
        const p = pool.filter(q => (q.difficulty || 1) >= 2);
        if (p.length > 0) diffPool = p;
      } else {
        const p3 = pool.filter(q => (q.difficulty || 1) >= 3);
        const p2 = pool.filter(q => (q.difficulty || 1) >= 2);
        if (p3.length > 0) diffPool = p3;
        else if (p2.length > 0) diffPool = p2;
      }
    }

    // Balanced selection: ~62% photo in Kids Mode, ~50% photo in Adult Mode
    const photoPool = diffPool.filter(q => q.type === 'two_images' || (q.type === 'one_image' && q.image));
    const textPool = diffPool.filter(q => q.type === 'text_only' || (q.type !== 'two_images' && !q.image));
    let targetPool = diffPool;
    if (photoPool.length > 0 && textPool.length > 0) {
      const pCnt = solo.photoCount || 0;
      const tCnt = solo.textCount || 0;
      let wantPhoto;
      if (solo.isKidsMode) {
        wantPhoto = pCnt <= tCnt * 1.5 ? Math.random() < 0.72 : Math.random() < 0.35;
      } else {
        wantPhoto = pCnt === 0 && tCnt === 0
          ? Math.random() < 0.7
          : (pCnt <= tCnt ? Math.random() < 0.68 : Math.random() < 0.32);
      }
      targetPool = wantPhoto ? photoPool : textPool;
    } else if (photoPool.length > 0) {
      targetPool = photoPool;
    } else if (textPool.length > 0) {
      targetPool = textPool;
    }

    const rawQ = targetPool[Math.floor(Math.random() * targetPool.length)];
    solo.usedIds.add(rawQ.id);
    const isPhoto = rawQ.type === 'two_images' || (rawQ.type === 'one_image' && rawQ.image);
    if (isPhoto) solo.photoCount = (solo.photoCount || 0) + 1;
    else solo.textCount = (solo.textCount || 0) + 1;

    // Dynamic bluff/decoy image ONLY in adult mode (NEVER in Kids Mode!)
    const q = (!solo.isKidsMode && rawQ.type === 'one_image' && rawQ.decoyImage && Math.random() < 0.55)
      ? { ...rawQ, image: rawQ.decoyImage, isDecoyShown: true }
      : rawQ;
    solo.currentQuestion = q;
    solo.phase = 'question';
    solo.timeLeft = solo.isKidsMode ? null : (solo.settings.answerTime || 10);

    const cat = bank.categories.find(c => c.id === q.category);
    els.hudCategory.textContent = cat ? `${cat.icon} ${cat.name}` : q.category;
    els.hudCategory.classList.remove('hidden');

    renderQuestionUI(q, solo.timeLeft, null, null);
    updateArcadeButtons(true, 'PIROS', 'KÉK');
    showScreen('question');

    // NO countdown timer in Kids Mode!
    if (solo.isKidsMode) return;

    solo.timer = setInterval(() => {
      solo.timeLeft--;
      if (solo.timeLeft <= 0) {
        clearSoloTimers();
        soloHandleAnswer(null);
      } else {
        updateQuestionAlarms(solo.timeLeft);
        window.kvizSound.tick(solo.timeLeft <= 3);
      }
    }, 1000);
  }

  function soloHandleAnswer(choice) {
    if (solo.phase !== 'question') return;
    clearSoloTimers();
    solo.phase = 'reveal';
    solo.answered = choice;
    updateArcadeButtons(false);

    const q = solo.currentQuestion;
    const isCorrect = choice === q.correct;

    if (choice) window.kvizSound.buttonClick(choice);
    renderQuestionUI(q, solo.timeLeft, choice, q.correct);
    showResultOverlay(isCorrect);

    if (isCorrect) {
      window.kvizSound.correct();
      solo.score = getLadderValue(solo.roundNumber);
      els.hudScore.textContent = `${solo.score} PONT`;
      solo.timeout = setTimeout(() => {
        els.resultOverlay.classList.add('hidden');
        if (solo.settings.allowStop && solo.roundNumber >= 3) {
          soloStartDecision();
        } else {
          soloNextRound();
        }
      }, 2200);
    } else {
      window.kvizSound.wrong();
      solo.score = 0;
      els.hudScore.textContent = `0 PONT`;
      solo.timeout = setTimeout(() => {
        els.resultOverlay.classList.add('hidden');
        soloFinish(false);
      }, 2400);
    }
  }

  function soloStartDecision() {
    clearSoloTimers();
    solo.phase = 'decision';
    solo.timeLeft = solo.isKidsMode ? null : 7;

    els.decCurrentVal.textContent = `${solo.score} PONT`;
    els.decNextVal.textContent = `${getLadderValue(solo.roundNumber + 1)} PONT`;
    renderLadder(solo.roundNumber);
    setAlarm(els.decAlarm, solo.timeLeft);
    els.decStatusPill.classList.add('hidden');
    els.btnDecStop.disabled = false;
    els.btnDecContinue.disabled = false;
    els.btnDecStop.classList.remove('selected');
    els.btnDecContinue.classList.remove('selected');

    updateArcadeButtons(true, 'MEGÁLL', 'TOVÁBB');
    window.kvizSound.decisionOpen();
    showScreen('decision');

    if (solo.isKidsMode) return;

    solo.timer = setInterval(() => {
      solo.timeLeft--;
      if (solo.timeLeft <= 0) {
        clearSoloTimers();
        soloHandleDecision('continue');
      } else {
        setAlarm(els.decAlarm, solo.timeLeft);
        window.kvizSound.tick(solo.timeLeft <= 3);
      }
    }, 1000);
  }

  function soloHandleDecision(dec) {
    if (solo.phase !== 'decision') return;
    clearSoloTimers();
    updateArcadeButtons(false);
    if (dec === 'stop') {
      window.kvizSound.cashOut();
      soloFinish(true);
    } else {
      window.kvizSound.buttonClick('blue');
      soloNextRound();
    }
  }

  function soloFinish(stoppedWithPoints) {
    clearSoloTimers();
    solo.phase = 'gameover';
    updateArcadeButtons(false);
    els.gameoverLeaderboard.classList.add('hidden');
    els.gameoverRecordBadge.classList.add('hidden');

    const finalScore = stoppedWithPoints ? solo.score : 0;
    const survived = stoppedWithPoints ? solo.roundNumber : Math.max(0, solo.roundNumber - 1);

    if (solo.isKidsMode) {
      if (stoppedWithPoints && solo.score > solo.kidsBestScore) {
        solo.kidsBestScore = solo.score;
        localStorage.setItem('kvizbox_kids_best', String(solo.kidsBestScore));
        if (els.kidsBestLabel) els.kidsBestLabel.textContent = solo.kidsBestScore;
      }
      if (stoppedWithPoints) {
        els.gameoverTitle.textContent = '🌟 SZUPER ÜGYES VOLTÁL!';
        els.gameoverTitle.classList.add('win-style');
        els.gameoverSubtitle.textContent = `Megszereztél ${solo.score} PONTOT (${solo.roundNumber} helyes válasz)! • Gyerek rekord: ${solo.kidsBestScore} PONT`;
        window.kvizSound.victory();
      } else {
        els.gameoverTitle.textContent = '🧸 SZÉP PRÓBÁLKOZÁS!';
        els.gameoverTitle.classList.remove('win-style');
        els.gameoverSubtitle.textContent = `${survived} helyes választ találtál el! Próbáld újra! • Gyerek rekord: ${solo.kidsBestScore} PONT`;
      }
    } else {
      if (stoppedWithPoints && solo.score > solo.bestScore) {
        solo.bestScore = solo.score;
        localStorage.setItem('kvizbox_solo_best', String(solo.bestScore));
        els.soloBestLabel.textContent = solo.bestScore;
      }

      submitScoreToAccount(finalScore, survived, 'solo');

      if (stoppedWithPoints) {
        els.gameoverTitle.textContent = 'GRATULÁLUNK!';
        els.gameoverTitle.classList.add('win-style');
        els.gameoverSubtitle.textContent = `Biztosított nyereményed: ${solo.score} PONT (${solo.roundNumber} helyes válasz) • Rekord: ${solo.bestScore} PONT`;
        window.kvizSound.victory();
      } else {
        els.gameoverTitle.textContent = 'A JÁTÉKNAK VÉGE';
        els.gameoverTitle.classList.remove('win-style');
        els.gameoverSubtitle.textContent = `${survived} helyes válasz után estél ki • Saját rekord: ${solo.bestScore} PONT`;
      }
    }

    els.btnPlayAgain.classList.remove('hidden');
    showScreen('gameover');
  }

  // ==================== SHARED QUESTION RENDERING ====================
  function updateQuestionAlarms(seconds) {
    if (!els.qLayoutTwo.classList.contains('hidden')) {
      setAlarm(els.qTwoAlarm, seconds);
    } else if (!els.qLayoutText.classList.contains('hidden')) {
      setAlarm(els.qTextAlarm, seconds);
    } else {
      setAlarm(els.qOneAlarm, seconds);
    }
  }

  function renderQuestionUI(q, timeLeft, chosen, revealedCorrect) {
    els.resultOverlay.classList.add('hidden');
    els.mpAnsweredPill.classList.add('hidden');

    if (q.type === 'two_images') {
      els.qLayoutTwo.classList.remove('hidden');
      els.qLayoutOne.classList.add('hidden');
      els.qLayoutText.classList.add('hidden');
      els.qTwoText.textContent = q.question;
      if (els.qTwoRedImg.dataset.qid !== q.id) {
        els.qTwoRedImg.dataset.qid = q.id;
        setImgWithFallback(els.qTwoRedImg, q.redImage, 'PIROS');
        setImgWithFallback(els.qTwoBlueImg, q.blueImage, 'KÉK');
      }
      setAlarm(els.qTwoAlarm, timeLeft);

      els.qCardRed.classList.toggle('selected', chosen === 'red');
      els.qCardBlue.classList.toggle('selected', chosen === 'blue');
      els.qCardRed.classList.toggle('reveal-correct', revealedCorrect === 'red');
      els.qCardBlue.classList.toggle('reveal-correct', revealedCorrect === 'blue');
      els.qCardRed.classList.toggle('reveal-dim', revealedCorrect && revealedCorrect !== 'red');
      els.qCardBlue.classList.toggle('reveal-dim', revealedCorrect && revealedCorrect !== 'blue');
    } else if (q.type === 'text_only' || !q.image) {
      els.qLayoutText.classList.remove('hidden');
      els.qLayoutTwo.classList.add('hidden');
      els.qLayoutOne.classList.add('hidden');

      const catObj = (mode === 'solo' ? getActiveSoloBank().categories : questionBank.categories).find(c => c.id === q.category)
        || questionBank.categories.find(c => c.id === q.category);
      els.qTextCatIcon.textContent = catObj ? catObj.icon : '❓';
      els.qTextCatName.textContent = catObj ? catObj.name : (q.categoryName || 'KVÍZ');
      els.qTextCatBadge.style.setProperty('--cat-color', catObj?.color || '#ffde59');

      els.qTextQuestion.textContent = q.question;
      els.qTextRedBtn.textContent = q.redText;
      els.qTextBlueBtn.textContent = q.blueText;
      setAlarm(els.qTextAlarm, timeLeft);

      els.qTextRedBtn.classList.toggle('selected', chosen === 'red');
      els.qTextBlueBtn.classList.toggle('selected', chosen === 'blue');
      els.qTextRedBtn.classList.toggle('reveal-correct', revealedCorrect === 'red');
      els.qTextBlueBtn.classList.toggle('reveal-correct', revealedCorrect === 'blue');
      els.qTextRedBtn.classList.toggle('reveal-dim', revealedCorrect && revealedCorrect !== 'red');
      els.qTextBlueBtn.classList.toggle('reveal-dim', revealedCorrect && revealedCorrect !== 'blue');
    } else {
      els.qLayoutOne.classList.remove('hidden');
      els.qLayoutTwo.classList.add('hidden');
      els.qLayoutText.classList.add('hidden');
      els.qOneText.textContent = q.question;
      els.qOneRedBtn.textContent = q.redText;
      els.qOneBlueBtn.textContent = q.blueText;
      if (els.qOneImg.dataset.qid !== q.id) {
        els.qOneImg.dataset.qid = q.id;
        setImgWithFallback(els.qOneImg, q.image, q.categoryName || 'KVIZBOX');
      }
      setAlarm(els.qOneAlarm, timeLeft);

      els.qOneRedBtn.classList.toggle('selected', chosen === 'red');
      els.qOneBlueBtn.classList.toggle('selected', chosen === 'blue');
      els.qOneRedBtn.classList.toggle('reveal-correct', revealedCorrect === 'red');
      els.qOneBlueBtn.classList.toggle('reveal-correct', revealedCorrect === 'blue');
      els.qOneRedBtn.classList.toggle('reveal-dim', revealedCorrect && revealedCorrect !== 'red');
      els.qOneBlueBtn.classList.toggle('reveal-dim', revealedCorrect && revealedCorrect !== 'blue');
    }
  }

  function showResultOverlay(isCorrect) {
    els.resultOverlay.innerHTML = isCorrect ? CHECKMARK_SVG : REDX_SVG;
    els.resultOverlay.classList.remove('hidden');
  }

  // ==================== MULTIPLAYER ENGINE ====================
  function ensureSocket() {
    if (socket) return socket;
    socket = io();
    socket.on('room:state', (state) => {
      if (mode !== 'multiplayer') return;
      renderMultiplayerState(state);
    });
    return socket;
  }

  function getPlayerName() {
    const val = els.inputPlayerName.value.trim();
    if (val) {
      localStorage.setItem('kvizbox_player_name', val);
      return val;
    }
    return '';
  }

  function createMultiplayerRoom() {
    window.kvizSound.ensureContext();
    const name = getPlayerName();
    if (!name) {
      showHomeError('Kérlek add meg a neved a szoba létrehozásához!');
      els.inputPlayerName.focus();
      return;
    }
    showHomeError('');
    window.kvizSound.buttonClick('red');
    const s = ensureSocket();
    s.emit('room:create', { name }, (res) => {
      if (!res?.ok) {
        showHomeError(res?.error || 'Hiba a szoba létrehozásakor!');
        return;
      }
      mode = 'multiplayer';
      mp.myId = res.playerId;
      mp.roomCode = res.code;
      mp.lastPhase = null;
      loadRoomQR(res.code);
    });
  }

  function joinMultiplayerRoom() {
    window.kvizSound.ensureContext();
    const name = getPlayerName();
    const code = els.inputRoomCode.value.trim().toUpperCase();
    if (!name) {
      showHomeError('Kérlek add meg a neved!');
      els.inputPlayerName.focus();
      return;
    }
    if (code.length < 4) {
      showHomeError('Add meg a 4 karakteres szobakódot!');
      els.inputRoomCode.focus();
      return;
    }
    showHomeError('');
    window.kvizSound.buttonClick('blue');
    const s = ensureSocket();
    s.emit('room:join', { code, name }, (res) => {
      if (!res?.ok) {
        showHomeError(res?.error || 'Nem sikerült csatlakozni!');
        return;
      }
      mode = 'multiplayer';
      mp.myId = res.playerId;
      mp.roomCode = res.code;
      mp.lastPhase = null;
      loadRoomQR(res.code);
    });
  }

  function loadRoomQR(code) {
    const base = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? (networkInfo.lanUrl || window.location.origin)
      : window.location.origin;
    const joinUrl = `${base}/?room=${code}`;
    els.lobbyUrl.textContent = joinUrl.replace(/^https?:\/\//, '');
    fetch(`/api/qr?text=${encodeURIComponent(joinUrl)}`)
      .then(r => r.json())
      .then(d => { if (d.dataUrl) els.lobbyQr.src = d.dataUrl; })
      .catch(() => {});
  }

  function renderMultiplayerState(state) {
    const phaseChanged = mp.lastPhase !== state.phase;
    const roundChanged = mp.lastRound !== state.roundNumber;
    const timeChanged = mp.lastTimeLeft !== state.timeLeft;
    mp.state = state;

    const me = state.players.find(p => p.id === mp.myId);
    const isHost = !!me?.isHost;
    const amActive = me?.status === 'active';

    // Update HUD
    els.hudRound.textContent = `${state.roundNumber || 1}. kérdés`;
    els.hudScore.textContent = `${me?.score || 0} PONT`;
    els.hudAlive.textContent = `👥 ${state.activeCount}/${state.players.length} talpon`;
    els.hudAlive.classList.remove('hidden');

    if (state.question?.categoryName) {
      els.hudCategory.textContent = state.question.categoryName;
      els.hudCategory.classList.remove('hidden');
    } else {
      els.hudCategory.classList.add('hidden');
    }

    // Spectator banner
    if (['category_pick', 'question', 'reveal', 'decision'].includes(state.phase) && me && !amActive) {
      if (me.status === 'stopped') {
        els.spectatorBanner.textContent = `🍺 Megálltál ${me.score} ponttal! Néző mód – még ${state.activeCount} játékos versenyben.`;
      } else {
        els.spectatorBanner.textContent = `❌ Kiestél! Néző mód – még ${state.activeCount} játékos versenyben.`;
      }
      els.spectatorBanner.classList.remove('hidden');
    } else {
      els.spectatorBanner.classList.add('hidden');
    }

    if (phaseChanged || roundChanged) {
      if (state.phase === 'question') mp.myChoice = null;
      if (state.phase === 'decision') mp.myDecision = null;
    }

    // ---- PHASE: LOBBY ----
    if (state.phase === 'lobby') {
      showScreen('lobby');
      updateArcadeButtons(false);
      els.lobbyCode.textContent = state.code;
      els.lobbyPlayerCount.textContent = state.players.length;
      els.lobbyPlayers.innerHTML = state.players.map(p => `
        <li class="player-chip ${p.id === mp.myId ? 'is-me' : ''}">
          ${p.isHost ? '👑' : '🎮'} ${escapeHtml(p.name)}
        </li>
      `).join('');

      // Sync settings
      els.settingTime.value = String(state.settings.answerTime);
      els.settingAllowStop.checked = state.settings.allowStop;
      els.settingCatFreq.value = String(state.settings.categoryPickEvery ?? 1);
      els.settingTime.disabled = !isHost;
      els.settingAllowStop.disabled = !isHost;
      els.settingCatFreq.disabled = !isHost;

      els.btnStartMp.classList.toggle('hidden', !isHost);
      els.lobbyWaitMsg.classList.toggle('hidden', isHost);
    }

    // ---- PHASE: READY ----
    else if (state.phase === 'ready') {
      showScreen('ready');
      updateArcadeButtons(false);
      els.readyCountdown.textContent = state.timeLeft;
      if (phaseChanged || timeChanged) {
        window.kvizSound.readyBeep(state.timeLeft);
      }
    }

    // ---- PHASE: CATEGORY PICK ----
    else if (state.phase === 'category_pick') {
      showScreen('category');
      updateArcadeButtons(false);
      const isMyPick = state.picker?.id === mp.myId;
      els.catPickerBadge.textContent = isMyPick
        ? '🎯 TE VÁLASZTASZ TÉMAKÖRT!'
        : `🎲 ${state.picker?.name || 'Valaki'} VÁLASZT...`;
      els.catPrompt.textContent = isMyPick
        ? 'Válassz témakört a következő kérdéshez!'
        : `${state.picker?.name || 'A kisorsolt játékos'} választja ki a következő kérdés témakörét!`;

      setAlarm(els.catAlarm, state.timeLeft);
      if (phaseChanged) {
        window.kvizSound.categoryPick();
        els.catGrid.innerHTML = '';
        (state.categoryOptions || []).forEach(cat => {
          const btn = document.createElement('button');
          btn.className = 'cat-btn';
          btn.disabled = !isMyPick;
          btn.innerHTML = `<span class="cat-btn-icon">${cat.icon}</span><span class="cat-btn-name">${cat.name}</span>`;
          if (isMyPick) {
            btn.addEventListener('click', () => {
              window.kvizSound.buttonClick('blue');
              socket.emit('game:pick_category', { categoryId: cat.id });
            });
          }
          els.catGrid.appendChild(btn);
        });
      } else if (timeChanged && state.timeLeft <= 3) {
        window.kvizSound.tick(true);
      }
    }

    // ---- PHASE: QUESTION ----
    else if (state.phase === 'question') {
      showScreen('question');
      const canAnswer = amActive && !me.hasAnswered;
      renderQuestionUI(state.question, state.timeLeft, mp.myChoice, null);
      updateArcadeButtons(canAnswer, 'PIROS', 'KÉK');

      if (amActive && me.hasAnswered) {
        const answeredCount = state.players.filter(p => p.status === 'active' && p.hasAnswered).length;
        els.mpAnsweredPill.textContent = `Válasz rögzítve! (${answeredCount}/${state.activeCount} válaszolt)`;
        els.mpAnsweredPill.classList.remove('hidden');
      }
      if (!phaseChanged && timeChanged) {
        window.kvizSound.tick(state.timeLeft <= 3);
      }
    }

    // ---- PHASE: REVEAL ----
    else if (state.phase === 'reveal') {
      showScreen('question');
      updateArcadeButtons(false);
      renderQuestionUI(state.question, 0, mp.myChoice, state.revealData?.correct);

      if (phaseChanged && me) {
        if (me.lastResult === 'correct') {
          showResultOverlay(true);
          window.kvizSound.correct();
        } else if (me.lastResult === 'wrong' || me.lastResult === 'timeout') {
          showResultOverlay(false);
          window.kvizSound.wrong();
        }
      }
    }

    // ---- PHASE: DECISION ("VÁLASSZON!") ----
    else if (state.phase === 'decision') {
      showScreen('decision');
      const myStep = me?.currentStep || state.roundNumber;
      els.decCurrentVal.textContent = `${getLadderValue(myStep)} PONT`;
      els.decNextVal.textContent = `${getLadderValue(myStep + 1)} PONT`;
      renderLadder(myStep);
      setAlarm(els.decAlarm, state.timeLeft);

      const canDecide = amActive && !me.hasDecided;
      els.btnDecStop.disabled = !canDecide;
      els.btnDecContinue.disabled = !canDecide;
      els.btnDecStop.classList.toggle('selected', mp.myDecision === 'stop');
      els.btnDecContinue.classList.toggle('selected', mp.myDecision === 'continue');
      updateArcadeButtons(canDecide, 'MEGÁLL', 'TOVÁBB');

      if (amActive && me.hasDecided) {
        const decCount = state.players.filter(p => p.status === 'active' && p.hasDecided).length;
        els.decStatusPill.textContent = mp.myDecision === 'stop'
          ? `Megállás rögzítve! (${decCount}/${state.activeCount} döntött)`
          : `Továbbmentél! (${decCount}/${state.activeCount} döntött)`;
        els.decStatusPill.classList.remove('hidden');
      } else {
        els.decStatusPill.classList.add('hidden');
      }

      if (phaseChanged) {
        window.kvizSound.decisionOpen();
      } else if (timeChanged) {
        window.kvizSound.tick(state.timeLeft <= 3);
      }
    }

    // ---- PHASE: GAME OVER ----
    else if (state.phase === 'gameover') {
      showScreen('gameover');
      updateArcadeButtons(false);
      const lb = state.leaderboard || [];
      const winner = lb[0];

      if (winner) {
        els.gameoverTitle.textContent = `🏆 ${winner.name.toUpperCase()} NYERT!`;
        els.gameoverTitle.classList.add('win-style');
        els.gameoverSubtitle.textContent = winner.score > 0
          ? `${winner.score} PONT • ${winner.currentStep} helyes válasz`
          : `Legtovább bírta: ${winner.currentStep} helyes válasz!`;
      } else {
        els.gameoverTitle.textContent = 'A JÁTÉKNAK VÉGE';
        els.gameoverTitle.classList.remove('win-style');
        els.gameoverSubtitle.textContent = '';
      }

      const medals = ['🥇', '🥈', '🥉'];
      els.gameoverLeaderboard.innerHTML = lb.map((p, idx) => {
        const rankStr = medals[idx] || `${idx + 1}.`;
        let stLabel = 'Versenyben';
        if (p.status === 'stopped') stLabel = '🍺 Megállt';
        else if (p.status === 'eliminated') stLabel = `❌ ${p.eliminatedAt || p.currentStep + 1}. kérdésnél kiesett`;
        return `
          <div class="lb-row ${idx === 0 ? 'rank-1' : ''}">
            <div class="lb-rank">${rankStr}</div>
            <div>${escapeHtml(p.name)} ${p.id === mp.myId ? '(Te)' : ''}</div>
            <div class="lb-status">${stLabel}</div>
            <div class="lb-score">${p.score} PT</div>
          </div>
        `;
      }).join('');
      els.gameoverLeaderboard.classList.remove('hidden');

      els.btnPlayAgain.classList.toggle('hidden', !isHost);
      if (phaseChanged) {
        window.kvizSound.victory();
        els.gameoverRecordBadge.classList.add('hidden');
        const meRow = lb.find(p => p.id === mp.myId);
        if (meRow) {
          submitScoreToAccount(meRow.score || 0, meRow.currentStep || 0, 'multiplayer');
        }
      }
    }

    mp.lastPhase = state.phase;
    mp.lastTimeLeft = state.timeLeft;
    mp.lastRound = state.roundNumber;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }

  // ==================== UNIFIED RED / BLUE INPUT HANDLER ====================
  function triggerColorInput(color) {
    window.kvizSound.ensureContext();
    const btn = color === 'red' ? els.arcadeBtnRed : els.arcadeBtnBlue;
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 130);

    if (mode === 'solo') {
      if (solo.phase === 'question') {
        soloHandleAnswer(color);
      } else if (solo.phase === 'decision') {
        soloHandleDecision(color === 'red' ? 'stop' : 'continue');
      }
    } else if (mode === 'multiplayer' && mp.state) {
      const me = mp.state.players.find(p => p.id === mp.myId);
      if (!me || me.status !== 'active') return;

      if (mp.state.phase === 'question' && !me.hasAnswered) {
        mp.myChoice = color;
        window.kvizSound.buttonClick(color);
        renderQuestionUI(mp.state.question, mp.state.timeLeft, color, null);
        updateArcadeButtons(false);
        socket.emit('game:answer', { choice: color });
      } else if (mp.state.phase === 'decision' && !me.hasDecided) {
        const dec = color === 'red' ? 'stop' : 'continue';
        mp.myDecision = dec;
        if (dec === 'stop') window.kvizSound.cashOut();
        else window.kvizSound.buttonClick('blue');
        updateArcadeButtons(false);
        socket.emit('game:decision', { decision: dec });
      }
    }
  }

  function returnToHome() {
    clearSoloTimers();
    if (mode === 'multiplayer' && socket) {
      socket.emit('room:leave');
    }
    mode = 'idle';
    mp.roomCode = null;
    mp.state = null;
    mp.lastPhase = null;
    updateArcadeButtons(false);
    showScreen('home');
  }

  // ==================== EVENT LISTENERS ====================
  els.btnMute.addEventListener('click', () => {
    const muted = window.kvizSound.toggleMute();
    els.btnMute.textContent = muted ? '🔇' : '🔊';
  });

  els.btnHomeTop.addEventListener('click', returnToHome);
  els.btnBackHome.addEventListener('click', returnToHome);
  els.btnLeaveRoom.addEventListener('click', returnToHome);

  els.btnSolo.addEventListener('click', openSoloSettings);
  if (els.btnKids) els.btnKids.addEventListener('click', startKidsGame);
  els.btnSoloBack.addEventListener('click', () => showScreen('home'));
  els.btnSoloLaunch.addEventListener('click', startSoloGame);
  els.btnLeaderboard.addEventListener('click', () => {
    window.kvizSound.ensureContext();
    window.kvizSound.buttonClick('blue');
    openGlobalLeaderboard('home');
  });
  els.btnGameoverLb.addEventListener('click', () => {
    window.kvizSound.ensureContext();
    window.kvizSound.buttonClick('blue');
    openGlobalLeaderboard('gameover');
  });
  els.btnLbBack.addEventListener('click', () => showScreen(auth.prevScreenBeforeLb || 'home'));
  els.btnLbRefresh.addEventListener('click', () => openGlobalLeaderboard(auth.prevScreenBeforeLb || 'home'));
  els.btnLogout.addEventListener('click', logoutGoogle);
  els.btnGoogleUnconfigured.addEventListener('click', () => {
    showHomeError('A Google bejelentkezéshez állítsd be a GOOGLE_CLIENT_ID környezeti változót a szerveren (Render.com → Environment).');
  });
  els.btnCreateRoom.addEventListener('click', createMultiplayerRoom);
  els.btnJoinRoom.addEventListener('click', joinMultiplayerRoom);

  els.inputRoomCode.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') joinMultiplayerRoom();
  });

  // Host settings
  const emitSettings = () => {
    if (socket && mode === 'multiplayer') {
      socket.emit('room:settings', {
        answerTime: Number(els.settingTime.value),
        allowStop: els.settingAllowStop.checked,
        categoryPickEvery: Number(els.settingCatFreq.value)
      });
    }
  };
  els.settingTime.addEventListener('change', emitSettings);
  els.settingAllowStop.addEventListener('change', emitSettings);
  els.settingCatFreq.addEventListener('change', emitSettings);

  els.btnStartMp.addEventListener('click', () => {
    window.kvizSound.ensureContext();
    window.kvizSound.buttonClick('red');
    socket?.emit('room:start');
  });

  els.btnPlayAgain.addEventListener('click', () => {
    if (mode === 'solo') {
      if (solo.isKidsMode) startKidsGame();
      else startSoloGame();
    } else if (mode === 'multiplayer') {
      socket?.emit('room:restart');
    }
  });

  // Arcade bottom physical buttons
  els.arcadeBtnRed.addEventListener('click', () => triggerColorInput('red'));
  els.arcadeBtnBlue.addEventListener('click', () => triggerColorInput('blue'));

  // On-screen question / decision buttons also trigger red/blue
  els.qCardRed.addEventListener('click', () => triggerColorInput('red'));
  els.qCardBlue.addEventListener('click', () => triggerColorInput('blue'));
  els.qOneRedBtn.addEventListener('click', () => triggerColorInput('red'));
  els.qOneBlueBtn.addEventListener('click', () => triggerColorInput('blue'));
  els.qTextRedBtn.addEventListener('click', () => triggerColorInput('red'));
  els.qTextBlueBtn.addEventListener('click', () => triggerColorInput('blue'));
  els.btnDecStop.addEventListener('click', () => triggerColorInput('red'));
  els.btnDecContinue.addEventListener('click', () => triggerColorInput('blue'));

  // Keyboard controls (ArrowLeft / A / 1 = PIROS, ArrowRight / D / 2 = KÉK)
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
    if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a' || e.key === '1') {
      if (!els.arcadeBtnRed.disabled) triggerColorInput('red');
    } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd' || e.key === '2') {
      if (!els.arcadeBtnBlue.disabled) triggerColorInput('blue');
    }
  });
})();
