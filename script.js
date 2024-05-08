document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', submitAnswer);
    document.getElementById('next').addEventListener('click', generateQuestion);
    document.getElementById('timer').textContent = "07:00";
    generateQuestion(); // Ensures the first question is displayed on page load
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
    const ops = ['+', '-', '*', '/']; // Basic operations
    let nums = [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()];

    // Enhancing the complexity and inclusion of parentheses
    let expressions = [
        `(${nums[0]} + ${nums[1]}) * ${nums[2]} - ${nums[3]}`,  // Parentheses around addition, followed by multiplication and subtraction
        `${nums[0]} + (${nums[1]} * ${nums[2]}) - ${nums[3]}`,  // Multiplication inside parentheses, affected by addition and subtraction
        `${nums[0]} - (${nums[1]} + ${nums[2]}) / ${nums[3]}`,  // Parentheses around addition inside a division
        `(${nums[0]} * ${nums[1]}) / (${nums[2]} + ${nums[3]})`, // Both numerator and denominator in parentheses
        `${nums[0]} / (${nums[1]} - ${nums[2]}) * ${nums[3]}`,  // Division by a parenthesized subtraction, followed by multiplication
        `(${nums[0]} - ${nums[1]}) / (${nums[2]} * ${nums[3]})`  // Complex expression with subtraction and multiplication inside parentheses
    ];

    // Randomly select one of the expressions that use parentheses
    return expressions[Math.floor(Math.random() * expressions.length)];
}

function getRandomNumber() {
    return Math.floor(Math.random() * 20) + 1; // Numbers from 1 to 20 for varied complexity
}

function displayExpression(expression) {
    const formattedExpression = expression
        .replace(/\*/g, '×')
        .replace(/\//g, '÷')
        .replace(/\^/g, '<sup>$1</sup>');
    document.getElementById('question').innerHTML = 'Solve the expression: ' + formattedExpression;
    window.currentExpression = expression; // Store the original expression for calculation
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
    try {
        // Correctly replacing formatted superscript back to a calculable format before evaluation
        const expressionForCalculation = window.currentExpression.replace(/(\d+)\s*\*\*\s*(\d+)/g, "$1**$2");
        const expressionResult = math.evaluate(expressionForCalculation.replace('×', '*').replace('÷', '/'));
        const correctAnswer = Math.floor(expressionResult * 100) / 100; // Round down to the nearest hundredth

        if (Math.abs(userAnswer - correctAnswer) < 0.01) {
            document.getElementById('feedback').innerText = 'Correct! Path cleared.';
            score++;
        } else {
            document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
        }
    } catch (e) {
        document.getElementById('feedback').innerText = 'Error in calculating the answer. Please check the expression format.';
        console.error("Error evaluating expression:", e);
    }

    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('next').style.display = 'block';
}
