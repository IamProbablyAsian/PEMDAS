document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', submitAnswer);
    document.getElementById('next').addEventListener('click', generateQuestion);
    generateQuestion(); // Ensure the first question is generated immediately
});

let score = 0;
let timer;
let gameDuration = 420; // 7 minutes
let timerStarted = false;

function startTimer(duration) {
    if (!timerStarted) {
        timerStarted = true;
        timer = duration;
        let timerInterval = setInterval(function() {
            let minutes = parseInt(timer / 60, 10);
            let seconds = parseInt(timer % 60, 10);
            document.getElementById('timer').textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
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
    document.getElementById('next').disabled = true;
}

function generateExpression() {
    const ops = ['+', '-', '*', '/'];
    let nums = [getRandomNumber(), getRandomNumber(), getRandomNumber()];
    let expression = '';
    let applyParentheses = Math.random() > 0.5; // Randomly decide if parentheses should be applied

    if (applyParentheses) {
        // Apply parentheses around the first or second pair of operations
        let midIndex = 1;
        expression = `(${nums[0]} ${ops[Math.floor(Math.random() * ops.length)]} ${nums[1]}) ${ops[Math.floor(Math.random() * ops.length)]} ${nums[2]}`;
    } else {
        // Standard expression without parentheses
        expression = nums.reduce((acc, num, index) => {
            if (index === 0) return num.toString();
            return `${acc} ${ops[Math.floor(Math.random() * ops.length)]} ${num}`;
        }, '');
    }

    return expression;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1; // Numbers from 1 to 9
}

function displayExpression(expression) {
    document.getElementById('question').innerText = 'Solve the expression: ' + expression.replace('*', '×').replace('/', '÷');
    window.currentExpression = expression;
}

function generateQuestion() {
    const expression = generateExpression();
    displayExpression(expression);
    document.getElementById('answer').value = '';
    document.getElementById('feedback').innerText = '';
}

function submitAnswer() {
    if (!timerStarted) {
        startTimer(gameDuration);
    }
    const userAnswer = parseInt(document.getElementById('answer').value, 10);
    const correctAnswer = eval(window.currentExpression.replace('×', '*').replace('÷', '/'));

    if (userAnswer === correctAnswer) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
}
