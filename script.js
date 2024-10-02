// script.js

let appleCount = 0;
let clickPower = 1;
let goldCount = 0;
let loanActive = false;
let loanAmount = 0;
let loanInterest = 0;
let loanCyclesLeft = 0;

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

// Function to update apple and currency count display
function updateCounts() {
  document.getElementById("apple-count").textContent = `Яблоки: ${appleCount}`;
  document.getElementById("currency-count").textContent = `Золото: ${goldCount}`;
}

// Add event listeners for loan buttons
document.getElementById("take-loan-button").addEventListener("click", () => {
    takeLoan(500, 10, 10); // Example: Take 500 gold, 10% interest, repay in 10 cycles
});

document.getElementById("repay-loan-button").addEventListener("click", () => {
    repayLoan(); // Trigger the repayLoan function
});

// Additional script code for game logic, upgrades, quests, etc., continues...

