const params = new URLSearchParams(window.location.search);
const unit = params.get("unit");

document.getElementById("unitTitle").innerText =
  `Practice for ${unit}`;

async function showFRQ() {
  const res = await fetch(`data/${unit}_frqs.json`);
  const questions = await res.json();

  const q = questions[Math.floor(Math.random() * questions.length)];

  document.getElementById("content").innerHTML = `
    <h3>${q.instruction}</h3>

    <p><strong>Claim:</strong> ${q.claim}</p>

    <h4>Your Answer (LaTeX):</h4>
    <textarea id="latexInput" rows="4" cols="60"
      oninput="updatePreview()"
      placeholder="Type LaTeX here..."></textarea>

    <h4>Preview:</h4>
    <div id="preview">$$ $$</div>

    <button onclick="revealSolution()">Reveal Solution</button>
    <button onclick="showFRQ()">New Random Question</button>

    <div id="solution" style="display:none; margin-top:15px;">
      <p><strong>Solution:</strong> ${q.solution}</p>
    </div>
  `;

  if (window.MathJax) {
    MathJax.typeset();
  }
}

function updatePreview() {
  const input = document.getElementById("latexInput").value;
  const preview = document.getElementById("preview");

  preview.innerHTML = input;

  if (window.MathJax) {
    MathJax.typesetPromise([preview]);
  }
}

function revealSolution() {
  document.getElementById("solution").style.display = "block";
}

async function showMCQ() {
  const res = await fetch(`data/${unit}_mcqs.json`);
  const questions = await res.json();

  const q = questions[Math.floor(Math.random() * questions.length)];

  let choicesHTML = "";

  for (let i = 0; i < q.choices.length; i++) {
    choicesHTML += `
      <button onclick="checkAnswer(${i}, ${q.correctIndex})" 
              class="choice-btn" 
              id="choice-${i}">
        ${q.choices[i]}
      </button><br><br>
    `;
  }

  document.getElementById("content").innerHTML = `
    <h3>Multiple Choice</h3>
    <p><strong>Question:</strong> ${q.question}</p>

    ${choicesHTML}

    <div id="mcqResult" style="margin-top:10px;"></div>
    <div id="mcqExplanation" style="display:none; margin-top:10px;">
      <strong>Explanation:</strong> ${q.explanation}
    </div>

    <button onclick="showMCQ()">New Random Question</button>
  `;
}

function checkAnswer(selected, correct) {
  const result = document.getElementById("mcqResult");
  const explanation = document.getElementById("mcqExplanation");

  // Disable all buttons
  const buttons = document.querySelectorAll(".choice-btn");
  buttons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
    result.innerHTML = "<span style='color:green;'>Correct!</span>";
    document.getElementById(`choice-${correct}`).style.backgroundColor = "#c8f7c5";
  } else {
    result.innerHTML = "<span style='color:red;'>Incorrect.</span>";
    document.getElementById(`choice-${selected}`).style.backgroundColor = "#f7c5c5";
    document.getElementById(`choice-${correct}`).style.backgroundColor = "#c8f7c5";
  }

  explanation.style.display = "block";
}

async function showSkills() {
  const res = await fetch(`data/${unit}_skills.json`);
  const skills = await res.json();

  let html = "<h3>Skill List</h3><ul>";

  for (let i = 0; i < skills.length; i++) {
    html += "<li>" + skills[i] + "</li>";
  }

  html += "</ul>";

  document.getElementById("content").innerHTML = html;
}