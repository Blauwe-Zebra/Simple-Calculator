let NumberValue = document.getElementById("Number");

let CurrentInput = null;
let CurrentOperation = "";
let PreviousInput = null;

UpdateNumber();
function UpdateNumber() {
  if (PreviousInput == null && CurrentInput == null) {
    NumberValue.value = "€0 ";
  } else {
    NumberValue.value =
      PreviousInput + " " + CurrentOperation + " " + CurrentInput + " ";
  }
}

function NumberPress(Number) {
  if (PreviousInput == null) {
    CurrentInput = Number;
  } else {
    PreviousInput = Number;
  }
  UpdateNumber();
}
