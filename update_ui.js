const fs = require('fs');
const units = [
    { id: 3, title: 'Number Theory', desc: 'Divisibility, prime factorizations, gcd, Euclidean algorithm' },
    { id: 4, title: 'Sets', desc: 'Subsets, power sets, Cartesian products, partitions' },
    { id: 5, title: 'Relations', desc: 'Reflexive, symmetric, transitive, equivalence relations, partial orders' },
    { id: 6, title: 'Functions', desc: 'Domain, image, onto (surjective), one-to-one (injective), composition' },
    { id: 7, title: 'Graphs', desc: 'Degrees, isomorphism, walks, paths, cycles, bipartite graphs' },
    { id: 8, title: 'Induction', desc: 'Weak induction, strong induction, structural induction' },
    { id: 9, title: 'Trees', desc: 'Nodes, edges, height, bounding summations, tree induction' },
    { id: 10, title: 'Big-O', desc: 'Algorithm analysis, Big-O, bounding sums, unrolling' },
    { id: 11, title: 'State Machines & Countability', desc: 'Finite state machines, transitions, countable vs uncountable sets' }
];

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

const targetStr = '  </div>\\n\\n  <script';
// To be safe we'll use a regex replace in case line breaks vary
html = html.replace(/<\/div>\s*<\/div>\s*<script src="js\/practice\.js"><\/script>/,
    `    </div>\n${unitsHtmlPatch}\n  </div>\n\n  <script src="js/practice.js"></script>`);

fs.writeFileSync(htmlPath, html);
console.log('Successfully injected units 3-11 into units.html');
