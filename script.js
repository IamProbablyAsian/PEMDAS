document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', submitAnswer);
    document.getElementById('next').addEventListener('click', generateQuestion);
    document.getElementById('timer').textContent = "07:00";
    generateQuestion();
});

let score = 0;
let timer;
let gameDuration = 420; // Game duration in seconds (7 minutes)
let timerStarted = false;

function startTimer(duration) {
    if (!timerStarted) {
        timerStarted = true;
        timer = duration;
        let timerInterval = setInterval(function() {
            let minutes = parseInt(timer / 60, 10);
            let seconds = parseInt(timer % 60, 10);
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
    let nums = [getRandomNumber(), getRandomNumber(), getRandomNumber()];
    let expression = `(${nums[0]} ${ops[Math.floor(Math.random() * ops.length)]} ${nums[1]}) ${ops[Math.floor(Math.random() * ops.length)]} ${nums[2]}`;
    return expression;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1; // Random number from 1 to 10
}

function displayExpression(expression) {
    const displayExpression = expression.replace(/\*/g, '×').replace(/\//g, '÷');
    document.getElementById('question').innerText = 'Solve the expression: ' + displayExpression;
    window.currentExpression = expression;
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

    const userAnswer = parseInt(document.getElementById('answer').value, 10);
    const correctAnswer = Math.floor(eval(window.currentExpression.replace('×', '*').replace('÷', '/')));

    if (userAnswer === correctAnswer) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
    }

    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('next').style.display = 'block';
}
