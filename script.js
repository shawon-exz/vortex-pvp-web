// ===== টায়ার টেস্ট =====
const questions = [
    {
        q: "তোমার PvP স্টাইল কোনটা?",
        options: [
            { text: "⚔️ স্ট্রেইট ফাইট — সরাসরি ঝাপিয়ে পড়ি", tier: 3 },
            { text: "🛡️ ডিফেন্সিভ — অপেক্ষা করে কাউন্টার করি", tier: 2 },
            { text: "🏃 স্পিড রানার — এদিক-ওদিক ঘুরে আক্রমণ", tier: 4 },
            { text: "❓ এখনো শিখছি", tier: 1 }
        ]
    },
    {
        q: "কতক্ষণ ধরে Minecraft খেলছো?",
        options: [
            { text: "এক সপ্তাহও হয়নি", tier: 1 },
            { text: "কিছু মাস ধরে", tier: 2 },
            { text: "১ বছরের বেশি", tier: 3 },
            { text: "৩+ বছর — আমি ভেটেরান!", tier: 4 }
        ]
    },
    {
        q: "বেডওয়ার্সে তোমার ফেভারিট গেমপ্লে?",
        options: [
            { text: "ডিফেন্স — বেড রক্ষা করি", tier: 2 },
            { text: "রাশার — সাথে সাথে আক্রমণ", tier: 3 },
            { text: "সব পজিশনেই পারদর্শী", tier: 4 },
            { text: "বেডওয়ার্স কী? 😅", tier: 1 }
        ]
    }
];

const tierNames = {
    1: { name: "🪵 Wood Tier", desc: "শুরুটা সবাই করে! কিছু প্র্যাকটিস করলেই উন্নতি হবে। ভয় পেও না — সবাই একদিন কাঠের টায়ার ছিল!" },
    2: { name: "⚙️ Iron Tier", desc: "ভালো খেলো! এখন একটু বেশি রাশ ও স্ট্র্যাটেজি শিখলে Gold-এ যাবে।" },
    3: { name: "🪙 Gold Tier", desc: "চমৎকার! তুমি শক্তিশালী খেলোয়াড়। ডায়মন্ডের খুব কাছাকাছি তুমি!" },
    4: { name: "💎 Diamond Tier", desc: "অসাধারণ! তুমি সত্যিকারের প্রো। সার্ভারের সেরা খেলোয়াড়দের একজন তুমি!" }
};

let currentQ = 0;
let totalTier = 0;

const quizBar = document.getElementById("quizBar");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizResult = document.getElementById("quizResult");

function renderQuestion() {
    const q = questions[currentQ];
    quizQuestion.textContent = q.q;
    quizOptions.innerHTML = "";
    quizBar.style.width = ((currentQ / questions.length) * 100) + "%";

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.textContent = opt.text;
        btn.onclick = () => {
            totalTier += opt.tier;
            currentQ++;
            if (currentQ < questions.length) {
                renderQuestion();
            } else {
                showResult();
            }
        };
        quizOptions.appendChild(btn);
    });
}

function showResult() {
    quizBar.style.width = "100%";
    quizOptions.innerHTML = "";
    quizQuestion.style.display = "none";
    quizResult.classList.remove("hidden");

    const avg = Math.round(totalTier / questions.length);
    const t = tierNames[avg];

    document.getElementById("resultTitle").textContent = t.name;
    document.getElementById("resultText").textContent = t.desc;

    // জয়ন্তী অ্যানিমেশন ইফেক্ট
    document.getElementById("resultTitle").style.animation = "popIn 0.5s ease";
}

function restartQuiz() {
    currentQ = 0;
    totalTier = 0;
    quizQuestion.style.display = "block";
    quizResult.classList.add("hidden");
    renderQuestion();
}

// পেজ লোড হলে শুরু
renderQuestion();
