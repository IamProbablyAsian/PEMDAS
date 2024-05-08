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
    let expression = '';
    let nums = [Math.floor(Math.random() * 9) + 1];
    for (let i = 0; i < 3; i++) {
        const op = ops[Math.floor(Math.random() * ops.length)];
        let nextNum = Math.floor(Math.random() * 9) + 1;
        nums.push(nextNum);
        expression += ` ${op} ${nextNum}`;
    }
    window.currentStepByStep = generateStepByStep(nums, ops); // Store step-by-step explanation
    return `${nums[0]}${expression}`;
}

function displayExpression(expression) {
    const friendlyExpression = expression.replace(/\*/g, '×').replace(/\//g, '÷');
    document.getElementById('question').innerText = 'Solve the expression: ' + friendlyExpression;
    window.currentExpression = expression; // Store the original expression for evaluation
}

function generateStepByStep(nums, ops) {
    let steps = `Start with ${nums[0]}`;
    let result = nums[0];
    for (let i = 0; i < ops.length; i++) {
        let interimResult = eval(`${result} ${ops[i]} ${nums[i + 1]}`);
        steps += `. Then ${ops[i].replace('*', 'multiply').replace('/', 'divide')} by ${nums[i + 1]} to get ${interimResult}`;
        result = interimResult;
    }
    return steps + '.';
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
    const correctAnswer = eval(window.currentExpression);

    if (Math.abs(userAnswer - correctAnswer) < 0.01) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}. Here's how you solve it: ${window.currentStepByStep}`;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('next').style.display = 'block'; // Show the "Next Question" button
}
