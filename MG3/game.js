
(async function(){
  const res = await fetch('MG3/data.json');
  const data = await res.json();
  const shuffle = a => [...a].sort(()=>Math.random()-0.5);

  // Global state
  let learned = [];
  let pool = [];
  let idx = 0;
  let score = 0;
  const MAX_ROUNDS = 10;
// ===== Local Storage Keys =====
const STORAGE_KEYS = {
  learnedVerbs: 'learnedVerbs',
  mistakeTracker: 'mistakeTracker'
};

// ===== Persistence Helpers =====
function loadLearned(){
  try{
    const raw = localStorage.getItem(STORAGE_KEYS.learnedVerbs);
    if(raw){
      const obj = JSON.parse(raw);
      return Object.values(obj);
    }
  }catch(e){console.error('Failed to load learnedVerbs', e);}
  return [];
}

function saveLearned(){
  const obj = {};
  learned.forEach(v=>{ if(v && v.romaji) obj[v.romaji] = v; });
  localStorage.setItem(STORAGE_KEYS.learnedVerbs, JSON.stringify(obj));
}

function loadMistakeTracker(){
  try{
    const raw = localStorage.getItem(STORAGE_KEYS.mistakeTracker);
    if(raw) return JSON.parse(raw);
  }catch(e){console.error('Failed to load mistakeTracker',e);}
  return {};
}

function saveMistakeTracker(){
  localStorage.setItem(STORAGE_KEYS.mistakeTracker, JSON.stringify(mistakeTracker));
}

let mistakeTracker = loadMistakeTracker();

function recordMistake(endingRomaji){
  if(!endingRomaji) return;
  mistakeTracker[endingRomaji] = (mistakeTracker[endingRomaji]||0) + 1;
  saveMistakeTracker();
}

// initialize learned from storage
learned = loadLearned();

  // DOM
  const screens = document.querySelectorAll('.screen');
  function showScreen(id){
    screens.forEach(s=>s.style.display = s.id === id ? 'block':'none');
  }

  // ===== Main Menu Buttons =====
  document.getElementById('unlockBtn').onclick = ()=>{ startUnlockGame(); };
  document.getElementById('reviewBtn').onclick = ()=>{ startReview(); };

// ======= Learned Verbs Manager =======
const settingsBtn             = document.getElementById('settingsBtn');
const verbsListDiv            = document.getElementById('verbsList');

settingsBtn.onclick = () => {
  populateManager();
  showScreen('managerScreen');
};

document.getElementById('backMenuFromManager').onclick = () => {
  showScreen('titleScreen');
};

function populateManager(){
  const exportBtn = document.getElementById('exportBtn');
  verbsListDiv.innerHTML = '';
  if (learned.length === 0){
    verbsListDiv.innerHTML = '<p>No learned verbs yet.</p>';
    exportBtn.style.display = 'none';
    return;
  }
  learned.forEach(v=>{
    const ending = v.romaji.slice(-2);

    const row = document.createElement('div');
    row.className = 'verbRow';

    const infoSpan = document.createElement('span');
    infoSpan.innerHTML = `${v.kanji}（${v.kana} / <i>${v.romaji}</i>） – ${v.meaning}`;
    row.appendChild(infoSpan);

    const delBtn = document.createElement('button');
    delBtn.className = 'deleteBtn';
    delBtn.textContent = '❌';
    delBtn.dataset.romaji = v.romaji;
    row.appendChild(delBtn);

    verbsListDiv.appendChild(row);
  });
}

verbsListDiv.addEventListener('click', e=>{
  if(e.target.classList.contains('deleteBtn')){
    const romaji = e.target.dataset.romaji;
    if(confirm(`Delete ${romaji} from learned verbs?`)){
      learned = learned.filter(v=>v.romaji !== romaji);
      saveLearned();
      populateManager();
    }
  }
});

document.getElementById('clearBtn').onclick = ()=>{
  if(confirm('Clear ALL learned verbs?')){
    learned = [];
    saveLearned();
    populateManager();
  }
};

document.getElementById('exportBtn').onclick = ()=>{
  const lines = learned.map(v=>`${v.kanji}（${v.kana} / ${v.romaji}） – ${v.meaning}`).join('\n');
  const blob = new Blob([lines], {type:'text/plain;charset=utf-8'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = 'learned_verbs.txt';
  a.click();
  URL.revokeObjectURL(url);
};
  document.getElementById('backMenuFromReview').onclick = ()=>{ showScreen('titleScreen'); };
  
  function resetGameUI(){
    promptEl.style.display = 'none';
    optionsEl.style.display = 'none';
    document.getElementById('timerBarWrap').style.display = 'none';
    feedbackEl.textContent = rewardEl.textContent = '';
  }

  document.getElementById('backMenuFromGame').onclick = () => {
    clearInterval(timerId);
    resetGameUI();
    showScreen('titleScreen');
  };

  // ======== Unlock Game ========
  // Most of original startGame logic, renamed to startUnlockGame
  function startUnlockGame(){
    score = 0;
    idx = 0;

    // Build fresh pool excluding learned verbs and prioritizing previous mistakes
    const learnedSet = new Set(learned.map(v=>v.romaji));

    const filtered = data.map(q=>{
      const copy = JSON.parse(JSON.stringify(q)); // deep clone
      copy.endings = q.endings.map(e=>{
        const eCopy = JSON.parse(JSON.stringify(e));
        eCopy.verbs = (e.verbs||[]).filter(v=>!learnedSet.has(v.romaji));
        return eCopy;
      }).filter(e=>e.verbs && e.verbs.length);
      return copy;
    }).filter(q=>q.endings.length);

    // Weight function based on mistake counts
    function qWeight(q){
      let max = 0;
      q.endings.forEach(e=>{
        const c = mistakeTracker[e.romaji] || 0;
        if(c>max) max=c;
      });
      return max;
    }

    pool = shuffle(filtered).sort((a,b)=> qWeight(b) - qWeight(a));

    document.getElementById('score').textContent='Score: 0';
    showScreen('gameScreen');
    runGameRound();
  }

  // Convenience
  const promptEl = document.getElementById('prompt');
  const optionsEl = document.getElementById('options');
  const feedbackEl = document.getElementById('feedback');
  const rewardEl = document.getElementById('reward');
  const timerBar = document.getElementById('timerBar');
  const scoreEl = document.getElementById('score');
  const roundEl = document.getElementById('round');
  const summaryEl = document.getElementById('summary');
  const restartBtn = document.getElementById('restartBtn');

  restartBtn.onclick = ()=>startUnlockGame();

  let remaining, timerId, answered;

  function runGameRound(){
    if (idx >= pool.length || idx >= MAX_ROUNDS) {
      return endRound();
    }
    answered = false;
    feedbackEl.style.display='';
    promptEl.style.display='';
    optionsEl.style.display='flex';
    document.getElementById('timerBarWrap').style.display='';
    rewardEl.textContent='';
    rewardEl.style.display='';
    feedbackEl.textContent='';
    summaryEl.style.display='none';
    restartBtn.style.display='none';
    roundEl.textContent=`Round ${idx+1}`;

    // Prepare question
    const q = pool[idx];
    const ending = q.endings[Math.floor(Math.random()*q.endings.length)];

    promptEl.textContent = `${ending.kana} (${ending.romaji}) → ${q.form.label} (${q.form.romaji})`;

    optionsEl.innerHTML='';
    shuffle(q.options).forEach(txt=>{
      const b=document.createElement('div');
      b.className='option';
      b.textContent=txt;
      b.style.animationDuration = (5+Math.random()*4)+'s';
      b.onclick = ()=>handleAnswer(b, txt, q, ending);
      optionsEl.appendChild(b);
    });
    runTimer(q, ending);
  }

  function runTimer(q, ending){
    remaining = 10;
    timerBar.style.width='100%';
    timerBar.style.backgroundColor='hsl(120,70%,50%)';
    timerId=setInterval(()=>{
      remaining-=0.1;
      if(remaining<=0){
        clearInterval(timerId);
        disableAll();
        remaining=0;
        timerBar.style.width='0%';
        timerBar.style.backgroundColor='hsl(0,70%,50%)';
        feedbackEl.textContent='⏰ Time Out!';
        feedbackEl.style.color='red';
        recordMistake(ending.romaji);
        setTimeout(()=>{idx++; runGameRound();},2500);
      }else{
        const pct = (remaining/10)*100;
        timerBar.style.width=pct+'%';
        const hue=120*(remaining/10);
        timerBar.style.backgroundColor=`hsl(${hue},70%,50%)`;
      }
    },100);
  }

  function disableAll(){
    optionsEl.querySelectorAll('.option').forEach(o=>o.style.pointerEvents='none');
  }

  function handleAnswer(btn, txt, q, ending){
    if(answered) return;
    if(txt===q.correct){
      answered=true;
      clearInterval(timerId);
      disableAll();
      btn.classList.add('correct');
      feedbackEl.textContent='✔️ Correct!';
      feedbackEl.style.color='green';
      score++;
      scoreEl.textContent=`Score: ${score}`;      
      if(ending.verbs && ending.verbs.length){
        // --- pick the first verb that is NOT already learned ---
        if (ending.verbs && ending.verbs.length){
          const v = ending.verbs.find(x =>
            !learned.some(l => l.romaji === x.romaji));

          if (v){                              // we really have something new
            // remove it from every in-memory list so it can’t re-appear this run
            data.forEach(q =>
              q.endings.forEach(e => {
                e.verbs = e.verbs.filter(k => k.romaji !== v.romaji);
              }));

            learned.push(v);
            saveLearned();

            rewardEl.textContent =
              `✨ Você desbloqueou: ${v.kanji}（${v.kana} / ${v.romaji}） – ${v.meaning}`;
          }
        }
      }
      setTimeout(()=>{idx++; runGameRound();},2500);
    }else{
      btn.classList.add('wrong');
      btn.style.pointerEvents='none';
      btn.style.opacity='0.6';
      recordMistake(ending.romaji);
      remaining-=4;
      if(remaining<0)remaining=0.1;
      feedbackEl.textContent='❌ Wrong!';
      feedbackEl.style.color='red';
    }
  }

  function hasMoreVerbs(){
    const learnt = new Set(learned.map(v => v.romaji));
    return data.some(q =>
      q.endings.some(e => e.verbs.some(v => !learnt.has(v.romaji)))
    );
  }

  function endRound(){
    promptEl.style.display='none';
    optionsEl.style.display='none';
    document.getElementById('timerBarWrap').style.display='none';
    feedbackEl.style.display='none';
    rewardEl.style.display='none';
    summaryEl.style.display='block';
    let html='<h2>Verbos aprendidos</h2>';
    if(learned.length===0){
      html+='<p>Nenhum verbo desta vez 😅</p>';
    }else{
      learned.forEach(v=>{
        html+=`<div class="learnedItem">${v.kanji}（${v.kana} / <i>${v.romaji}</i>） – ${v.meaning}</div>`;
      });
    }

    if (!hasMoreVerbs()){
      html += '<p>🎉 Você desbloqueou todos os verbos disponíveis! 🎉</p>';
    }
    summaryEl.innerHTML=html;
    restartBtn.style.display='inline-block';
  }

  // ======== Flashcard Review Mode =========
  const reviewLabel  = document.getElementById('reviewLabel');
  const cardEl       = document.getElementById('card');          // <div class="card">
  const cardInner    = cardEl.querySelector('.card-inner');      // inner wrapper
  const frontFace    = cardEl.querySelector('.card-front');      // front div
  const backFace     = cardEl.querySelector('.card-back');       // back div
  const nextCardBtn  = document.getElementById('nextCardBtn');
  const reviewSettingsBtn = document.getElementById('reviewSettingsBtn');
  const reviewFilterBox   = document.getElementById('reviewFilterBox');
  const keyFilters        = document.getElementById('keyFilters');
  const keyAllBtn         = document.getElementById('keyAllBtn');

  const allKeys = ['kanji','kana','romaji','meaning'];
  let   activeKeys = new Set(allKeys);   // user-selected fields

  function buildKeyFilters(){
    allKeys.forEach(k=>{
      const chk = document.createElement('input');
      chk.type='checkbox'; chk.checked=true;
      chk.dataset.key=k;   chk.id='k_'+k;
      const lbl = document.createElement('label');
      lbl.append(chk,' ', k);
      keyFilters.append(lbl);
    });
  }

  buildKeyFilters();

  function validateFilters(){
    const warn = document.getElementById('filterWarning');
    warn.classList.toggle('hidden', activeKeys.size >= 2);
  }

  validateFilters();   // run once at launch

  /* open/close panel */
  reviewSettingsBtn.onclick = () =>
    reviewFilterBox.classList.toggle('hidden');

  /* update activeKeys whenever a box changes */
  keyFilters.addEventListener('change', ()=>{
    activeKeys = new Set(
      [...keyFilters.querySelectorAll('input:checked')]
        .map(b=>b.dataset.key)
    );    
    validateFilters();
  });

  /* select / deselect all */
  keyAllBtn.onclick = ()=>{
    const boxes   = keyFilters.querySelectorAll('input[type=checkbox]');
    const allOn   = [...boxes].every(b=>b.checked);
    boxes.forEach(b=>b.checked=!allOn);
    activeKeys = new Set(
      [...keyFilters.querySelectorAll('input:checked')]
        .map(b=>b.dataset.key)
    );
    validateFilters();
  };

  let reviewPool = [],
      reviewIdx  = 0,
      pair       = null;

  cardEl.onclick      = () => flipCard();
  nextCardBtn.onclick = () => loadNextCard();

  function startReview(){
    if (learned.length === 0){
      reviewLabel.textContent = '';
      frontFace.textContent   = 'Você não desbloqueou verbos ainda!';
      backFace.textContent    = '';
      cardEl.classList.remove('flipped');
      nextCardBtn.style.display = 'none';
      showScreen('reviewScreen');
      return;
    }
    reviewPool = shuffle([...learned]);
    reviewIdx  = 0;
    showScreen('reviewScreen');
    loadNextCard();
  }

  function loadNextCard(){
    if (reviewIdx >= reviewPool.length){
      reviewPool = shuffle([...learned]);
      reviewIdx  = 0;
    }
    const v = reviewPool[reviewIdx++];

    // pick two distinct keys
    const keys = allKeys.filter(k => v[k] && activeKeys.has(k));
    if (keys.length < 2){           // not enough fields to quiz on
      validateFilters();
      return;
    }
    const frontKey  = keys[Math.floor(Math.random() * keys.length)];
    let   backKey   = frontKey;
    while (backKey === frontKey){
      backKey = keys[Math.floor(Math.random() * keys.length)];
    }
    pair = { front: frontKey, back: backKey, v };

    reviewLabel.textContent = `${frontKey} → ${backKey}`;
    frontFace.textContent   = v[frontKey];
    backFace.textContent    = v[backKey];

    // reset instantly (no animation)
    cardInner.style.transition = 'none';
    cardEl.classList.remove('flipped');
    cardInner.getBoundingClientRect();   // force reflow
    cardInner.style.transition = '';     // restore 0.6s default

    nextCardBtn.style.display = 'none';
  }

  function flipCard(){
    if (!pair) return;
    if (!cardEl.classList.contains('flipped')){
      cardEl.classList.add('flipped');
      nextCardBtn.style.display = 'inline-block';
    }
  }

  // Show title screen initially
  showScreen('titleScreen');
})();