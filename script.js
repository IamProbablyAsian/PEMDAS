document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', submitAnswer);
    document.getElementById('next').addEventListener('click', generateQuestion);
    generateQuestion(); // Ensures the first question is displayed on page load
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
    const ops = ['+', '-', '*', '/']; // Operations array
    let nums = [getRandomNumber(), getRandomNumber(), getRandomNumber()]; // Array of numbers
    let expression = nums[0].toString();

    for (let i = 1; i < nums.length; i++) {
        let op = ops[Math.floor(Math.random() * ops.length)];
        if (op === '/') {
            nums[i] = expression.endsWith(')') ? eval(expression) * getRandomNumber() : nums[i - 1] * getRandomNumber();
            expression = `(${expression} ÷ ${nums[i]})`;
        } else {
            expression += ` ${op.replace('*', '×')} ${nums[i]}`;
        }
    }

    return expression;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1; // Random number from 1 to 9
}

function displayExpression(expression) {
    document.getElementById('question').innerText = 'Solve the expression: ' + expression;
    window.currentExpression = expression.replace('×', '*').replace('÷', '/');
}

function generateQuestion() {
    const expression = generateExpression();
    displayExpression(expression); // Display with correct math symbols
    document.getElementById('answer').value = '';
    document.getElementById('feedback').innerText = '';
}

function submitAnswer() {
    if (!timerStarted) {
        startTimer(gameDuration);
    }
    const userAnswer = parseInt(document.getElementById('answer').value, 10);
    const correctAnswer = eval(window.currentExpression);

    if (userAnswer === correctAnswer) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
}
