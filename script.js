let score = 0; // Initialize score

function generateExpression() {
    // ... keep the existing code and add more complexity, such as:
    const useParens = Math.random() > 0.5; // 50% chance to include parentheses
    const num4 = Math.floor(Math.random() * 10) + 1;
    const op3 = ops[Math.floor(Math.random() * ops.length)];
    let expression = `${num1} ${op1} ${num2} ${op2} ${num3}`;
    if (useParens) {
        expression = `(${expression}) ${op3} ${num4}`;
    }
    return expression;
}

function generateQuestion() {
    // ... keep existing code
}

function submitAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const correctAnswer = eval(window.currentExpression);
    if (Math.abs(userAnswer - correctAnswer) < 0.0001) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++; // Increment score for correct answer
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}. Here's how to solve it: ${generateSolution(window.currentExpression)}`;
        // Optionally decrement score for wrong answer, or leave it unchanged
    }
    document.getElementById('score').innerText = `Score: ${score}`; // Update score display
    document.getElementById('next').style.display = 'inline';
}

function generateSolution(expression) {
    // Generate a step-by-step solution for the given expression
    // This is quite complex and would likely involve creating a function to
    // parse the expression and apply PEMDAS rules step by step
    // For now, we'll return a placeholder
    return 'Step-by-step solution not yet implemented.';
}

window.onload = generateQuestion;
