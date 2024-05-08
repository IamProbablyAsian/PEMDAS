document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', submitAnswer);
    document.getElementById('next').addEventListener('click', generateQuestion);
    document.getElementById('timer').textContent = "07:00"; // Initialize the timer display
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
    const ops = ['+', '-', '*', '/'];
    let nums = [];
    for (let i = 0; i < 4; i++) { // Generate four numbers
        nums.push(Math.floor(Math.random() * 9) + 1);
    }
    let expression = '';
    nums.forEach((num, index) => {
        if (index > 0) {
            let op = ops[Math.floor(Math.random() * ops.length)];
            expression += ` ${op} `;
        }
        expression += num;
    });

    return addParentheses(expression);
}

function addParentheses(expr) {
    const parts = expr.split(' ');
    if (Math.random() > 0.5 && parts.length > 3) { // Only add parentheses if there are enough parts
        let index = 1; // Start at the first operator
        parts.splice(index, 2, '(' + parts[index] + parts[index + 1] + parts[index + 2] + ')');
    }
    return parts.join(' ');
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
    if (!timerStarted) {
        startTimer(gameDuration);
    }
    const userAnswer = parseInt(document.getElementById('answer').value, 10);
    const correctAnswer = eval(window.currentExpression.replace('×', '*').replace('÷', '/'));

    if (userAnswer === correctAnswer) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('next').style.display = 'block';
}
