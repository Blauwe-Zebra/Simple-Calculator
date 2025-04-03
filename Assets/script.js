let NumberValue = document.getElementById("Number");

let CurrentInput = "";
let Inputs = [];
let Operations = [];
let FullEquation = "";

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
    Inputs = [];
    Operations = [];
    FullEquation = "";
    UpdateDisplay();
  } else if (operator === "del") {
    // Delete last character of current input
    CurrentInput = CurrentInput.slice(0, -1);
    UpdateDisplay();
  } else if (operator === ".") {
    // Add decimal point if not already present
    if (!CurrentInput.includes(".")) {
      CurrentInput += ".";
      UpdateDisplay();
    }
  } else {
    // Handle operators
    if (CurrentInput !== "") {
      // Save current input and operator
      Inputs.push(parseFloat(CurrentInput));
      Operations.push(operator);

      // Update the full equation display
      FullEquation += CurrentInput + " " + operator + " ";
      CurrentInput = "";
      UpdateDisplay();
    } else if (Operations.length > 0) {
      // Change the last operator if no new input
      Operations[Operations.length - 1] = operator;
      FullEquation = FullEquation.slice(0, -3) + operator + " ";
      UpdateDisplay();
    }
  }
}

function Enter() {
  if (CurrentInput !== "" && Inputs.length > 0) {
    // Add the final input
    Inputs.push(parseFloat(CurrentInput));

    // Calculate the result
    let result = Inputs[0];
    for (let i = 0; i < Operations.length; i++) {
      const nextNum = Inputs[i + 1];
      switch (Operations[i]) {
        case "+":
          result += nextNum;
          break;
        case "-":
          result -= nextNum;
          break;
        case "*":
          result *= nextNum;
          break;
        case "/":
          result = nextNum !== 0 ? result / nextNum : "Error";
          break;
        case "%":
          result = result % nextNum;
          break;
      }

      // Stop calculation if error occurred
      if (result === "Error") break;
    }

    // Format and display the result
    if (result !== "Error") {
      result = parseFloat(result.toFixed(10)); // Remove trailing zeros
      result = result.toString().slice(0, 12); // Limit length
    }

    // Display the full equation with result
    const fullCalculation = FullEquation + CurrentInput;

    // Reset for new calculation but keep history
    CurrentInput = result.toString();
    Inputs = [];
    Operations = [];
    FullEquation = "";

    // Show result with calculation history
    NumberValue.value = fullCalculation + " = " + CurrentInput;
  } else if (CurrentInput !== "") {
    // If only one number is entered, keep it as is
    UpdateDisplay();
  }
}

UpdateDisplay();
