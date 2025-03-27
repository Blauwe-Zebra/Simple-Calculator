let NumberValue = document.getElementById("Number");
NumberValue.value = "€0 ";

let CurrentInput = null;
let CurrentOperation = "";
let PreviousInput = null;

function NumberPress(Number) {
  if (PreviousInput == null) {
    CurrentInput = Number;
  } else {
    PreviousInput = Number;
  }
}
