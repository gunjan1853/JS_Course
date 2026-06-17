/* ============================================================
   Modern Calculator - JavaScript Logic
   ============================================================ */

// ===== DOM Elements =====
const resultDisplay = document.getElementById('result');
const expressionDisplay = document.getElementById('expression');
const buttons = document.querySelectorAll('.btn');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');

// ===== State Variables =====
let currentInput = '';
let expression = '';
let shouldResetDisplay = false;
let history = [];

// ===== Operator Mapping =====
const operatorMap = {
  '*': '×',
  '/': '÷',
  '-': '–',
  '+': '+',
  '%': '%'
};

const reverseOperatorMap = {
  '×': '*',
  '÷': '/',
  '–': '-',
  '+': '+',
  '%': '%'
};

// ===== Load Saved Data from Local Storage =====
function loadSavedData() {
  const savedTheme = localStorage.getItem('calcTheme');
  if (savedTheme) {
    document.body.classList.toggle('dark', savedTheme === 'dark');
    updateThemeButton(savedTheme === 'dark');
  }

  const savedHistory = localStorage.getItem('calcHistory');
  if (savedHistory) {
    try {
      history = JSON.parse(savedHistory);
    } catch (e) {
      history = [];
    }
  }
  renderHistory();
}

// ===== Theme Functions =====
function updateThemeButton(isDark) {
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  themeLabel.textContent = isDark ? 'Light' : 'Dark';
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  updateThemeButton(isDark);
  localStorage.setItem('calcTheme', isDark ? 'dark' : 'light');
}

// ===== Display Functions =====
function updateDisplay() {
  if (expression === '') {
    expressionDisplay.textContent = '';
    resultDisplay.textContent = currentInput || '0';
  } else {
    expressionDisplay.textContent = expression;
    resultDisplay.textContent = currentInput || '0';
  }
}

function setResult(value) {
  resultDisplay.textContent = value;
}

// ===== Check if a character is a display operator =====
function isOperatorChar(ch) {
  return ['+', '×', '÷', '–', '%'].includes(ch);
}

// ===== Input Handling =====
function appendValue(value) {

  // Handle operators after a result (chain calculation)
  if (shouldResetDisplay && ['+', '-', '*', '/', '%'].includes(value)) {
    expression = '';
    shouldResetDisplay = false;
    // currentInput keeps the result as first operand
  } else if (shouldResetDisplay) {
    currentInput = '';
    expression = '';
    shouldResetDisplay = false;
  }

  // Handle opening bracket
  if (value === '(') {
    expression += currentInput + '(';
    currentInput = '';
    updateDisplay();
    return;
  }

  // Handle closing bracket
  if (value === ')') {
    expression += currentInput + ')';
    currentInput = '';
    updateDisplay();
    return;
  }

  // Handle operators
  if (['+', '-', '*', '/', '%'].includes(value)) {

    // Prevent starting with an operator (except minus for negative)
    if (currentInput === '' && expression === '' && value !== '-') {
      return;
    }

    const displayOp = operatorMap[value] || value;
    const exprCompact = expression.replace(/\s/g, '');
    const lastChar = exprCompact.slice(-1);

    if (isOperatorChar(lastChar)) {
      expression = expression.slice(0, -3) + displayOp + ' ';
    } else {
      expression += currentInput + ' ' + displayOp + ' ';
    }
    currentInput = '';
    updateDisplay();
    return;
  }

  // Handle decimal point
  if (value === '.') {
    if (currentInput.includes('.')) return;
    if (currentInput === '') currentInput = '0';
    currentInput += '.';
    updateDisplay();
    return;
  }

  // Handle numbers
  if (currentInput === '0' && value !== '.') {
    currentInput = value;
  } else {
    currentInput += value;
  }

  updateDisplay();
}

function clearAll() {
  currentInput = '';
  expression = '';
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteLast() {

  if (shouldResetDisplay) {
    clearAll();
    return;
  }

  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } else if (expression.length > 0) {
    const parts = expression.trim().split(' ');
    if (parts.length >= 2) {
      const lastPart = parts[parts.length - 1];
      // If last part is a bracket, just remove it
      if (['(', ')'].includes(lastPart)) {
        expression = parts.slice(0, -1).join(' ');
        if (expression.length > 0) expression += ' ';
      } else {
        currentInput = parts[parts.length - 2];
        expression = parts.slice(0, -2).join(' ');
        if (expression.length > 0) expression += ' ';
      }
    } else {
      currentInput = parts[0] || '';
      expression = '';
    }
    updateDisplay();
  }
}

// ===== Calculation =====
function convertToEval(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    result += reverseOperatorMap[ch] || ch;
  }
  return result;
}

function hasDivisionByZero(expr) {
  // Match patterns like /0, / 0, ÷0, ÷ 0 followed by operator or end
  const pattern = /[\/÷]\s*0(?:\s|$|[+\-*\/÷×%])/;
  return pattern.test(expr + ' ');
}

function calculate() {

  if (shouldResetDisplay) return;

  let fullExpr = (expression + currentInput).trim();
  if (fullExpr === '') return;

  // Check for division by zero
  if (hasDivisionByZero(fullExpr)) {
    setResult('Cannot divide by zero');
    shouldResetDisplay = true;
    return;
  }

  // Convert display operators to JS operators
  let evalExpr = convertToEval(fullExpr);

  // Validate characters
  const validPattern = /^[\d+\-*/().%\s]+$/;
  if (!validPattern.test(evalExpr)) {
    setResult('Invalid Expression');
    shouldResetDisplay = true;
    return;
  }

  try {
    const result = new Function('return (' + evalExpr + ')')();

    if (result === undefined || result === null || !isFinite(result)) {
      setResult('Cannot divide by zero');
      shouldResetDisplay = true;
      return;
    }

    const formattedResult = Number.isInteger(result)
      ? result.toString()
      : parseFloat(result.toFixed(10)).toString();

    addToHistory(fullExpr, formattedResult);

    setResult(formattedResult);
    expression = fullExpr + ' = ';
    expressionDisplay.textContent = expression;
    currentInput = formattedResult;
    shouldResetDisplay = true;

  } catch (error) {
    setResult('Invalid Expression');
    shouldResetDisplay = true;
  }
}

// ===== History Functions =====
function addToHistory(expr, result) {
  const entry = {
    id: Date.now(),
    expression: expr,
    result: result
  };

  history.unshift(entry);

  if (history.length > 50) {
    history = history.slice(0, 50);
  }

  saveHistory();
  renderHistory();
}

function saveHistory() {
  localStorage.setItem('calcHistory', JSON.stringify(history));
}

function renderHistory() {
  if (history.length === 0) {
    historyList.innerHTML = '<p class="history-empty">No calculations yet</p>';
    return;
  }

  let html = '';
  for (let i = 0; i < history.length; i++) {
    const item = history[i];
    html += '<div class="history-item">' +
      '<span class="history-expr">' + escapeHtml(item.expression) + '</span>' +
      '<span class="history-result">= ' + escapeHtml(item.result) + '</span>' +
      '</div>';
  }
  historyList.innerHTML = html;
}

function clearHistory() {
  history = [];
  saveHistory();
  renderHistory();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===== Keyboard Support =====
function handleKeyboard(event) {
  const key = event.key;

  if (['Enter', 'Backspace', 'Escape'].includes(key) ||
      /^[\d+\-*/.%()]$/.test(key)) {
    event.preventDefault();
  }

  // Number keys
  if (/^[0-9]$/.test(key)) {
    appendValue(key);
    highlightButton(key);
    return;
  }

  // Operators
  if (['+', '-', '*', '/', '%'].includes(key)) {
    appendValue(key);
    const displayKey = operatorMap[key] || key;
    highlightButton(displayKey);
    return;
  }

  // Brackets
  if (key === '(' || key === ')') {
    appendValue(key);
    highlightButton(key);
    return;
  }

  // Decimal point
  if (key === '.') {
    appendValue('.');
    highlightButton('.');
    return;
  }

  // Enter key
  if (key === 'Enter') {
    calculate();
    highlightButton('=');
    return;
  }

  // Backspace
  if (key === 'Backspace') {
    deleteLast();
    highlightButton('DEL');
    return;
  }

  // Escape
  if (key === 'Escape') {
    clearAll();
    highlightButton('AC');
    return;
  }
}

function highlightButton(value) {
  buttons.forEach(function(btn) {
    const btnVal = btn.getAttribute('data-value');
    const btnText = btn.textContent.trim();
    if (btnVal === value || btnText === value) {
      btn.classList.add('pressed');
      setTimeout(function() {
        btn.classList.remove('pressed');
      }, 150);
    }
  });
}

// ===== Button Click Handler =====
function handleButtonClick(event) {
  const button = event.currentTarget;
  const value = button.getAttribute('data-value');

  button.classList.add('pressed');
  setTimeout(function() {
    button.classList.remove('pressed');
  }, 150);

  if (value === 'AC') {
    clearAll();
  } else if (value === 'DEL') {
    deleteLast();
  } else if (value === '=') {
    calculate();
  } else {
    appendValue(value);
  }
}

// ===== Event Listeners =====
buttons.forEach(function(btn) {
  btn.addEventListener('click', handleButtonClick);
});

clearHistoryBtn.addEventListener('click', clearHistory);
themeToggle.addEventListener('click', toggleTheme);
document.addEventListener('keydown', handleKeyboard);

// ===== Initialize =====
loadSavedData();
updateDisplay();
