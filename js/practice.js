const params = new URLSearchParams(window.location.search);
const unit = params.get("unit");

const unitNames = {
  unit1: "Unit 1: Prereqs & Logic",
  unit2: "Unit 2: Proofs"
};

document.getElementById("unitTitle").innerText = unitNames[unit] || unit;

let activeTab = null;

function setActiveTab(tabId) {
  document.querySelectorAll(".mode-tab").forEach(t => t.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  activeTab = tabId;
}

// ─── FRQ ─────────────────────────────────────────

async function showFRQ() {
  setActiveTab("tabFRQ");

  const res = await fetch(`data/${unit}_frqs.json`);
  const questions = await res.json();
  const q = questions[Math.floor(Math.random() * questions.length)];

  document.getElementById("content").innerHTML = `
    <div class="question-card">
      <span class="question-label">Free Response</span>
      <p class="question-text">${q.instruction}</p>

      <div class="claim-block">${q.claim}</div>

      <p class="section-label">Your Answer (LaTeX supported)</p>
      <textarea id="latexInput" rows="4"
        oninput="updatePreview()"
        placeholder="Type your answer here..."></textarea>

      <p class="section-label">Live Preview</p>
      <div class="preview-box" id="preview">$$ $$</div>

      <div class="action-row">
        <button class="btn btn-primary" onclick="revealSolution()">Reveal Solution</button>
        <button class="btn btn-secondary" onclick="showFRQ()">Next Question →</button>
      </div>

      <div id="solution" style="display:none;">
        <div class="solution-box">
          <div class="solution-label">Solution</div>
          <p>${q.solution}</p>
        </div>
      </div>

      ${q.source ? `<span class="source-tag">${q.source}</span>` : ''}
    </div>
  `;

  if (window.MathJax) MathJax.typeset();
}

function updatePreview() {
  const input = document.getElementById("latexInput").value;
  const preview = document.getElementById("preview");
  preview.innerHTML = input;
  if (window.MathJax) MathJax.typesetPromise([preview]);
}

function revealSolution() {
  const sol = document.getElementById("solution");
  if (sol) {
    sol.style.display = "block";
    if (window.MathJax) MathJax.typeset();
  }
}

// ─── MCQ ─────────────────────────────────────────

async function showMCQ() {
  setActiveTab("tabMCQ");

  const res = await fetch(`data/${unit}_mcqs.json`);
  const questions = await res.json();
  const q = questions[Math.floor(Math.random() * questions.length)];

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  let choicesHTML = '<div class="choices-list">';
  for (let i = 0; i < q.choices.length; i++) {
    choicesHTML += `
      <button onclick="checkAnswer(${i}, ${q.correctIndex})"
              class="choice-btn"
              id="choice-${i}">
        <span class="choice-letter">${letters[i]}</span>
        <span>${q.choices[i]}</span>
      </button>
    `;
  }
  choicesHTML += '</div>';

  document.getElementById("content").innerHTML = `
    <div class="question-card">
      <span class="question-label">Multiple Choice</span>
      <p class="question-text">${q.question}</p>

      ${choicesHTML}

      <div id="mcqResult"></div>
      <div id="mcqExplanation" style="display:none;">
        <div class="explanation-box">
          <div class="explanation-label">Explanation</div>
          <p>${q.explanation}</p>
        </div>
      </div>

      <div class="action-row">
        <button class="btn btn-secondary" onclick="showMCQ()">Next Question →</button>
      </div>

      ${q.source ? `<span class="source-tag">${q.source}</span>` : ''}
    </div>
  `;

  if (window.MathJax) MathJax.typeset();
}

function checkAnswer(selected, correct) {
  const result = document.getElementById("mcqResult");
  const explanation = document.getElementById("mcqExplanation");

  // Disable all buttons
  document.querySelectorAll(".choice-btn").forEach(btn => btn.disabled = true);

  if (selected === correct) {
    result.innerHTML = `<div class="result-msg correct">✓ Correct!</div>`;
    document.getElementById(`choice-${correct}`).classList.add("correct");
  } else {
    result.innerHTML = `<div class="result-msg incorrect">✗ Incorrect</div>`;
    document.getElementById(`choice-${selected}`).classList.add("incorrect");
    document.getElementById(`choice-${correct}`).classList.add("correct");
  }

  explanation.style.display = "block";
}

// ─── Skills ──────────────────────────────────────

async function showSkills() {
  setActiveTab("tabSkills");

  const res = await fetch(`data/${unit}_skills.json`);
  const skills = await res.json();

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

  document.getElementById("content").innerHTML = html;

  if (window.MathJax) MathJax.typeset();
}