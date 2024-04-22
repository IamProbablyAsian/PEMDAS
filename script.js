let score = 0; // Initialize score
let timer; // Timer for game duration
let gameDuration = 600; // Game duration in seconds (10 minutes)

function startTimer(duration) {
    timer = duration;
    let minutes, seconds;
  
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById('timer').textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            endGame();
        }
    }, 1000);
}

function endGame() {
    document.getElementById('feedback').textContent = 'Time is up! Your final score is ' + score + '.';
    document.getElementById('answer').disabled = true; // Disable the answer box
    document.getElementById('submit').disabled = true; // Disable the submit button
    document.getElementById('next').style.display = 'none';
    // Here you can implement any other end-of-game logic, like posting the score to a server
}
function generateExpression() {
    const ops = ['+', '-', '*', '/'];
    const nums = [1, 2, 3].map(() => Math.floor(Math.random() * 10) + 1);
    const chosenOps = [0, 1].map(() => ops[Math.floor(Math.random() * ops.length)]);
    const useParens = Math.random() > 0.5; // 50% chance to include parentheses
    let expression = `${nums[0]} ${chosenOps[0]} ${nums[1]} ${chosenOps[1]} ${nums[2]}`;
    if (useParens) {
        expression = `(${expression}) ${chosenOps[1]} ${Math.floor(Math.random() * 10) + 1}`;
    }
    return expression;
}

function generateQuestion() {
    const expression = generateExpression();
    document.getElementById('question').innerText = 'Solve the expression: ' + expression;
    window.currentExpression = expression;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('next').style.display = 'none';
}

function submitAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const correctAnswer = eval(window.currentExpression);
    if (Math.abs(userAnswer - correctAnswer) < 0.0001) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++; // Increment score for correct answer
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}. ${generateSolution(window.currentExpression)}`;
    }
    document.getElementById('score').innerText = `Score: ${score}`; // Update score display
    document.getElementById('next').style.display = 'inline';
}

function generateSolution(expression) {
    // Simple explanation text for PEMDAS
    let solution = "Remember PEMDAS: Parentheses, Exponents, Multiplication and Division (from left to right), Addition and Subtraction (from left to right). ";
    solution += "Start with any calculations inside parentheses, then move on to exponents. ";
    solution += "Next, perform any multiplications and divisions as they appear from left to right. ";
    solution += "Finally, do the additions and subtractions from left to right.";
    return solution;
}


window.onload = function () {
    generateQuestion();
    startTimer(gameDuration);
};
