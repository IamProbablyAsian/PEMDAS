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
    const ops = ['+', '-', '*', '/']; // Include all basic operations
    let nums = [getRandomNumber(), getRandomNumber(), getRandomNumber()];

    // Ensure multiplication and division involve easy, whole-number results
    let multiplication = `${nums[0]} * ${nums[1]}`;
    let division = `${nums[0] * nums[1]} / ${nums[1]}`; // Ensures division is clean

    // Creating varied but controlled expressions
    let expressions = [
        `${nums[0]} + ${multiplication} - ${nums[2]}`,  // Addition, multiplication, subtraction
        `${division} - ${nums[2]} + ${nums[0]}`,  // Division, subtraction, addition
        `${nums[0]} - ${division} + ${nums[2]}`,  // Subtraction, division, addition
        `${multiplication} + ${nums[0]} - ${nums[2]}` // Multiplication, addition, subtraction
    ];

    // Randomly select one of the simpler expressions
    return expressions[Math.floor(Math.random() * expressions.length)];
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 2; // Numbers from 2 to 10 to avoid division by 1
}

function displayExpression(expression) {
    // This function converts expression operations into HTML friendly format
    const formattedExpression = expression
        .replace(/\*/g, '×')
        .replace(/\//g, '÷')
        .replace(/\^/g, '<sup>') + '</sup>'; // Adding superscript tags around exponent

    document.getElementById('question').innerHTML = 'Solve the expression: ' + formattedExpression; // Use innerHTML to interpret HTML
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
