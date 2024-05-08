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
}

function generateExpression() {
    let nums = [getRandomNumber()];
    const ops = ['+', '-', '*', '/'];
    let expression = nums[0].toString();

    for (let i = 0; i < 3; i++) {
        const op = ops[Math.floor(Math.random() * ops.length)];
        let nextNum = getRandomNumber();
        if (op === '/') {
            nextNum = nums[i] * (Math.floor(Math.random() * 3) + 1); // Ensure divisibility
        }
        nums.push(nextNum);
        expression += ` ${op} ${nextNum}`;
    }

    return expression;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1; // Numbers from 1 to 9
}

function displayExpression(expression) {
    document.getElementById('question').innerText = 'Solve the expression: ' + expression.replace('*', '×').replace('/', '÷');
    window.currentExpression = expression; // Store the original expression for evaluation
}

function generateQuestion() {
    const expression = generateExpression();
    displayExpression(expression);
    document.getElementById('answer').value = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('next').style.display = 'none';
}

function submitAnswer() {
    console.log("Submit button clicked."); // Debugging statement
    if (!timerStarted) {
        startTimer(gameDuration);
    }
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const correctAnswer = eval(window.currentExpression.replace('×', '*').replace('÷', '/'));

    console.log(`User Answer: ${userAnswer}, Correct Answer: ${correctAnswer}`); // Debugging statement

    if (Math.abs(userAnswer - correctAnswer) < 0.01) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('next').style.display = 'block';
}
