let score = 0;
let questionsAttempted = 0;

function generateExpression() {
    const ops = ['+', '-', '*', '/'];
    const nums = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
    const selectedOps = [ops[Math.floor(Math.random() * ops.length)], ops[Math.floor(Math.random() * ops.length)], ops[Math.floor(Math.random() * ops.length)]];
    // Generate a more complex expression for older students
    return `((${nums[0]} ${selectedOps[0]} ${nums[1]}) ${selectedOps[1]} ${nums[2]}) ${selectedOps[2]} ${nums[3]}`;
}

function generateQuestion() {
    const expression = generateExpression();
    document.getElementById('question').innerText = 'Solve the expression: ' + expression;
    window.currentExpression = expression;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('next').style.display = 'none';
    updateScoreboard();
}

function submitAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const correctAnswer = eval(window.currentExpression);
    questionsAttempted++;

    if (Math.abs(userAnswer - correctAnswer) < 0.0001) {
        document.getElementById('feedback').innerText = 'Correct! Path cleared.';
        score++;
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
    }
    document.getElementById('next').style.display = 'inline';
    updateScoreboard();
}

function updateScoreboard() {
    document.getElementById('score').innerText = `Score: ${score}/${questionsAttempted}`;
}

window.onload = generateQuestion;
