const fs = require('fs');
const path = require('path');
const dataDir = path.join(__dirname, 'data');

const unit10_mcqs = [
    { "question": "f(n)=O(g(n)) means:", "choices": ["f grows much faster than g", "f grows at most as fast as g", "f grows exactly as fast as g", "f grows much slower than g"], "correctIndex": 1, "explanation": "Big-O provides an asymptotic upper bound.", "source": "Examlet 10" },
    { "question": "Is 5n^2 + 3n = O(n^3)?", "choices": ["Yes", "No"], "correctIndex": 0, "explanation": "Yes, n^2 is bounded above by n^3 for large n.", "source": "Examlet 10" },
    { "question": "Which grows faster: n! or 2^n?", "choices": ["2^n", "n!"], "correctIndex": 1, "explanation": "Factorials grow faster than exponentials.", "source": "Examlet 10" }
];
const unit10_frqs = [
    { "instruction": "Unroll the following recurrence.", "claim": "T(n) = 2T(n/2) + n for n > 1. T(1) = 1. Prove T(n) is O(n log n).", "solution": "Unrolling: T(n) = 2(2T(n/4) + n/2) + n = 4T(n/4) + 2n. At step k, T(n) = 2^k T(n/2^k) + kn. Base case when n/2^k = 1, so k = log n. Substituting gives T(n) = nT(1) + n log n = n + n log n, which is O(n log n). □", "source": "Examlet 10" }
];
const unit10_skills = ["Determine Big-O bounds", "Unroll recurrence relations", "Master recursion trees"];

const unit11_mcqs = [
    { "question": "A Finite State Machine consists of:", "choices": ["States, transitions, start state, exact one final state", "States, transitions, alphabet, start state, final states", "Turing tape and head"], "correctIndex": 1, "explanation": "A DFA is a 5-tuple: Q, Σ, δ, q0, F.", "source": "Examlet 11" },
    { "question": "Are the rational numbers countable?", "choices": ["Yes", "No"], "correctIndex": 0, "explanation": "Rationals can be enumerated via Cantor's zig-zag over a 2D grid of fractions.", "source": "Examlet 11" }
];
const unit11_frqs = [
    { "instruction": "Prove the following claim.", "claim": "The set of all infinite binary strings is uncountable.", "solution": "Proof by Cantor diagonalization: Suppose they are countable. We enumerate them s1, s2, ... Create a new string S where the i-th bit is the flip of the i-th bit of si. S is not in the list because it differs from every si in at least the i-th position. Thus the set is uncountable. □", "source": "Examlet 11" }
];
const unit11_skills = ["Design finite state machines", "Recognize languages", "Identify uncountability via Diagonalization"];

fs.writeFileSync(path.join(dataDir, 'unit10_mcqs.json'), JSON.stringify(unit10_mcqs, null, 2)); fs.writeFileSync(path.join(dataDir, 'unit10_frqs.json'), JSON.stringify(unit10_frqs, null, 2)); fs.writeFileSync(path.join(dataDir, 'unit10_skills.json'), JSON.stringify(unit10_skills, null, 2));
fs.writeFileSync(path.join(dataDir, 'unit11_mcqs.json'), JSON.stringify(unit11_mcqs, null, 2)); fs.writeFileSync(path.join(dataDir, 'unit11_frqs.json'), JSON.stringify(unit11_frqs, null, 2)); fs.writeFileSync(path.join(dataDir, 'unit11_skills.json'), JSON.stringify(unit11_skills, null, 2));
console.log('Generated units 10-11');
