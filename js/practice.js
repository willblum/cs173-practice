// ─── State ───────────────────────────────────────
const state = {};

function getUnitState(unit, mode) {
  const key = `${unit}_${mode}`;
  if (!state[key]) {
    state[key] = {
      questions: [],
      remaining: [],
      total: 0,
      answered: 0,
      correct: 0,
    };
  }
  return state[key];
}

// ─── Unit collapse/expand ────────────────────────
function toggleUnit(unit) {
  const body = document.getElementById(`body-${unit}`);
  const chevron = document.getElementById(`chevron-${unit}`);
  body.classList.toggle('collapsed');
  chevron.textContent = body.classList.contains('collapsed') ? '▸' : '▾';
}

// ─── Start a mode ────────────────────────────────
async function startMode(unit, mode, btnEl) {
  // highlight active tab inside that unit's section
  const section = document.getElementById(`section-${unit}`);
  section.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
  btnEl.classList.add('active');

  if (mode === 'mcq') {
    await loadMCQ(unit);
  } else if (mode === 'frq') {
    await loadFRQ(unit);
  } else if (mode === 'skills') {
    await loadSkills(unit);
  }
}

// ─── Cycling logic ───────────────────────────────
async function ensureQuestions(unit, mode) {
  const s = getUnitState(unit, mode);
  if (s.questions.length === 0) {
    const suffix = mode === 'mcq' ? 'mcqs' : 'frqs';
    const res = await fetch(`data/${unit}_${suffix}.json`);
    s.questions = await res.json();
    s.total = s.questions.length;
    s.remaining = [];
    s.answered = 0;
    s.correct = 0;
  }
  // refill deck if empty
  if (s.remaining.length === 0) {
    s.remaining = shuffle([...Array(s.questions.length).keys()]);
    // if restarting a full cycle, reset stats
    if (s.answered >= s.total && s.total > 0) {
      s.answered = 0;
      s.correct = 0;
    }
  }
  return s;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function nextIndex(unit, mode) {
  const s = getUnitState(unit, mode);
  return s.remaining.pop();
}

// ─── Progress bar ────────────────────────────────
function renderProgress(unit, mode) {
  const area = document.getElementById(`progress-${unit}`);
  const s = getUnitState(unit, mode);

  if (mode !== 'mcq' && mode !== 'frq') {
    area.style.display = 'none';
    return;
  }

  area.style.display = 'block';
  const pct = s.total > 0 ? Math.round((s.answered / s.total) * 100) : 0;

  let statsHTML = `<span>${s.answered} / ${s.total} questions</span>`;
  if (mode === 'mcq' && s.answered > 0) {
    const accPct = Math.round((s.correct / s.answered) * 100);
    statsHTML += `<span class="accuracy-stat">${s.correct}/${s.answered} correct (${accPct}%)</span>`;
  }

  area.innerHTML = `
    <div class="progress-bar-track">
      <div class="progress-bar-fill" style="width:${pct}%"></div>
    </div>
    <div class="progress-stats">${statsHTML}</div>
  `;
}

// ─── MCQ ─────────────────────────────────────────
async function loadMCQ(unit) {
  const s = await ensureQuestions(unit, 'mcq');
  const idx = nextIndex(unit, 'mcq');
  const q = s.questions[idx];
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const contentEl = document.getElementById(`content-${unit}`);

  let choicesHTML = '<div class="choices-list">';
  for (let i = 0; i < q.choices.length; i++) {
    choicesHTML += `
      <button onclick="checkMCQ('${unit}',${i},${q.correctIndex})"
              class="choice-btn"
              id="choice-${unit}-${i}">
        <span class="choice-letter">${letters[i]}</span>
        <span>${q.choices[i]}</span>
      </button>
    `;
  }
  choicesHTML += '</div>';

  contentEl.innerHTML = `
    <div class="question-card">
      <span class="question-label">Multiple Choice</span>
      <p class="question-text">${q.question}</p>
      ${choicesHTML}
      <div id="mcqResult-${unit}"></div>
      <div id="mcqExplanation-${unit}" style="display:none;">
        <div class="explanation-box">
          <div class="explanation-label">Explanation</div>
          <p>${q.explanation}</p>
        </div>
      </div>
      <div class="action-row">
        <button class="btn btn-secondary" onclick="loadMCQ('${unit}')">Next Question →</button>
      </div>
      ${q.source ? `<span class="source-tag">${q.source}</span>` : ''}
    </div>
  `;

  renderProgress(unit, 'mcq');
  if (window.MathJax) MathJax.typeset();
}

function checkMCQ(unit, selected, correct) {
  const s = getUnitState(unit, 'mcq');
  s.answered++;

  const result = document.getElementById(`mcqResult-${unit}`);
  const explanation = document.getElementById(`mcqExplanation-${unit}`);

  const section = document.getElementById(`section-${unit}`);
  section.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

  if (selected === correct) {
    s.correct++;
    result.innerHTML = `<div class="result-msg correct">✓ Correct!</div>`;
    document.getElementById(`choice-${unit}-${correct}`).classList.add('correct');
  } else {
    result.innerHTML = `<div class="result-msg incorrect">✗ Incorrect</div>`;
    document.getElementById(`choice-${unit}-${selected}`).classList.add('incorrect');
    document.getElementById(`choice-${unit}-${correct}`).classList.add('correct');
  }

  explanation.style.display = 'block';
  renderProgress(unit, 'mcq');
}

// ─── FRQ ─────────────────────────────────────────
async function loadFRQ(unit) {
  const s = await ensureQuestions(unit, 'frq');
  const idx = nextIndex(unit, 'frq');
  const q = s.questions[idx];
  const contentEl = document.getElementById(`content-${unit}`);

  contentEl.innerHTML = `
    <div class="question-card">
      <span class="question-label">Free Response</span>
      <p class="question-text">${q.instruction}</p>
      <div class="claim-block">${q.claim}</div>

      <p class="section-label">Your Answer (LaTeX supported)</p>
      <textarea id="latexInput-${unit}" rows="4"
        oninput="updatePreview('${unit}')"
        placeholder="Type your answer here..."></textarea>

      <p class="section-label">Live Preview</p>
      <div class="preview-box" id="preview-${unit}">$$ $$</div>

      <div class="action-row">
        <button class="btn btn-primary" onclick="revealSolution('${unit}')">Reveal Solution</button>
        <button class="btn btn-secondary" onclick="advanceFRQ('${unit}')">Next Question →</button>
      </div>

      <div id="solution-${unit}" style="display:none;">
        <div class="solution-box">
          <div class="solution-label">Solution</div>
          <p>${q.solution}</p>
        </div>
      </div>

      ${q.source ? `<span class="source-tag">${q.source}</span>` : ''}
    </div>
  `;

  renderProgress(unit, 'frq');
  if (window.MathJax) MathJax.typeset();
}

function advanceFRQ(unit) {
  const s = getUnitState(unit, 'frq');
  s.answered++;
  renderProgress(unit, 'frq');
  loadFRQ(unit);
}

function updatePreview(unit) {
  const input = document.getElementById(`latexInput-${unit}`).value;
  const preview = document.getElementById(`preview-${unit}`);
  preview.innerHTML = input;
  if (window.MathJax) MathJax.typesetPromise([preview]);
}

function revealSolution(unit) {
  const sol = document.getElementById(`solution-${unit}`);
  if (sol) {
    sol.style.display = 'block';
    if (window.MathJax) MathJax.typeset();
  }
}

// ─── Skills ──────────────────────────────────────
async function loadSkills(unit) {
  const res = await fetch(`data/${unit}_skills.json`);
  const skills = await res.json();
  const contentEl = document.getElementById(`content-${unit}`);

  let html = `
    <div class="question-card">
      <span class="question-label">Skill Checklist</span>
      <p class="question-text">Key skills to master for this unit:</p>
      <ul class="skills-list">
  `;
  for (let i = 0; i < skills.length; i++) {
    html += `<li>${skills[i]}</li>`;
  }
  html += `</ul></div>`;
  contentEl.innerHTML = html;

  document.getElementById(`progress-${unit}`).style.display = 'none';
  if (window.MathJax) MathJax.typeset();
}