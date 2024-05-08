document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', submitAnswer);
    document.getElementById('next').addEventListener('click', generateQuestion);
    document.getElementById('explain').addEventListener('click', showExplanation);
    document.getElementById('timer').textContent = "07:00";
    generateQuestion();
});

let score = 0;
let timer;
let gameDuration = 420; // 7 minutes
let timerStarted = false;
let lastExplanation = '';

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
    document.getElementById('next').style.display = 'none';
    document.getElementById('explain').style.display = 'none';
}

function generateExpression() {
    const ops = ['+', '-', '*', '/'];
    let nums = [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()];
    let expression = nums[0].toString();

    for (let i = 1; i < nums.length; i++) {
        const op = ops[Math.floor(Math.random() * ops.length)];
        expression += ` ${op} ${nums[i]}`;
    }

    return addRandomParentheses(expression);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1; // Numbers from 1 to 9
}

function addRandomParentheses(expr) {
    const parts = expr.split(' ');
    if (Math.random() > 0.5 && parts.length > 5) {
        let index = Math.floor(Math.random() * (parts.length - 4) / 2) * 2 + 1;
        parts.splice(index, 0, '(');
        parts.splice(index + 4, 0, ')');
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
    document.getElementById('explain').style.display = 'none';
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
        document.getElementById('explain').style.display = 'none';
    } else {
        lastExplanation = generateExplanation(window.currentExpression.replace('×', '*').replace('÷', '/'));
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
        document.getElementById('explain').style.display = 'block';
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('next').style.display = 'block';
}

function showExplanation() {
    document.getElementById('feedback').innerText += ` Here's how to solve it: ${lastExplanation}`;
    document.getElementById('explain').style.display = 'none'; // Hide after showing
}

function generateExplanation(expression) {
    // Simplified explanation for illustration
    return `Evaluate the expression step-by-step following PEMDAS/BODMAS rules, considering any parentheses to determine the order of operations.`;
}
