let score = 0; // Initialize score

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
    // Placeholder for a future feature to provide step-by-step solutions.
    return 'Step-by-step solution not yet implemented.';
}

window.onload = generateQuestion;
