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
    let formattedExpression = '';

    nums.forEach((num, index) => {
        if (index > 0) {
            let op = ops[Math.floor(Math.random() * ops.length)];
            expression += ` ${op} ${num}`;
            if (op === '/') {
                // Ensure division results in an integer
                num = num * getRandomNumber();
                formattedExpression += ` ÷ ${num}`;
            } else {
                formattedExpression += ` ${op.replace('*', '×').replace('/', '÷')} ${num}`;
            }
        } else {
            expression += num;
            formattedExpression += num;
        }
    });

    // Optional: Randomly add parentheses for complexity
    if (Math.random() > 0.5) {
        expression = `(${expression})`;
    }

    return { expression, formattedExpression };
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1; // Numbers from 1 to 9
