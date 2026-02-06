/* ============================================
   VISTAS ORTOGRAFICAS — Interactive Module
   3D Cube + Face Detection + 2D Projections + Quiz
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── 3D CUBE ROTATION ────────────────────────
  const cube = document.getElementById('cube');
  const viewport = document.getElementById('cubeViewport');

  let isDragging = false;
  let startX, startY;
  let rotX = -25;
  let rotY = 35;

  function updateCubeTransform() {
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }

  viewport.addEventListener('pointerdown', (e) => {
    // Don't start drag if clicking on a face label
    if (e.target.closest('.cube-face')) return;
    isDragging = true;
    cube.classList.add('dragging');
    startX = e.clientX;
    startY = e.clientY;
    viewport.setPointerCapture(e.pointerId);
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    rotY += dx * 0.6;
    rotX -= dy * 0.6;
    startX = e.clientX;
    startY = e.clientY;
    updateCubeTransform();
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
    cube.classList.remove('dragging');
  });


  // ─── FACE DATA ────────────────────────────────
  const faceData = {
    front: {
      name: 'Vista Frontal (VF)',
      desc: 'A vista principal. Mostra a forma que melhor identifica a peca. Sempre eh a primeira a ser escolhida no desenho tecnico.',
      rotation: { x: 0, y: 0 },
      svg: `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="140" height="140" fill="none" stroke="#FF6B00" stroke-width="2.5" rx="2"/>
        <rect x="30" y="40" width="100" height="80" fill="rgba(255,107,0,0.1)" stroke="#FF6B00" stroke-width="1.5" rx="1"/>
        <circle cx="80" cy="80" r="25" fill="none" stroke="#FF6B00" stroke-width="1.5" stroke-dasharray="4,3"/>
        <line x1="80" y1="10" x2="80" y2="150" stroke="rgba(255,107,0,0.2)" stroke-width="0.5" stroke-dasharray="2,4"/>
        <line x1="10" y1="80" x2="150" y2="80" stroke="rgba(255,107,0,0.2)" stroke-width="0.5" stroke-dasharray="2,4"/>
        <text x="80" y="155" fill="#FF6B00" font-size="10" text-anchor="middle" font-weight="700" font-family="system-ui">FRONTAL</text>
      </svg>`
    },
    top: {
      name: 'Vista Superior (VS)',
      desc: 'Olhando de cima pra baixo. Mostra largura e profundidade. No 1o diedro, fica ABAIXO da VF.',
      rotation: { x: 90, y: 0 },
      svg: `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="140" height="140" fill="none" stroke="#CE93D8" stroke-width="2.5" rx="2"/>
        <rect x="30" y="30" width="100" height="100" fill="rgba(156,39,176,0.1)" stroke="#CE93D8" stroke-width="1.5" rx="1"/>
        <circle cx="80" cy="80" r="25" fill="none" stroke="#CE93D8" stroke-width="1.5"/>
        <line x1="80" y1="10" x2="80" y2="150" stroke="rgba(156,39,176,0.2)" stroke-width="0.5" stroke-dasharray="2,4"/>
        <line x1="10" y1="80" x2="150" y2="80" stroke="rgba(156,39,176,0.2)" stroke-width="0.5" stroke-dasharray="2,4"/>
        <text x="80" y="155" fill="#CE93D8" font-size="10" text-anchor="middle" font-weight="700" font-family="system-ui">SUPERIOR</text>
      </svg>`
    },
    right: {
      name: 'Vista Lateral Direita (VLD)',
      desc: 'Olhando da direita. Mostra altura e profundidade. No 1o diedro, fica a ESQUERDA da VF.',
      rotation: { x: 0, y: -90 },
      svg: `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="140" height="140" fill="none" stroke="#0096FF" stroke-width="2.5" rx="2"/>
        <rect x="20" y="40" width="120" height="80" fill="rgba(0,150,255,0.1)" stroke="#0096FF" stroke-width="1.5" rx="1"/>
        <circle cx="80" cy="80" r="25" fill="none" stroke="#0096FF" stroke-width="1.5"/>
        <line x1="80" y1="10" x2="80" y2="150" stroke="rgba(0,150,255,0.2)" stroke-width="0.5" stroke-dasharray="2,4"/>
        <line x1="10" y1="80" x2="150" y2="80" stroke="rgba(0,150,255,0.2)" stroke-width="0.5" stroke-dasharray="2,4"/>
        <text x="80" y="155" fill="#0096FF" font-size="10" text-anchor="middle" font-weight="700" font-family="system-ui">LAT. DIREITA</text>
      </svg>`
    },
    left: {
      name: 'Vista Lateral Esquerda (VLE)',
      desc: 'Olhando da esquerda. Espelho da VLD. Usada quando ha detalhes relevantes nesse lado.',
      rotation: { x: 0, y: 90 },
      svg: `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="140" height="140" fill="none" stroke="#00C853" stroke-width="2.5" rx="2"/>
        <rect x="20" y="40" width="120" height="80" fill="rgba(0,200,83,0.1)" stroke="#00C853" stroke-width="1.5" rx="1"/>
        <circle cx="80" cy="80" r="25" fill="none" stroke="#00C853" stroke-width="1.5" stroke-dasharray="4,3"/>
        <line x1="80" y1="10" x2="80" y2="150" stroke="rgba(0,200,83,0.2)" stroke-width="0.5" stroke-dasharray="2,4"/>
        <line x1="10" y1="80" x2="150" y2="80" stroke="rgba(0,200,83,0.2)" stroke-width="0.5" stroke-dasharray="2,4"/>
        <text x="80" y="155" fill="#00C853" font-size="10" text-anchor="middle" font-weight="700" font-family="system-ui">LAT. ESQUERDA</text>
      </svg>`
    },
    bottom: {
      name: 'Vista Inferior (VI)',
      desc: 'Olhando de baixo. Raramente usada. So aparece quando tem geometria escondida na parte de baixo da peca.',
      rotation: { x: -90, y: 0 },
      svg: `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="140" height="140" fill="none" stroke="#FFB300" stroke-width="2.5" rx="2"/>
        <rect x="30" y="30" width="100" height="100" fill="rgba(255,179,0,0.1)" stroke="#FFB300" stroke-width="1.5" rx="1"/>
        <circle cx="80" cy="80" r="25" fill="none" stroke="#FFB300" stroke-width="1.5" stroke-dasharray="4,3"/>
        <line x1="80" y1="10" x2="80" y2="150" stroke="rgba(255,179,0,0.2)" stroke-width="0.5" stroke-dasharray="2,4"/>
        <line x1="10" y1="80" x2="150" y2="80" stroke="rgba(255,179,0,0.2)" stroke-width="0.5" stroke-dasharray="2,4"/>
        <text x="80" y="155" fill="#FFB300" font-size="10" text-anchor="middle" font-weight="700" font-family="system-ui">INFERIOR</text>
      </svg>`
    },
    back: {
      name: 'Vista Posterior (VP)',
      desc: 'A "traseira" da peca. Quase nunca usada em desenhos industriais. So se houver detalhes que nao aparecem em nenhuma outra vista.',
      rotation: { x: 0, y: 180 },
      svg: `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="140" height="140" fill="none" stroke="#FF3D3D" stroke-width="2.5" rx="2"/>
        <rect x="30" y="40" width="100" height="80" fill="rgba(255,61,61,0.1)" stroke="#FF3D3D" stroke-width="1.5" rx="1"/>
        <circle cx="80" cy="80" r="25" fill="none" stroke="#FF3D3D" stroke-width="1.5"/>
        <line x1="80" y1="10" x2="80" y2="150" stroke="rgba(255,61,61,0.2)" stroke-width="0.5" stroke-dasharray="2,4"/>
        <line x1="10" y1="80" x2="150" y2="80" stroke="rgba(255,61,61,0.2)" stroke-width="0.5" stroke-dasharray="2,4"/>
        <text x="80" y="155" fill="#FF3D3D" font-size="10" text-anchor="middle" font-weight="700" font-family="system-ui">POSTERIOR</text>
      </svg>`
    }
  };


  // ─── FACE CLICK / SELECTION ───────────────────
  let activeFace = null;

  const activeFaceName = document.getElementById('activeFaceName');
  const activeFaceDesc = document.getElementById('activeFaceDesc');
  const view2dPlaceholder = document.getElementById('view2dPlaceholder');
  const view2dDisplay = document.getElementById('view2dDisplay');
  const projectionGrid = document.getElementById('projectionGrid');
  const projectionInfo = document.getElementById('projectionInfo');

  function selectFace(faceKey) {
    const data = faceData[faceKey];
    if (!data) return;

    activeFace = faceKey;

    // Update cube faces
    document.querySelectorAll('.cube-face').forEach(f => f.classList.remove('face-active'));
    const targetFace = cube.querySelector(`.cube-face.${faceKey}`);
    if (targetFace) targetFace.classList.add('face-active');

    // Update control buttons
    document.querySelectorAll('.ctrl-btn').forEach(b => b.classList.remove('active'));
    const targetBtn = document.querySelector(`.ctrl-btn[data-rotate="${faceKey}"]`);
    if (targetBtn) targetBtn.classList.add('active');

    // Update view-items in theory
    document.querySelectorAll('.view-item').forEach(v => v.classList.remove('active'));
    const targetViewItem = document.querySelector(`.view-item[data-face="${faceKey}"]`);
    if (targetViewItem) targetViewItem.classList.add('active');

    // Update info display
    activeFaceName.textContent = data.name;
    activeFaceDesc.textContent = data.desc;

    // Rotate cube to show face
    cube.classList.remove('dragging');
    rotX = data.rotation.x;
    rotY = data.rotation.y;
    updateCubeTransform();

    // Show 2D projection
    view2dPlaceholder.classList.add('hidden');
    view2dDisplay.classList.remove('hidden');
    projectionGrid.innerHTML = data.svg;
    projectionInfo.innerHTML = `<strong>${data.name}</strong> &mdash; ${data.desc}`;
  }

  // Click on cube faces
  document.querySelectorAll('.cube-face').forEach(face => {
    face.addEventListener('click', (e) => {
      e.stopPropagation();
      selectFace(face.dataset.face);
    });
  });

  // Control buttons
  document.querySelectorAll('.ctrl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectFace(btn.dataset.rotate);
    });
  });

  // View items in theory section
  document.querySelectorAll('.view-item').forEach(item => {
    item.addEventListener('click', () => {
      selectFace(item.dataset.face);
      // Scroll to interactive panel on mobile
      if (window.innerWidth <= 900) {
        document.querySelector('.interactive-panel').scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    });
  });


  // ─── QUIZ ENGINE ──────────────────────────────
  const quizQuestions = [
    {
      figure: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="10" width="160" height="130" fill="rgba(255,107,0,0.05)" stroke="rgba(255,107,0,0.2)" stroke-width="1" rx="4"/>
        <rect x="40" y="30" width="80" height="60" fill="none" stroke="#FF6B00" stroke-width="2"/>
        <rect x="40" y="30" width="80" height="60" fill="rgba(255,107,0,0.08)"/>
        <line x1="120" y1="30" x2="160" y2="15" stroke="#FF6B00" stroke-width="1.5"/>
        <line x1="120" y1="90" x2="160" y2="75" stroke="#FF6B00" stroke-width="1.5"/>
        <line x1="40" y1="30" x2="80" y2="15" stroke="#FF6B00" stroke-width="1.5"/>
        <rect x="80" y="15" width="80" height="60" fill="none" stroke="#FF6B00" stroke-width="1.5" stroke-dasharray="4,2"/>
        <text x="100" y="125" fill="#FF6B00" font-size="11" text-anchor="middle" font-weight="600" font-family="system-ui">Que vista mostra ESTA face?</text>
        <path d="M 75 55 L 85 65 L 75 65 Z" fill="#FF6B00" opacity="0.6"/>
      </svg>`,
      question: 'A face destacada (de frente para voce) corresponde a qual vista?',
      options: ['Vista Superior', 'Vista Frontal', 'Vista Lateral Direita', 'Vista Posterior'],
      correct: 1,
      explanation: 'A face voltada diretamente para o observador eh sempre a Vista Frontal (VF). Eh a vista principal de qualquer desenho tecnico.'
    },
    {
      figure: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="10" width="160" height="130" fill="rgba(0,150,255,0.05)" stroke="rgba(0,150,255,0.2)" stroke-width="1" rx="4"/>
        <g transform="translate(50,25)">
          <rect x="0" y="20" width="60" height="40" fill="none" stroke="#666" stroke-width="1.5"/>
          <rect x="0" y="70" width="60" height="40" fill="rgba(0,150,255,0.15)" stroke="#0096FF" stroke-width="2"/>
          <text x="30" y="94" fill="#0096FF" font-size="9" text-anchor="middle" font-family="system-ui">???</text>
          <text x="30" y="44" fill="#888" font-size="9" text-anchor="middle" font-family="system-ui">VF</text>
          <line x1="30" y1="60" x2="30" y2="70" stroke="#444" stroke-width="0.5" stroke-dasharray="2,2"/>
        </g>
        <text x="100" y="135" fill="#0096FF" font-size="11" text-anchor="middle" font-weight="600" font-family="system-ui">No 1o diedro, o que fica ABAIXO da VF?</text>
      </svg>`,
      question: 'No 1o diedro (padrao ABNT), qual vista fica posicionada ABAIXO da Vista Frontal?',
      options: ['Vista Inferior', 'Vista Superior', 'Vista Posterior', 'Vista Lateral Direita'],
      correct: 1,
      explanation: 'No 1o diedro, a Vista Superior fica ABAIXO da VF. Parece contra-intuitivo, mas a regra eh: a vista vai pro lado OPOSTO de onde voce olha. Olhou de cima? A projecao cai pra baixo.'
    },
    {
      figure: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="10" width="160" height="130" fill="rgba(0,200,83,0.05)" stroke="rgba(0,200,83,0.2)" stroke-width="1" rx="4"/>
        <g transform="translate(30,20)">
          <rect x="40" y="10" width="60" height="45" fill="none" stroke="#888" stroke-width="1.5"/>
          <text x="70" y="37" fill="#888" font-size="9" text-anchor="middle" font-family="system-ui">VF</text>
          <rect x="40" y="60" width="60" height="45" fill="none" stroke="#888" stroke-width="1.5"/>
          <text x="70" y="87" fill="#888" font-size="9" text-anchor="middle" font-family="system-ui">VS</text>
          <rect x="105" y="10" width="40" height="45" fill="rgba(0,200,83,0.15)" stroke="#00C853" stroke-width="2"/>
          <text x="125" y="37" fill="#00C853" font-size="9" text-anchor="middle" font-family="system-ui">???</text>
        </g>
        <text x="100" y="135" fill="#00C853" font-size="11" text-anchor="middle" font-weight="600" font-family="system-ui">No 3o diedro, a direita da VF fica...</text>
      </svg>`,
      question: 'No 3o diedro (padrao americano), qual vista fica a DIREITA da Vista Frontal?',
      options: ['Vista Lateral Esquerda', 'Vista Posterior', 'Vista Lateral Direita', 'Vista Inferior'],
      correct: 2,
      explanation: 'No 3o diedro, a vista fica do MESMO lado de onde voce olha. Olhou da direita? A vista fica a direita. Simples assim. Diferente do 1o diedro onde tudo eh invertido.'
    },
    {
      figure: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="10" width="160" height="130" fill="rgba(255,179,0,0.05)" stroke="rgba(255,179,0,0.2)" stroke-width="1" rx="4"/>
        <g transform="translate(40,15)">
          <circle cx="60" cy="55" r="40" fill="none" stroke="#FFB300" stroke-width="2"/>
          <circle cx="60" cy="55" r="15" fill="none" stroke="#FFB300" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="60" y1="5" x2="60" y2="105" stroke="rgba(255,179,0,0.2)" stroke-width="0.5" stroke-dasharray="2,4"/>
          <line x1="10" y1="55" x2="110" y2="55" stroke="rgba(255,179,0,0.2)" stroke-width="0.5" stroke-dasharray="2,4"/>
        </g>
        <text x="100" y="135" fill="#FFB300" font-size="11" text-anchor="middle" font-weight="600" font-family="system-ui">Linha tracejada interna = ?</text>
      </svg>`,
      question: 'Um circulo com linha tracejada dentro de outro circulo. A linha tracejada indica o que?',
      options: ['Linha de centro', 'Aresta visivel', 'Aresta oculta (furo passante)', 'Cota de diametro'],
      correct: 2,
      explanation: 'Linha tracejada em desenho tecnico SEMPRE indica aresta oculta — algo que existe mas voce nao ve de onde esta olhando. Neste caso, eh um furo passante visto por cima.'
    },
    {
      figure: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="10" width="160" height="130" fill="rgba(156,39,176,0.05)" stroke="rgba(156,39,176,0.2)" stroke-width="1" rx="4"/>
        <g transform="translate(30,15)">
          <rect x="10" y="10" width="55" height="45" fill="none" stroke="#CE93D8" stroke-width="1.5"/>
          <text x="37" y="37" fill="#CE93D8" font-size="8" text-anchor="middle" font-family="system-ui">VF</text>
          <rect x="10" y="60" width="55" height="40" fill="none" stroke="#CE93D8" stroke-width="1.5"/>
          <text x="37" y="84" fill="#CE93D8" font-size="8" text-anchor="middle" font-family="system-ui">VS</text>
          <rect x="70" y="10" width="40" height="45" fill="none" stroke="#CE93D8" stroke-width="1.5"/>
          <text x="90" y="37" fill="#CE93D8" font-size="8" text-anchor="middle" font-family="system-ui">VLE</text>
        </g>
        <g transform="translate(48,100)">
          <circle cx="5" cy="8" r="7" fill="none" stroke="#CE93D8" stroke-width="1.5"/>
          <line x1="12" y1="8" x2="22" y2="8" stroke="#CE93D8" stroke-width="1.5"/>
          <line x1="17" y1="3" x2="17" y2="20" stroke="#CE93D8" stroke-width="1"/>
        </g>
        <text x="130" y="118" fill="#CE93D8" font-size="10" text-anchor="middle" font-weight="600" font-family="system-ui">Qual diedro?</text>
      </svg>`,
      question: 'O layout mostra VF no centro, VS embaixo e VLE a direita. Qual diedro esta sendo usado?',
      options: ['3o Diedro (ANSI)', '1o Diedro (ISO)', '2o Diedro', 'Nenhum, esta errado'],
      correct: 1,
      explanation: 'No 1o diedro (ISO/ABNT), a VS fica EMBAIXO da VF e a VLE fica a DIREITA. Tudo no lado oposto de onde se olha. O simbolo do 1o diedro eh aquele tronco de cone com as linhas.'
    }
  ];

  // Quiz state
  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  const quizContainer = document.getElementById('quizContainer');
  const quizResult = document.getElementById('quizResult');
  const quizProgressBar = document.getElementById('quizProgressBar');
  const quizProgressText = document.getElementById('quizProgressText');
  const quizFigure = document.getElementById('quizFigure');
  const quizQuestionText = document.getElementById('quizQuestionText');
  const quizOptions = document.getElementById('quizOptions');
  const quizFeedback = document.getElementById('quizFeedback');
  const feedbackIcon = document.getElementById('feedbackIcon');
  const feedbackText = document.getElementById('feedbackText');
  const quizNext = document.getElementById('quizNext');
  const resultScore = document.getElementById('resultScore');
  const resultMessage = document.getElementById('resultMessage');
  const quizRestart = document.getElementById('quizRestart');

  function renderQuestion() {
    const q = quizQuestions[currentQuestion];
    answered = false;

    // Progress
    const progress = ((currentQuestion) / quizQuestions.length) * 100;
    quizProgressBar.style.width = progress + '%';
    quizProgressText.textContent = `Pergunta ${currentQuestion + 1} de ${quizQuestions.length}`;

    // Figure
    quizFigure.innerHTML = q.figure;

    // Question text
    quizQuestionText.textContent = q.question;

    // Options
    quizOptions.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleAnswer(idx));
      quizOptions.appendChild(btn);
    });

    // Hide feedback and next
    quizFeedback.classList.add('hidden');
    quizFeedback.classList.remove('correct-feedback', 'wrong-feedback');
    quizNext.classList.add('hidden');
  }

  function handleAnswer(selected) {
    if (answered) return;
    answered = true;

    const q = quizQuestions[currentQuestion];
    const isCorrect = selected === q.correct;
    const options = quizOptions.querySelectorAll('.quiz-option');

    // Disable all options
    options.forEach((opt, idx) => {
      opt.classList.add('disabled');
      if (idx === q.correct) opt.classList.add('correct');
      if (idx === selected && !isCorrect) opt.classList.add('wrong');
    });

    // Score
    if (isCorrect) score++;

    // Feedback
    quizFeedback.classList.remove('hidden', 'correct-feedback', 'wrong-feedback');
    if (isCorrect) {
      quizFeedback.classList.add('correct-feedback');
      feedbackIcon.textContent = '\u2714';
      feedbackText.innerHTML = `<strong>Correto!</strong> ${q.explanation}`;
    } else {
      quizFeedback.classList.add('wrong-feedback');
      feedbackIcon.textContent = '\u2718';
      feedbackText.innerHTML = `<strong>Errado.</strong> ${q.explanation}`;
    }

    // Show next button
    quizNext.classList.remove('hidden');
    quizNext.textContent = currentQuestion < quizQuestions.length - 1 ? 'Proxima \u2192' : 'Ver resultado';
  }

  quizNext.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  });

  function showResult() {
    quizContainer.classList.add('hidden');
    quizResult.classList.remove('hidden');

    const pct = Math.round((score / quizQuestions.length) * 100);
    resultScore.textContent = `${score}/${quizQuestions.length}`;
    resultScore.style.color = pct >= 60 ? 'var(--success)' : 'var(--error)';

    if (pct === 100) {
      resultMessage.textContent = 'Perfeito. Voce ta pronto pro chao de fabrica.';
    } else if (pct >= 80) {
      resultMessage.textContent = 'Muito bom. Mas revisa os que errou, na industria nao tem meio certo.';
    } else if (pct >= 60) {
      resultMessage.textContent = 'Passou raspando. Releia o conteudo e tenta de novo.';
    } else if (pct >= 40) {
      resultMessage.textContent = 'Hmm... ta precisando estudar mais. Volta la em cima e le com calma.';
    } else {
      resultMessage.textContent = 'Para tudo e volta pro comeco. Sério.';
    }
  }

  quizRestart.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizContainer.classList.remove('hidden');
    quizResult.classList.add('hidden');
    renderQuestion();
  });

  // Init quiz
  renderQuestion();


  // ─── SCROLL ANIMATIONS ────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-fade-in-up, .animate-fade-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });

});
