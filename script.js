document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', submitAnswer);
    document.getElementById('next').addEventListener('click', generateQuestion);
    document.getElementById('timer').textContent = "07:00";
    generateQuestion();
});

let score = 0;
let timer;
let gameDuration = 420;
let timerStarted = false;

function startTimer(duration) {
    if (!timerStarted) {
        timerStarted = true;
        timer = duration;
        let minutes, seconds;
        let timerInterval = setInterval(function() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
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
    document.getElementById('next').style.display = 'none';
}

function generateExpression() {
    const nums = new Array(4).fill(0).map(() => Math.floor(Math.random() * 9) + 1);
    const ops = ['+', '-', '*', '/'];
    let expression = nums[0].toString();
    for (let i = 1; i < nums.length; i++) {
        const op = ops[Math.floor(Math.random() * ops.length)];
        expression += ` ${op} ${nums[i]}`;
    }
    expression = addParentheses(expression); // Add parentheses randomly
    return expression;
}

function addParentheses(expr) {
    const parts = expr.split(' ');
    if (Math.random() > 0.5) { // Randomly decide whether to add parentheses
        let index = Math.floor(Math.random() * (parts.length - 2) / 2) * 2 + 1;
        parts.splice(index, 4, `(${parts[index]} ${parts[index + 1]} ${parts[index + 2]})`);
    }
    return parts.join(' ');
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
    document.getElementById('next').style.display = 'none';
}

function submitAnswer() {
    if (!timerStarted) {
        startTimer(gameDuration);
    }
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const correctAnswer = eval(window.currentExpression.replace('×', '*').replace('÷', '/'));
    if (Math.abs(userAnswer - correctAnswer) < 0.01) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}. Here's how you solve it:`;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('next').style.display = 'block';
}
