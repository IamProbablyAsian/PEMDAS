document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', submitAnswer);
    document.getElementById('next').addEventListener('click', generateQuestion);
    generateQuestion(); // Initialize the first question
});

let score = 0; // Initialize score
let timer; // Timer for game duration
let gameDuration = 420; // Game duration in seconds (7 minutes)
let timerStarted = false; // Flag to check if the timer has started

function startTimer(duration) {
    if (!timerStarted) {
        timerStarted = true;
        timer = duration;
        let minutes, seconds;
        let timerInterval = setInterval(function() {
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
    const nums = [];
    const chosenOps = [];

    // Generate numbers and operators
    for (let i = 0; i < 3; i++) {
        nums.push(Math.floor(Math.random() * 9) + 1); // Numbers from 1 to 9
        chosenOps.push(ops[Math.floor(Math.random() * ops.length)]);
    }

    // Adjust for integer division
    for (let i = 0; i < chosenOps.length; i++) {
        if (chosenOps[i] === '/') {
            const dividend = nums[i];
            const possibleDivisors = [];
            for (let j = 1; j <= dividend; j++) {
                if (dividend % j === 0) {
                    possibleDivisors.push(j);
                }
            }
            nums[i + 1] = possibleDivisors[Math.floor(Math.random() * possibleDivisors.length)];
        }
    }

    // Build the expression string
    let expression = `${nums[0]} ${chosenOps[0]} ${nums[1]} ${chosenOps[1]} ${nums[2]}`;
    return expression.replace('*', '×').replace('/', '÷'); // Use friendly symbols
}

function displayExpression(expression) {
    document.getElementById('question').innerText = 'Solve the expression: ' + expression;
    window.currentExpression = expression.replace('×', '*').replace('÷', '/');
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
    const correctAnswer = eval(window.currentExpression).toFixed(2);

    if (Math.abs(userAnswer - correctAnswer) < 0.01) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
    }

    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('next').style.display = 'block';
}
