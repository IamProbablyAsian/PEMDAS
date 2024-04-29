document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', submitAnswer);
    document.getElementById('next').addEventListener('click', generateQuestion);
    // Set initial timer display and generate the first question
    document.getElementById('timer').textContent = "07:00";
    generateQuestion(); 
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
    const nums = [Math.floor(Math.random() * 9) + 1];
    let expression = nums[0].toString();

    for (let i = 1; i < 4; i++) {
        const op = ops[Math.floor(Math.random() * ops.length)];
        let nextNum = Math.floor(Math.random() * 9) + 1;
        
        // If the operation is division, adjust nextNum to be a divisor of the last number
        if (op === '/' && nextNum !== 0) { 
            const multiples = [];
            for (let j = 1; j <= 10; j++) {
                multiples.push(nextNum * j);
            }
            expression += ' / ' + nextNum;
            nums.push(nextNum);
            nextNum = multiples[Math.floor(Math.random() * multiples.length)];
        } else {
            expression += ' ' + op + ' ' + nextNum;
            nums.push(nextNum);
        }
    }
    
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

    const userAnswer = parseInt(document.getElementById('answer').value, 10);
    const correctAnswer = Math.round(eval(window.currentExpression.replace('÷', '/').replace('×', '*')));

    if (userAnswer === correctAnswer) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
    }

    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('next').style.display = 'block'; // Show the "Next Question" button
}
