document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', submitAnswer);
    document.getElementById('next').addEventListener('click', generateQuestion);
    document.getElementById('timer').textContent = "07:00"; // Set initial timer display
    generateQuestion(); // Initialize the first question
});

let score = 0;
let timer;
let gameDuration = 420; // 7 minutes
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
    const ops = ['+', '-', '*', '/'];
    let nums = [getRandomNumber()];
    let expression = nums[0].toString();

    for (let i = 0; i < 3; i++) {
        const op = ops[Math.floor(Math.random() * ops.length)];
        let nextNum = getRandomNumber();

        if (op === '/') {
            nextNum = nums[i] * (Math.floor(Math.random() * 3) + 1); // ensure divisibility
        }

        nums.push(nextNum);
        expression += ` ${op} ${nextNum}`;
    }

    return expression;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1; // numbers from 1 to 9
}

function displayExpression(expression) {
    document.getElementById('question').innerText = 'Solve the expression: ' + expression.replace('*', '×').replace('/', '÷');
    window.currentExpression = expression; // store the original expression for evaluation
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
    const userAnswer = parseInt(document.getElementById('answer').value, 10);
    const correctAnswer = eval(window.currentExpression.replace('×', '*').replace('÷', '/'));

    if (userAnswer === correctAnswer) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}. Here's how you solve it: ${generateExplanation(window.currentExpression)}`;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('next').style.display = 'block';
}

function generateExplanation(expression) {
    // Simplified dummy explanation generator (replace this with actual logic to generate step-by-step explanations)
    return `Evaluate the expression carefully following PEMDAS/BODMAS rules.`;
}
