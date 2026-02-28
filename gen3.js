const fs = require('fs');
const path = require('path');
const dataDir = path.join(__dirname, 'data');

const unit7_mcqs = [
    { "question": "The Handshaking Theorem states that the sum of the degrees of all vertices in a graph is equal to:", "choices": ["The number of edges", "Twice the number of edges", "Number of vertices squared", "Zero"], "correctIndex": 1, "explanation": "Every edge contributes 2 to the sum of degrees (one for each endpoint).", "source": "Examlet 07" },
    { "question": "A complete graph K_n has how many edges?", "choices": ["n", "n(n-1)/2", "n^2", "2^n"], "correctIndex": 1, "explanation": "Every vertex connects to every other vertex, yielding n(n-1)/2 edges.", "source": "Examlet 07" },
    { "question": "Does a graph with degrees 3, 3, 3, 3 exist?", "choices": ["Yes", "No"], "correctIndex": 0, "explanation": "This sequence is graphical (e.g., K_4). Sum is 12, which is even.", "source": "Examlet 07" },
    { "question": "A complete bipartite graph K_3,4 has how many edges?", "choices": ["7", "12", "14", "81"], "correctIndex": 1, "explanation": "In K_m,n, every vertex in the set of size m connects to every vertex in the set of size n, so there are m*n edges.", "source": "Examlet 07" }
];
const unit7_frqs = [
    { "instruction": "Prove the following claim about graphs.", "claim": "If a graph G has n vertices and every vertex has degree at least n/2, then G represents a connected component.", "solution": "Proof: Assume by contradiction that G is not connected. Then it has at least two components. Pick u taking from one component and v from another. The component containing u has at least deg(u)+1 vertices, so ≥ n/2 + 1 vertices. The component containing v has ≥ n/2 + 1 vertices. Summing these gives > n, a contradiction. Thus G is connected. □", "source": "Examlet 07" }
];
const unit7_skills = ["Compute vertices and edges", "Apply handshaking theorem", "Identify isomorphic graphs"];

const unit8_mcqs = [
    { "question": "In a proof by mathematical induction, the base case:", "choices": ["Proves P(1)", "Assumes P(k)", "Proves P(k+1)", "Proves P(k)"], "correctIndex": 0, "explanation": "The base case establishes that the property holds for the starting value.", "source": "Examlet 08" },
    { "question": "What is the inductive hypothesis in weak induction?", "choices": ["Assume P(1)", "Assume P(k) is true for some arbitrary k ≥ base", "Assume P(k+1) is true", "Assume P(j) is true for all base ≤ j ≤ k"], "correctIndex": 1, "explanation": "Weak induction assumes P(k) to prove P(k+1).", "source": "Examlet 08" }
];
const unit8_frqs = [
    { "instruction": "Prove using weak induction.", "claim": "For all n ≥ 1, sum of first n odd integers is n^2.", "solution": "Base case n=1: 1 = 1^2. True. Inductive Hypothesis: Assume sum up to 2k-1 is k^2. Inductive step: For n=k+1, sum to 2(k+1)-1 = sum to 2k-1 + (2k+1) = k^2 + 2k + 1 = (k+1)^2. This matches the formula. □", "source": "Examlet 08" }
];
const unit8_skills = ["Write inductive hypotheses correctly", "Use the IH in the inductive step", "Distinguish weak and strong induction"];

const unit9_mcqs = [
    { "question": "A tree with n vertices has how many edges?", "choices": ["n", "n-1", "n+1", "n/2"], "correctIndex": 1, "explanation": "A fundamental property of trees is that they have exactly n-1 edges.", "source": "Examlet 09" },
    { "question": "What is the chromatic number of any tree (with >= 2 vertices)?", "choices": ["1", "2", "3", "Unknown"], "correctIndex": 1, "explanation": "Trees are bipartite (no odd cycles), so they can be colored with 2 colors.", "source": "Examlet 09" }
];
const unit9_frqs = [
    { "instruction": "Prove by structural induction.", "claim": "If T is a binary tree of height h, it has at most 2^(h+1)-1 nodes.", "solution": "Base case: a tree with only a root has height 0 and 1 node. 2^(0+1)-1 = 1. True. IH: Assume this holds for trees up to height k. Step: A tree of height k+1 consists of a root and 2 subtrees of height at most k. Nodes = 1 + nodes(T1) + nodes(T2) ≤ 1 + 2^(k+1)-1 + 2^(k+1)-1 = 2*2^(k+1) - 1 = 2^(k+2) - 1. Proved. □", "source": "Examlet 09" }
];
const unit9_skills = ["Calculate height of m-ary trees", "Count leaves and internal nodes", "Do structural induction on trees"];

fs.writeFileSync(path.join(dataDir, 'unit7_mcqs.json'), JSON.stringify(unit7_mcqs, null, 2)); fs.writeFileSync(path.join(dataDir, 'unit7_frqs.json'), JSON.stringify(unit7_frqs, null, 2)); fs.writeFileSync(path.join(dataDir, 'unit7_skills.json'), JSON.stringify(unit7_skills, null, 2));
fs.writeFileSync(path.join(dataDir, 'unit8_mcqs.json'), JSON.stringify(unit8_mcqs, null, 2)); fs.writeFileSync(path.join(dataDir, 'unit8_frqs.json'), JSON.stringify(unit8_frqs, null, 2)); fs.writeFileSync(path.join(dataDir, 'unit8_skills.json'), JSON.stringify(unit8_skills, null, 2));
fs.writeFileSync(path.join(dataDir, 'unit9_mcqs.json'), JSON.stringify(unit9_mcqs, null, 2)); fs.writeFileSync(path.join(dataDir, 'unit9_frqs.json'), JSON.stringify(unit9_frqs, null, 2)); fs.writeFileSync(path.join(dataDir, 'unit9_skills.json'), JSON.stringify(unit9_skills, null, 2));
console.log('Generated units 7-9');
