const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

const unit3_mcqs = [
    { "question": "If a | b and a | c, then a | (b + c).", "choices": ["True", "False"], "correctIndex": 0, "explanation": "This is a fundamental property of divisibility.", "source": "Examlet 03" },
    { "question": "gcd(0, 5) = ?", "choices": ["0", "5", "1", "Undefined"], "correctIndex": 1, "explanation": "gcd(0, a) = a for any positive integer a, because every integer divides 0.", "source": "Examlet 03" },
    { "question": "What is 15 mod 4?", "choices": ["1", "2", "3", "4"], "correctIndex": 2, "explanation": "15 = 4 * 3 + 3. The remainder is 3.", "source": "Examlet 03" },
    { "question": "If a ≡ b (mod m), then m | (a - b).", "choices": ["True", "False"], "correctIndex": 0, "explanation": "This is the definition of congruence modulo m.", "source": "Examlet 03" },
    { "question": "What is the Euclidean Algorithm used for?", "choices": ["Finding prime factors", "Finding the Greatest Common Divisor (GCD)", "Finding Least Common Multiple (LCM)", "Sorting arrays"], "correctIndex": 1, "explanation": "The Euclidean algorithm efficiently computes the GCD of two numbers.", "source": "Examlet 03" },
    { "question": "Is 1 a prime number?", "choices": ["True", "False"], "correctIndex": 1, "explanation": "1 is not prime. Prime numbers are strictly greater than 1 and have exactly two distinct positive divisors.", "source": "Examlet 03" }
];

const unit3_frqs = [
    { "instruction": "Prove the following claim using the definition of divisibility.", "claim": "For all integers a, b, c, if a | b and b | c, then a | c.", "solution": "Proof: Since a | b, there exists an integer k such that b = ak. Since b | c, there exists an integer j such that c = bj. Substituting the first into the second gives c = (ak)j = a(kj). Since kj is an integer, a | c. □", "source": "Examlet 03" },
    { "instruction": "Prove the following claim about congruences.", "claim": "If a ≡ b (mod m) and c ≡ d (mod m), then a+c ≡ b+d (mod m).", "solution": "Proof: Since a ≡ b (mod m), m | (a-b), so a-b = mk for some integer k. Since c ≡ d (mod m), m | (c-d), so c-d = mj for some integer j. Adding the equations: (a-b) + (c-d) = mk + mj. Rearranging: (a+c) - (b+d) = m(k+j). Since (k+j) is an integer, m | ((a+c) - (b+d)), which means a+c ≡ b+d (mod m). □", "source": "Examlet 03" }
];

const unit3_skills = ["Understand divisibility and congruence", "Apply the Euclidean algorithm", "Prove properties of integers using definitions"];

const unit4_mcqs = [
    { "question": "Let A = {1, 2}. What is the size of the power set P(A)?", "choices": ["2", "3", "4", "8"], "correctIndex": 2, "explanation": "The power set of a set with n elements has 2^n elements. Here, 2^2 = 4.", "source": "Examlet 04" },
    { "question": "Is ∅ ∈ P({1, 2})?", "choices": ["True", "False"], "correctIndex": 0, "explanation": "The empty set is a subset of every set, so it is an element of the power set.", "source": "Examlet 04" },
    { "question": "What is |A × B| if |A| = 3 and |B| = 5?", "choices": ["8", "15", "3", "5"], "correctIndex": 1, "explanation": "The cardinality of the Cartesian product A × B is |A| * |B| = 15.", "source": "Examlet 04" },
    { "question": "If A ⊆ B, then A ∩ B = A.", "choices": ["True", "False"], "correctIndex": 0, "explanation": "If every element of A is also in B, then their intersection is exactly A.", "source": "Examlet 04" },
    { "question": "Which of the following is an element of {1, {1, 2}}?", "choices": ["2", "{1}", "{1, 2}", "{{1}}"], "correctIndex": 2, "explanation": "The set has two elements: the integer 1, and the set {1, 2}.", "source": "Examlet 04" }
];

const unit4_frqs = [
    { "instruction": "Prove the following claim about sets.", "claim": "For any sets A, B, and C, A × (B ∩ C) ⊆ (A × B) ∩ (A × C).", "solution": "Proof: Let (x,y) be an arbitrary element of A × (B ∩ C). By definition of Cartesian product, x ∈ A and y ∈ B ∩ C. By definition of intersection, y ∈ B and y ∈ C. Since x ∈ A and y ∈ B, (x,y) ∈ A × B. Since x ∈ A and y ∈ C, (x,y) ∈ A × C. Thus, (x,y) ∈ (A × B) ∩ (A × C). Since (x,y) was arbitrary, the subset relation holds. □", "source": "Examlet 04" }
];

const unit4_skills = ["Compute cardinality of power sets and Cartesian products", "Understand elements vs subsets", "Write set subset proofs"];

fs.writeFileSync(path.join(dataDir, 'unit3_mcqs.json'), JSON.stringify(unit3_mcqs, null, 2));
fs.writeFileSync(path.join(dataDir, 'unit3_frqs.json'), JSON.stringify(unit3_frqs, null, 2));
fs.writeFileSync(path.join(dataDir, 'unit3_skills.json'), JSON.stringify(unit3_skills, null, 2));

fs.writeFileSync(path.join(dataDir, 'unit4_mcqs.json'), JSON.stringify(unit4_mcqs, null, 2));
fs.writeFileSync(path.join(dataDir, 'unit4_frqs.json'), JSON.stringify(unit4_frqs, null, 2));
fs.writeFileSync(path.join(dataDir, 'unit4_skills.json'), JSON.stringify(unit4_skills, null, 2));

console.log('Generated units 3 and 4');
