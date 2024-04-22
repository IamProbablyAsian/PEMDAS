document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', submitAnswer);
    document.getElementById('next').addEventListener('click', generateQuestion);
    generateQuestion(); // Call this function as soon as the DOM is fully loaded
});

let score = 0; // Initialize score
let timer; // Timer for game duration
let gameDuration = 600; // Game duration in seconds (10 minutes)
let timerStarted = false; // Flag to check if the timer has started

function startTimer(duration) {
    if (!timerStarted) {
        timerStarted = true;
        timer = duration;
        let minutes, seconds;
        let timerInterval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            document.getElementById('timer').textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }
}

function endGame() {
    document.getElementById('feedback').textContent = 'Time is up! Your final score is ' + score + '.';
    document.getElementById('answer').disabled = true;
    document.getElementById('submit').disabled = true;
    document.getElementById('next').style.display = 'none';
}

function generateExpression() {
    const ops = ['+', '-', '*', '/'];
    const nums = [1, 2, 3].map(() => Math.floor(Math.random() * 10) + 1);
    const chosenOps = [0, 1].map(() => ops[Math.floor(Math.random() * ops.length)]);
    let expression = `${nums[0]} ${chosenOps[0]} ${nums[1]} ${chosenOps[1]} ${nums[2]}`;
    return expression;
}

function displayExpression(expression) {
    const displayExpr = expression.replace(/\*/g, '×').replace(/\//g, '÷');
    document.getElementById('question').innerText = 'Solve the expression: ' + displayExpr;
    window.currentExpression = expression; // Store the calculation version for evaluation
}

function generateQuestion() {
    const newExpression = generateExpression();
    displayExpression(newExpression);
    document.getElementById('answer').value = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('next').style.display = 'none';
}

function submitAnswer() {
    if (!timerStarted) {
        startTimer(gameDuration);
    }

    const userAnswer = parseFloat(document.getElementById('answer').value);
    const preparedExpression = window.currentExpression.replace('÷', '/').replace('×', '*');
    const correctAnswer = eval(preparedExpression).toFixed(2);

    if (Math.abs(userAnswer - correctAnswer) < 0.01) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
    }
    
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('next').style.display = 'block'; // Make sure this is visible after submitting
}

