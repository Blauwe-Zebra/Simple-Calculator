let NumberValue = document.getElementById("Number");

let CurrentInput = "";
let FullEquation = "";
let ParenthesesCount = 0;

function UpdateDisplay() {
  // Show the full equation and current input
  if (FullEquation || CurrentInput) {
    NumberValue.value = FullEquation + CurrentInput;
  } else {
    NumberValue.value = "0";
  }
}

function NumberPress(number) {
  if (CurrentInput.length < 12) {
    // Limit input length
    CurrentInput += number;
    UpdateDisplay();
  }
}

function ButtonPress(operator) {
  if (operator === "clr") {
    // Clear everything
    CurrentInput = "";
    FullEquation = "";
    ParenthesesCount = 0;
    UpdateDisplay();
  } else if (operator === "del") {
    // Delete last character of current input
    if (CurrentInput !== "") {
      // If deleting a closing parenthesis, update counter
      if (CurrentInput.slice(-1) === ")") {
        ParenthesesCount++;
      } else if (CurrentInput.slice(-1) === "(") {
        ParenthesesCount--;
      }
      CurrentInput = CurrentInput.slice(0, -1);
    } else if (FullEquation !== "") {
      // If deleting from the full equation
      if (FullEquation.slice(-1) === ")") {
        ParenthesesCount++;
      } else if (FullEquation.slice(-1) === "(") {
        ParenthesesCount--;
      }
      FullEquation = FullEquation.slice(0, -1);
    }
    UpdateDisplay();
  } else if (operator === ".") {
    // Add decimal point if not already present in current input
    if (CurrentInput !== "" && !CurrentInput.includes(".")) {
      CurrentInput += ".";
      UpdateDisplay();
    }
  } else if (operator === "(") {
    // Handle opening parenthesis
    if (CurrentInput === "" || isNaN(CurrentInput.slice(-1))) {
      // Can add opening parenthesis only at the start or after an operator
      CurrentInput += "(";
      ParenthesesCount++;
      UpdateDisplay();
    } else {
      // If there's a number, first add the multiply operator
      FullEquation += CurrentInput + " * (";
      CurrentInput = "";
      ParenthesesCount++;
      UpdateDisplay();
    }
  } else if (operator === ")") {
    // Handle closing parenthesis - only if there's an open one
    if (ParenthesesCount > 0 && CurrentInput !== "") {
      CurrentInput += ")";
      ParenthesesCount--;
      UpdateDisplay();
    } else if (ParenthesesCount > 0) {
      FullEquation += ")";
      ParenthesesCount--;
      UpdateDisplay();
    }
  } else {
    // Handle other operators (+, -, *, /, %)
    if (CurrentInput !== "") {
      // Add the current input and operator to the full equation
      FullEquation += CurrentInput + " " + operator + " ";
      CurrentInput = "";
      UpdateDisplay();
    } else if (FullEquation !== "") {
      // Change the last operator if no new input
      let lastChar = FullEquation.trim().slice(-1);
      if (["+", "-", "*", "/", "%"].includes(lastChar)) {
        FullEquation = FullEquation.slice(0, -2) + operator + " ";
      } else if (lastChar === ")") {
        // If last character is closing parenthesis, add operator
        FullEquation += " " + operator + " ";
      }
      UpdateDisplay();
    }
  }
}

function Enter() {
  if (FullEquation !== "" || CurrentInput !== "") {
    // Close any remaining open parentheses
    let expression = FullEquation + CurrentInput;
    for (let i = 0; i < ParenthesesCount; i++) {
      expression += ")";
    }

    try {
      // Use Function constructor to safely evaluate the expression
      // Replace % with modulo operation
      expression = expression.replace(/%/g, "%");

      // Create a safer evaluation environment
      const calculate = new Function(
        "return " + expression.replace(/%/g, " % ")
      );
      let result = calculate();

      // Format the result
      if (isNaN(result) || !isFinite(result)) {
        result = "Error";
      } else {
        result = parseFloat(result.toFixed(10)); // Remove trailing zeros
        result = result.toString().slice(0, 12); // Limit length
      }

      // Save the full expression for display
      const fullCalculation = expression;

      // Reset for new calculation
      CurrentInput = result.toString();
      FullEquation = "";
      ParenthesesCount = 0;

      // Show result with calculation history
      NumberValue.value = fullCalculation + " = " + CurrentInput;
    } catch (error) {
      NumberValue.value = "Error";
      CurrentInput = "";
      FullEquation = "";
      ParenthesesCount = 0;
    }
  }
}

UpdateDisplay();
