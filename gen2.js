const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

const unit5_mcqs = [
    { "question": "A relation R on set A is reflexive if:", "choices": ["∀x,y ∈ A, xRy → yRx", "∀x ∈ A, xRx", "∀x,y,z, xRy ∧ yRz → xRz", "xRy ∧ yRx → x=y"], "correctIndex": 1, "explanation": "Reflexive means every element relates to itself.", "source": "Examlet 05" },
    { "question": "If a relation is an equivalence relation, it must be:", "choices": ["Reflexive, antisymmetric, transitive", "Reflexive, symmetric, transitive", "Irreflexive, symmetric, transitive", "Reflexive, symmetric, not transitive"], "correctIndex": 1, "explanation": "Equivalence relations divide sets into equivalence classes and are RST.", "source": "Examlet 05" },
    { "question": "A partial order must be:", "choices": ["Reflexive, symmetric, transitive", "Reflexive, antisymmetric, transitive", "Irreflexive, symmetric, transitive", "None of these"], "correctIndex": 1, "explanation": "A partial order is Reflexive, Antisymmetric, and Transitive (RAT).", "source": "Examlet 05" },
    { "question": "If R is transitive, then xRy and yRz implies xRz.", "choices": ["True", "False"], "correctIndex": 0, "explanation": "This is the exact definition of transitivity.", "source": "Examlet 05" }
];

const unit5_frqs = [
    { "instruction": "Prove the following claim.", "claim": "Define relation R on Z such that aRb if 5 | (a-b). Prove R is an equivalence relation.", "solution": "Proof: \n1. Reflexive: For any a in Z, a-a = 0. Since 5 | 0, aRa. R is reflexive.\n2. Symmetric: Assume aRb, so 5 | (a-b). Then a-b = 5k for integer k. Thus b-a = 5(-k), and -k is an integer, so 5 | (b-a). Thus bRa. R is symmetric.\n3. Transitive: Assume aRb and bRc. So a-b = 5k and b-c = 5j. Adding gives (a-b)+(b-c) = a-c = 5k+5j = 5(k+j). Since k+j is an integer, 5 | (a-c). Thus aRc. R is transitive. □", "source": "Examlet 05" }
];

const unit5_skills = ["Identify reflexive, symmetric, antisymmetric, and transitive properties", "Prove a relation is an equivalence relation", "Prove a relation is a partial order"];

const unit6_mcqs = [
    { "question": "A function f: A → B is one-to-one (injective) if:", "choices": ["∀x,y ∈ A, f(x) = f(y) → x = y", "∀y ∈ B, ∃x ∈ A, f(x) = y", "∀x ∈ A, ∃y ∈ B, f(x) = y", "f(x) = x"], "correctIndex": 0, "explanation": "Injective means no two distinct domain elements map to the same co-domain element.", "source": "Examlet 06" },
    { "question": "A function f: A → B is onto (surjective) if the image of f equals B.", "choices": ["True", "False"], "correctIndex": 0, "explanation": "Onto means every element in the co-domain is mapped to by at least one element in the domain.", "source": "Examlet 06" },
    { "question": "If f: A → B and g: B → C are both one-to-one, what about g ∘ f?", "choices": ["It must be one-to-one", "It must be onto", "It must be bijective", "None of the above"], "correctIndex": 0, "explanation": "The composition of two injective functions is injective.", "source": "Examlet 06" }
];

const unit6_frqs = [
    { "instruction": "Prove the function is one-to-one.", "claim": "Let f: R → R be defined by f(x) = 3x - 5. Prove that f is one-to-one.", "solution": "Proof: Let x, y be real numbers. Assume f(x) = f(y). Then 3x - 5 = 3y - 5. Adding 5 to both sides gives 3x = 3y. Dividing by 3 gives x = y. Since f(x) = f(y) implies x = y, f is one-to-one. □", "source": "Examlet 06" }
];

const unit6_skills = ["Prove a function is one-to-one (injective)", "Prove a function is onto (surjective)", "Analyze function composition"];

fs.writeFileSync(path.join(dataDir, 'unit5_mcqs.json'), JSON.stringify(unit5_mcqs, null, 2));
fs.writeFileSync(path.join(dataDir, 'unit5_frqs.json'), JSON.stringify(unit5_frqs, null, 2));
fs.writeFileSync(path.join(dataDir, 'unit5_skills.json'), JSON.stringify(unit5_skills, null, 2));

fs.writeFileSync(path.join(dataDir, 'unit6_mcqs.json'), JSON.stringify(unit6_mcqs, null, 2));
fs.writeFileSync(path.join(dataDir, 'unit6_frqs.json'), JSON.stringify(unit6_frqs, null, 2));
fs.writeFileSync(path.join(dataDir, 'unit6_skills.json'), JSON.stringify(unit6_skills, null, 2));

console.log('Generated units 5 and 6');
