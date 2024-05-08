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
    let nums = [];
    let expression = '';
    for (let i = 0; i < 4; i++) {
        nums.push(Math.floor(Math.random() * 9) + 1);
    }
    let parenthesesIndex = Math.floor(Math.random() * 2); // Choose random index to place parentheses

    if (parenthesesIndex === 0) { // Apply parentheses around the first two operations
        expression = `(${nums[0]} ${ops[Math.floor(Math.random() * ops.length)]} ${nums[1]}) ${ops[Math.floor(Math.random() * ops.length)]} ${nums[2]} ${ops[Math.floor(Math.random() * ops.length)]} ${nums[3]}`;
    } else { // Apply parentheses around the last two operations
        expression = `${nums[0]} ${ops[Math.floor(Math.random() * ops.length)]} (${nums[1]} ${ops[Math.floor(Math.random() * ops.length)]} ${nums[2]}) ${ops[Math.floor(Math.random() * ops.length)]} ${nums[3]}`;
    }

    window.currentStepByStep = generateStepByStep(expression); // Store step-by-step explanation
    return expression;
}

function displayExpression(expression) {
    const friendlyExpression = expression.replace(/\*/g, '×').replace(/\//g, '÷');
    document.getElementById('question').innerText = 'Solve the expression: ' + friendlyExpression;
    window.currentExpression = expression; // Store the original expression for evaluation
}

function generateStepByStep(expression) {
    // Generate a detailed step-by-step explanation based on the final expression
    let result = eval(expression);
    return `Evaluate the expression step by step to get ${result}. Remember PEMDAS rules.`;
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
    const correctAnswer = eval(window.currentExpression.replace('×', '*').replace('÷', '/'));

    if (userAnswer === correctAnswer) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}. Here's how you solve it: ${window.currentStepByStep}`;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('next').style.display = 'block'; // Show the "Next Question" button
}
