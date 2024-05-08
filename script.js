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
    let expressionParts = [];
    let formattedExpression = '';

    nums.forEach((num, index) => {
        if (index === 0) {
            expressionParts.push(num);
        } else {
            let op = ops[Math.floor(Math.random() * ops.length)];
            if (op === '/') {
                // Adjust for integer division
                num = expressionParts[expressionParts.length - 1] * getRandomNumber();
            }
            expressionParts.push(op);
            expressionParts.push(num);
        }
    });

    // Add parentheses for the first two operations to emphasize PEMDAS
    formattedExpression = `(${expressionParts[0]} ${expressionParts[1]} ${expressionParts[2]}) ${expressionParts[3]} ${expressionParts[4]}`;

    return {
        expression: expressionParts.join(' '), // For evaluation
        formattedExpression: formattedExpression.replace('*', '×').replace('/', '÷') // For display
    };
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1; // Numbers from 1 to 9
}

function displayExpression(formattedExpression) {
    document.getElementById('question').innerText = 'Solve the expression: ' + formattedExpression;
    window.currentExpression = formattedExpression.replace('×', '*').replace('÷', '/');
}

function generateQuestion() {
    const { expression, formattedExpression } = generateExpression();
    displayExpression(formattedExpression);
    window.currentExpression = expression; // Ensure this matches eval() logic
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
