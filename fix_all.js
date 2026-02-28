const fs = require('fs');
const https = require('https');
const path = require('path');
const dataDir = path.join(__dirname, 'data');

const units = [
    { id: 1, title: 'Prereqs and Logic', desc: 'Sets, logic operators, quantifiers, negations' },
    { id: 2, title: 'Proofs & Number Theory', desc: 'Direct proof, contrapositive, divisibility, gcd' },
    { id: 3, title: 'Modular Arithmetic & Sets', desc: 'Congruence, Euclidean algorithm, subsets, power sets' },
    { id: 4, title: 'Functions', desc: 'Domain, image, onto (surjective), one-to-one (injective)' },
    { id: 5, title: 'Collections of Sets & Graphs', desc: 'Partitions, degrees, isomorphism, bipartite' },
    { id: 6, title: 'Two-way Bounding & Contradiction', desc: 'Set equality proofs, proof by contradiction' },
    { id: 7, title: 'Induction', desc: 'Weak induction, strong induction' },
    { id: 8, title: 'Recursive Definition', desc: 'Recurrence relations, structural induction' },
    { id: 9, title: 'Trees & Grammars', desc: 'Nodes, edges, height, induction on trees, CFGs' },
    { id: 10, title: 'Big-O & Recursion Trees', desc: 'Algorithm analysis, unrolling, recursion trees' },
    { id: 11, title: 'Code Analysis & NP', desc: 'Algorithm properties, P vs NP, complexity classes' },
    { id: 12, title: 'Inequality Proofs & State Diagrams', desc: 'Bounding summations, finite state machines' }
];

// Rewrite units.html completely in the middle section
const unitsHtmlPatch = units.map(u => `
    <!-- Unit ${u.id} -->
    <div class="unit-section" id="section-unit${u.id}">
      <div class="unit-section-header" onclick="toggleUnit('unit${u.id}')">
        <div class="unit-number">${u.id}</div>
        <div class="unit-info">
          <h3>${u.title}</h3>
          <p>${u.desc}</p>
        </div>
        <span class="unit-chevron" id="chevron-unit${u.id}">▸</span>
      </div>

      <div class="unit-body collapsed" id="body-unit${u.id}">
        <div class="mode-tabs">
          <button class="mode-tab" onclick="startMode('unit${u.id}','mcq',this)">Multiple Choice</button>
          <button class="mode-tab" onclick="startMode('unit${u.id}','frq',this)">Free Response</button>
          <button class="mode-tab" onclick="startMode('unit${u.id}','skills',this)">Skill Checklist</button>
        </div>
        <div class="progress-area" id="progress-unit${u.id}" style="display:none;"></div>
        <div class="unit-content" id="content-unit${u.id}"></div>
      </div>
    </div>`).join('\n');

const htmlPath = 'c:\\Users\\wildc\\OneDrive\\cs173-practice\\units.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const topParts = html.split('<!-- Unit 1 -->');
const bottomParts = html.split('<script src="js/practice.js"></script>');
if (topParts.length > 1 && bottomParts.length > 1) {
    const newHtml = topParts[0] + unitsHtmlPatch + '\n  </div>\n\n  <script src="js/practice.js"></script>\n</body>\n</html>';
    fs.writeFileSync(htmlPath, newHtml);
    console.log('units.html fully rebuilt with 12 units.');
}

// Generate basic mock JSON for mcq and frq so the app doesn't break
units.forEach(u => {
    if (u.id > 1) {
        fs.writeFileSync(path.join(dataDir, 'unit' + u.id + '_mcqs.json'), JSON.stringify([{
            "question": "Multiple choice question regarding " + u.title,
            "choices": ["Option A", "Option B", "Option C", "Option D"],
            "correctIndex": 0,
            "explanation": "Placeholder explanation.",
            "source": "Examlet " + u.id
        }], null, 2));

        fs.writeFileSync(path.join(dataDir, 'unit' + u.id + '_frqs.json'), JSON.stringify([{
            "instruction": "Prove a claim regarding " + u.title,
            "claim": "Claim: Let X be Y.",
            "solution": "1. Proof step 1.\n2. Q.E.D.",
            "source": "Examlet " + u.id
        }], null, 2));
    }
});

// Fetch unit 12 skills
const url12 = 'https://courses.grainger.illinois.edu/cs173/sp2026/AB/Exams/examlet12-skills.html';
https.get(url12, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const skills = [];
        const parts = data.split(/<h[123][^>]*>/i);
        const content = parts.length > 1 ? parts.slice(1).join(' ') : data;
        const regex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
        let match;
        while ((match = regex.exec(content)) !== null) {
            let text = match[1].replace(/<[^>]*>?/gm, ' ').trim();
            text = text.replace(/\s+/g, ' ').replace(/&#x2013;/g, '-').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            text = text.replace(/&#39;/g, "'").replace(/&quot;/g, '"');
            if (text.length > 10 && text.split(' ').length > 2 && !text.includes('href=')) {
                skills.push(text);
            }
        }
        if (skills.length > 0) {
            fs.writeFileSync(path.join(dataDir, 'unit12_skills.json'), JSON.stringify(skills, null, 2));
            console.log('Saved Unit 12 skills');
        }
    });
});
