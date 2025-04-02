// ==========================
// ThinkFlip Flashcard Logic
// ==========================

// Data Storage
let flashcards = [];             // Array to hold all flashcards
let currentCardIndex = 0;        // Current index being displayed
let lastDeletedCard = null;      // Temporarily holds last deleted card for undo
let lastDeletedIndex = null;     // Holds index of deleted card for restoring

// Element References
const questionInput = document.getElementById("question-input");
const answerInput = document.getElementById("answer-input");
const addButton = document.getElementById("add-card-btn");

const flashcard = document.getElementById("flashcard");
const front = flashcard.querySelector(".front");
const back = flashcard.querySelector(".back");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const flipBtn = document.getElementById("flip-btn");

const editBtn = document.getElementById("edit-btn");
const deleteBtn = document.getElementById("delete-btn");
const undoBtn = document.getElementById("undo-btn");

const editModal = document.getElementById("edit-modal");
const modalEditQ = document.getElementById("modal-edit-question");
const modalEditA = document.getElementById("modal-edit-answer");
const modalSaveBtn = document.getElementById("modal-save-btn");
const modalCancelBtn = document.getElementById("modal-cancel-btn");

// Display a flashcard by index
function showCard(index) {
  if (flashcards.length === 0) {
    front.textContent = "No flashcards yet!";
    back.textContent = "Add some to get started!";
    return;
  }

  const card = flashcards[index];
  front.textContent = card.question;
  back.textContent = card.answer;
  flashcard.classList.remove("flipped");
}

// Add new flashcard
addButton.addEventListener("click", () => {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if (!question || !answer) {
    alert("Please fill in both the question and answer!");
    return;
  }

  flashcards.push({ question, answer });
  questionInput.value = "";
  answerInput.value = "";
  currentCardIndex = flashcards.length - 1;
  showCard(currentCardIndex);
});

// Navigation Buttons
nextBtn.addEventListener("click", () => {
  if (flashcards.length === 0) return;
  currentCardIndex = (currentCardIndex + 1) % flashcards.length;
  showCard(currentCardIndex);
});

prevBtn.addEventListener("click", () => {
  if (flashcards.length === 0) return;
  currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
  showCard(currentCardIndex);
});

// Flip Flashcard
flipBtn.addEventListener("click", () => {
  flashcard.classList.toggle("flipped");
});
flashcard.addEventListener("click", () => {
  flashcard.classList.toggle("flipped");
});

// Delete Flashcard
deleteBtn.addEventListener("click", () => {
  if (flashcards.length === 0) return;

  lastDeletedCard = flashcards[currentCardIndex];
  lastDeletedIndex = currentCardIndex;

  flashcards.splice(currentCardIndex, 1);
  currentCardIndex = Math.max(currentCardIndex - 1, 0);
  showCard(currentCardIndex);
});

// Undo Delete
undoBtn.addEventListener("click", () => {
  if (lastDeletedCard && lastDeletedIndex !== null) {
    flashcards.splice(lastDeletedIndex, 0, lastDeletedCard);
    currentCardIndex = lastDeletedIndex;
    showCard(currentCardIndex);
    lastDeletedCard = null;
    lastDeletedIndex = null;
  } else {
    alert("No flashcard to undo!");
  }
});

// Edit Flashcard (open modal)
editBtn.addEventListener("click", () => {
  if (flashcards.length === 0) return;

  const card = flashcards[currentCardIndex];
  modalEditQ.value = card.question;
  modalEditA.value = card.answer;
  editModal.style.display = "block";
});

// Save edited flashcard
modalSaveBtn.addEventListener("click", () => {
  const newQ = modalEditQ.value.trim();
  const newA = modalEditA.value.trim();

  if (newQ && newA) {
    flashcards[currentCardIndex] = { question: newQ, answer: newA };
    showCard(currentCardIndex);
    editModal.style.display = "none";
  } else {
    alert("Please fill in both fields!");
  }
});

// Cancel edit modal
modalCancelBtn.addEventListener("click", () => {
  editModal.style.display = "none";
});

// Welcome Modal Dismissal
document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("welcome-modal").style.display = "none";
});

// =========================
// Fun Fact Rotator
// =========================
const studyFacts = [
  "💡 Study Tip: The Pomodoro Trick = productivity cheat code. Work 25 mins, chill for 5. Your brain loves the rhythm!",
  "🧠 Fun Fact: Your brain solves problems when you're not even thinking about them — like in the shower!",
  "💡 Study Tip: Vague goals = vague results. Give your brain a real mission, not just 'study later.'",
  "🧠 Fun Fact: Cramming blocks deep learning. Space things out and let your brain make real connections.",
  "💡 Study Tip: Teach someone else — even your cat. If you can explain it, you really know it.",
  "🧠 Fun Fact: Breaks boost brilliance. Walks, music, even naps can trigger breakthrough ideas.",
  "💡 Study Tip: Studying with a friend isn’t just cozy — it wires your brain for better learning.",
  "🧠 Fun Fact: Mixing learning sources gives your brain a 3D view. Try a book + video + convo combo!"
];

const factElement = document.getElementById("study-fact");
const wrapper = document.getElementById("study-fact-wrapper");

let currentFactIndex = 0;
setInterval(() => {
  wrapper.classList.add("fade-out");
  setTimeout(() => {
    currentFactIndex = (currentFactIndex + 1) % studyFacts.length;
    factElement.textContent = studyFacts[currentFactIndex];
    wrapper.classList.remove("fade-out");
  }, 2000);
}, 10000);

// Tooltip Toggle
document.getElementById("info-icon").addEventListener("click", () => {
  document.getElementById("info-icon").classList.toggle("clicked");
});

// =========================
// Flashcard History
// =========================
const historyToggle = document.getElementById("history-toggle");
const historyPanel = document.getElementById("history-panel");
const closeHistory = document.getElementById("close-history");
const historyList = document.getElementById("history-list");

// Show/Hide history panel
historyToggle.addEventListener("click", () => {
  historyPanel.classList.add("open");
  updateHistoryList();
});
closeHistory.addEventListener("click", () => {
  historyPanel.classList.remove("open");
});

// Render history list
function updateHistoryList() {
  historyList.innerHTML = "";
  flashcards.forEach((card, index) => {
    const item = document.createElement("li");
    item.textContent = `Q${index + 1}: ${card.question} → A: ${card.answer}`;
    historyList.appendChild(item);
  });
}

// Initial render
showCard(currentCardIndex);

  



