
function calculateSum(a, b) {
    return a + b;
}

console.log("Exercițiul 1:");
console.log("5 + 3 =", calculateSum(5, 3));
console.log("10 + 25 =", calculateSum(10, 25));


var student = {
    name: "Ion",
    age: 16,
    grade: 9,

    introduce: function () {
        console.log("Sunt " + this.name + " și am " + this.age + " ani.");
    }
};

console.log("Exercițiul 2:");
student.introduce();
student.grade = 10;
console.log("Noua valoare grade:", student.grade);


var choices = ["piatra", "hartia", "foarfeca"];

var gameScore = {
    player: 0,
    computer: 0,
    draws: 0,


    displayScore: function () {
        alert("Scor:\nTu: " + this.player +
              "\nCalculator: " + this.computer +
              "\nEgalități: " + this.draws);
    },

    reset: function () {
        this.player = 0;
        this.computer = 0;
        this.draws = 0;
    }
};


function getComputerChoice() {
    var index = Math.floor(Math.random() * 3);
    return choices[index];
}


function getWinner(user, computer) {
    if (user === computer) {
        gameScore.draws++;
        return "Egalitate!";
    }

    if ((user === "piatra" && computer === "foarfeca") ||
        (user === "foarfeca" && computer === "hartia") ||
        (user === "hartia" && computer === "piatra")) {
        gameScore.player++;
        return "Ai câștigat!";
    }

    gameScore.computer++;
    return "Calculatorul a câștigat!";
}


function updatePage(user, computer, result) {
    var total = gameScore.player + gameScore.computer + gameScore.draws;

    document.getElementById("alegereUtilizator").textContent = user;
    document.getElementById("alegereCalculator").textContent = computer;
    document.getElementById("rezultat").textContent = result;
    document.getElementById("scorUtilizator").textContent = gameScore.player;
    document.getElementById("scorCalculator").textContent = gameScore.computer;
    document.getElementById("scorEgalitati").textContent = gameScore.draws;
    document.getElementById("totalRunde").textContent = total;

    var mesaj = "";
    if (gameScore.player > gameScore.computer) {
        mesaj = "Tu conduci!";
    } else if (gameScore.computer > gameScore.player) {
        mesaj = "Calculatorul conduce!";
    } else {
        mesaj = "Scor egal!";
    }
    document.getElementById("mesajConducere").textContent = mesaj;
}


function checkFinalWinner() {
    var final = document.getElementById("castigatorFinal");

    if (gameScore.player === 5 || gameScore.computer === 5) {
        if (gameScore.player === 5) {
            final.textContent = "Câștigător final: TU!";
        } else {
            final.textContent = "Câștigător final: CALCULATORUL!";
        }
        setButtons(true);
    }
}


function setButtons(disabled) {
    document.getElementById("btnPiatra").disabled = disabled;
    document.getElementById("btnHartia").disabled = disabled;
    document.getElementById("btnFoarfeca").disabled = disabled;
}

function playRound(userChoice) {
    var computerChoice = getComputerChoice();
    var result = getWinner(userChoice, computerChoice);

    gameScore.displayScore();               
    updatePage(userChoice, computerChoice, result);
    checkFinalWinner();
}

function newGame() {
    gameScore.reset();
    updatePage("-", "-", "Alege o variantă pentru a începe!");
    document.getElementById("mesajConducere").textContent = "";
    document.getElementById("castigatorFinal").textContent = "";
    setButtons(false);
}

document.getElementById("btnPiatra").addEventListener("click", function () {
    playRound("piatra");
});
document.getElementById("btnHartia").addEventListener("click", function () {
    playRound("hartia");
});
document.getElementById("btnFoarfeca").addEventListener("click", function () {
    playRound("foarfeca");
});
document.getElementById("btnJocNou").addEventListener("click", newGame);
