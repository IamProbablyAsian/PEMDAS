document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', submitAnswer);
    document.getElementById('next').addEventListener('click', generateQuestion);
    document.getElementById('timer').textContent = "07:00"; // Set initial timer display
    generateQuestion(); // Initialize the first question
    document.getElementById('timer').textContent = "07:00";
    generateQuestion(); 
});

let score = 0; // Initialize score
let timer; // Timer for game duration
let gameDuration = 420; // Game duration in seconds (7 minutes)
let timerStarted = false; // Flag to check if the timer has started
let score = 0;
let timer;
let gameDuration = 420;
let timerStarted = false;

function startTimer(duration) {
    if (!timerStarted) {
@@ -46,26 +46,15 @@ function generateExpression() {
        nums.push(nextNum);
        expression += ` ${op} ${nextNum}`;
    }
    window.currentStepByStep = generateStepByStep(nums, ops); // Store step-by-step explanation
    return `${nums[0]}${expression}`;
}

function displayExpression(expression) {
    const friendlyExpression = expression.replace(/\*/g, '×').replace(/\//g, '÷');
    document.getElementById('question').innerText = 'Solve the expression: ' + friendlyExpression;
    const displayExpression = expression.replace(/\*/g, '×').replace(/\//g, '÷');
    document.getElementById('question').innerText = 'Solve the expression: ' + displayExpression;
    window.currentExpression = expression; // Store the original expression for evaluation
}

function generateStepByStep(nums, ops) {
    let steps = `Start with ${nums[0]}`;
    let result = nums[0];
    for (let i = 0; i < ops.length; i++) {
        result = eval(`${result} ${ops[i]} ${nums[i + 1]}`);
        steps += `, then ${ops[i].replace('*', 'multiply').replace('/', 'divide')} by ${nums[i + 1]} to get ${result}`;
    }
    return steps + '.';
}

function generateQuestion() {
    const newExpression = generateExpression();
    displayExpression(newExpression);
@@ -78,13 +67,14 @@ function submitAnswer() {
    if (!timerStarted) {
        startTimer(gameDuration);
    }
    const userAnswer = parseInt(document.getElementById('answer').value, 10);
    const correctAnswer = Math.round(eval(window.currentExpression));
    if (userAnswer === correctAnswer) {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const correctAnswer = eval(window.currentExpression);

    if (Math.abs(userAnswer - correctAnswer) < 0.01) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}. Here's how you solve it: ${window.currentStepByStep}`;
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('next').style.display = 'block'; // Show the "Next Question" button
}
