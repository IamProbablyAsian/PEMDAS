function generateExpression() {
    // Create a more complex expression for grades 7-9
    const ops = ['+', '-', '*', '/'];
    const nums = [];
    for (let i = 0; i < 4; i++) { // Generate four numbers to increase complexity
        nums.push(Math.floor(Math.random() * 10) + 1);
    }
    const expressionParts = [];
    for (let i = 0; i < 3; i++) { // Use three operations
        expressionParts.push(nums[i]);
        expressionParts.push(ops[Math.floor(Math.random() * ops.length)]);
    }
    expressionParts.push(nums[3]);
    const expression = expressionParts.join(' ');

    // Add parentheses randomly to change the order of operations and increase complexity
    const insertIndex = Math.floor(Math.random() * (expressionParts.length - 1));
    expressionParts.splice(insertIndex, 0, '(');
    expressionParts.splice(insertIndex + 4, 0, ')');

    return expressionParts.join(' ');
}

let score = 0; // Initialize score

function generateQuestion() {
    const expression = generateExpression();
    document.getElementById('question').innerText = 'Solve the expression: ' + expression;
    window.currentExpression = expression;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').innerText = '';
}

function submitAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    // Use a safe eval alternative if possible, eval() has security implications
    const correctAnswer = eval(window.currentExpression);
    if (Math.abs(userAnswer - correctAnswer) < 0.0001) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
    }
    document.getElementById('score').innerText = `Score: ${score}`; // Update the score display
    generateQuestion(); // Immediately generate a new question
}

// Add a score display to the HTML
document.getElementById('game-container').insertAdjacentHTML('beforeend', '<p id="score">Score: 0</p>');

window.onload = generateQuestion;
