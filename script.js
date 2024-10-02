// script.js

let appleCount = 0;
let clickPower = 1;
let autoCollectorInterval = null;
let currentQuest = null;
let goldCount = 0;

const startScreen = document.getElementById("start-screen");
const startGameButton = document.getElementById("start-game-button");
const exitGameButton = document.getElementById("exit-game-button");
const gameContainer = document.getElementById("game-container");
const clickButton = document.getElementById("click-button");
const appleCountDisplay = document.getElementById("apple-count");
const currencyCountDisplay = document.getElementById("currency-count");

// Navigation buttons
const openUpgradesButton = document.getElementById("open-upgrades-button");
const openQuestsButton = document.getElementById("open-quests-button");
const openCraftingButton = document.getElementById("open-crafting-button");
const openMinigameButton = document.getElementById("open-minigame-button");

// Windows
const upgradesWindow = document.getElementById("upgrades-window");
const questsWindow = document.getElementById("quests-window");
const craftingWindow = document.getElementById("crafting-window");
const minigameWindow = document.getElementById("minigame-window");
const closeWindowButtons = document.querySelectorAll(".close-window");

// Load game state from local storage if available
window.onload = () => {
  const savedState = localStorage.getItem('appleKingdomClickerState');
  if (savedState) {
    const state = JSON.parse(savedState);
    appleCount = state.appleCount;
    clickPower = state.clickPower;
    goldCount = state.goldCount;
    updateCounts();
    alert("Добро пожаловать обратно в Кликер Королевства Яблок!");
  }
};

// Event listener to start the game
startGameButton.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
});

// Event listener to exit the game
exitGameButton.addEventListener("click", () => {
  alert("Спасибо за игру! До встречи в Кликере Королевства Яблок!");
  saveGameState();
  window.close(); // This will only work in certain browsers and configurations.
});

// Function to update apple and currency count display
function updateCounts() {
  appleCountDisplay.textContent = `Яблоки: ${appleCount}`;
  currencyCountDisplay.textContent = `Золото: ${goldCount}`;
}

// Function to save game state
function saveGameState() {
  const state = {
    appleCount: appleCount,
    clickPower: clickPower,
    goldCount: goldCount
  };
  localStorage.setItem('appleKingdomClickerState', JSON.stringify(state));
}

// Click button logic
clickButton.addEventListener("click", () => {
  appleCount += clickPower;
  updateCounts();
  checkAchievements();
  saveGameState();
});

// Navigation logic for opening windows
openUpgradesButton.addEventListener("click", () => {
  upgradesWindow.classList.remove("hidden");
});

openQuestsButton.addEventListener("click", () => {
  questsWindow.classList.remove("hidden");
});

openCraftingButton.addEventListener("click", () => {
  craftingWindow.classList.remove("hidden");
});

openMinigameButton.addEventListener("click", () => {
  minigameWindow.classList.remove("hidden");
});

// Logic for closing windows
closeWindowButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    event.target.parentElement.classList.add("hidden");
  });
});

// Example Upgrade Logic (Adding functionality for some buttons)
const clickUpgradeButton = document.getElementById("click-upgrade");
clickUpgradeButton.addEventListener("click", () => {
  if (appleCount >= 50) {
    appleCount -= 50;
    clickPower += 1;
    updateCounts();
    alert("Сила клика увеличена!");
    saveGameState();
  } else {
    alert("Недостаточно яблок для улучшения!");
  }
});

// Additional placeholder upgrade logic can be added similarly

// Function to take a loan
function takeLoan(amount, interestRate, cycles) {
    if (loanActive) {
        alert("У вас уже есть активный кредит!");
        return;
    }

    loanActive = true;
    loanAmount = amount;
    loanInterest = interestRate;
    loanCyclesLeft = cycles;

    goldCount += amount; // Provide gold to player immediately
    updateCounts();

    alert(`Вы взяли кредит на ${amount} золота. Вернуть нужно будет через ${cycles} циклов с ${interestRate}% процентов!`);
}

// Function to repay the loan
function repayLoan() {
    if (!loanActive) {
        alert("У вас нет активного кредита.");
        return;
    }

    const totalRepayment = Math.ceil(loanAmount * (1 + loanInterest / 100));
    
    if (goldCount >= totalRepayment) {
        goldCount -= totalRepayment;
        updateCounts();
        alert(`Кредит погашен! Вы вернули ${totalRepayment} золота.`);
        
        // Reset loan variables
        loanActive = false;
        loanAmount = 0;
        loanInterest = 0;
        loanCyclesLeft = 0;
    } else {
        alert("Недостаточно золота для погашения кредита!");
    }
}

// Add event listeners for loan buttons
const takeLoanButton = document.getElementById("take-loan-button");
if (takeLoanButton) {
    takeLoanButton.addEventListener("click", () => {
        takeLoan(500, 10, 10); // Example: Take 500 gold, 10% interest, repay in 10 cycles
    });
}

const repayLoanButton = document.getElementById("repay-loan-button");
if (repayLoanButton) {
    repayLoanButton.addEventListener("click", () => {
        repayLoan(); // Trigger the repayLoan function
    });
}
