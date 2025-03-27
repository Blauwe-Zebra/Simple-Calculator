let NumberValue = document.getElementById("Number");

let CurrentInput = "";
let PreviousInput = "";
let CurrentOperation = null;

function UpdateNumber() {
  NumberValue.value = CurrentInput + " " || "0 ";
}

function NumberPress(number) {
  if (CurrentInput.length < 12) {
    // Beperking op lengte van invoer
    CurrentInput += number;
    UpdateNumber();
  }
}

function ButtonPress(operator) {
  if (operator === "clr") {
    CurrentInput = "";
    PreviousInput = "";
    CurrentOperation = null;
    UpdateNumber();
  } else if (operator === "del") {
    CurrentInput = CurrentInput.slice(0, -1);
    UpdateNumber();
  } else if (operator === ".") {
    if (!CurrentInput.includes(".")) {
      CurrentInput += ".";
      UpdateNumber();
    }
  } else {
    if (CurrentInput !== "") {
      if (PreviousInput !== "") {
        Enter();
      }
      PreviousInput = CurrentInput;
      CurrentInput = "";
      CurrentOperation = operator;
    }
  }
}

function Enter() {
  if (PreviousInput !== "" && CurrentInput !== "") {
    let result;
    let prev = parseFloat(PreviousInput);
    let curr = parseFloat(CurrentInput);

    switch (CurrentOperation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        result = curr !== 0 ? prev / curr : "Error";
        break;
      case "%":
        result = prev % curr;
        break;
      default:
        return;
    }

    CurrentInput = result.toString().slice(0, 12); // Beperking op lengte
    PreviousInput = "";
    CurrentOperation = null;
    UpdateNumber();
  }
}

UpdateNumber();
