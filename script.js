let display = document.getElementById('display');
let currentInput = '';      // The current number being entered
let previousInput = '';     // The first number before an operator is pressed
let operator = null;        // Store the operator
let shouldResetDisplay = false;  // Flag to reset display after calculation

// Update the display to show the full expression
function updateDisplay() {
  display.innerText = previousInput + (operator ? ' ' + operator + ' ' : '') + currentInput;
}

// Handle when a number is pressed
function appendNumber(number) {
  // If we just performed a calculation or pressed an operator, reset the display
  if (shouldResetDisplay) {
    currentInput = number;
    shouldResetDisplay = false;
  } else {
    currentInput = currentInput === '0' ? number : currentInput + number;
  }
  updateDisplay();
}

// Handle when an operator (+, -, *, /) is pressed
function appendOperator(op) {
  if (currentInput === '') return;  // Do nothing if no number is input yet
  
  if (operator !== null) {
    calculateResult();  // Perform any pending calculation
  }

  previousInput = currentInput;  // Store the first number
  operator = op;                 // Store the operator
  currentInput = '';              // Reset the current input for the second number
  shouldResetDisplay = false;     // Allow for input of second number
  updateDisplay();                // Update display to show expression
}

// Clear the display and reset all variables
function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

// Handle when the "=" button is pressed
function calculateResult() {
  if (operator === null || currentInput === '' || previousInput === '') return;

  let result;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  // Perform the operation
  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      if (curr === 0) {
        result = 'Error';  // Handle division by zero
      } else {
        result = prev / curr;
      }
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
  shouldResetDisplay = true;
  updateDisplay();
}

// Handle backspace (deleting the last entered number)
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}