import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

export interface CompilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  currentLanguage: "html" | "css" | "javascript";
  currentCode: string;
}

const initialState: CompilerSliceStateType = {
  fullCode: {
    html: `
<!-- This is a default "HTML" code written over here,\n you can simply remove whole code and write your own code. -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Counter App</h1>
        <div id="counter">0</div>
        <button id="incrementButton">Increment</button>
        <button id="decrementButton">Decrement</button>
        <button id="resetButton">Reset</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
    `,
    css: `
/* This is a default "CSS" code written over here,\n you can simply remove whole code and write your own code. */
body {
    font-family: Arial, sans-serif;
}
    
.container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
}
    
h1 {
    margin-bottom: 20px;
}
    
#counter {
    font-size: 24px;
    margin-bottom: 20px;
}
    
button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}
    
button:hover {
    background-color: #45a049;
}    
    `,
    javascript: `
/* This is a default "HTML" code written over here,\n you can simply remove whole code and write your own code. */

// Get references to HTML elements
const counterDisplay = document.getElementById("counter");
const incrementButton = document.getElementById("incrementButton");
const decrementButton = document.getElementById("decrementButton");
const resetButton = document.getElementById("resetButton");
    
// Initial counter value
let counter = 0;
    
// Update the counter display
function updateCounterDisplay() {
    counterDisplay.textContent = counter;
}
    
// Increment the counter
function incrementCounter() {
    counter++;
    updateCounterDisplay();
}
    
// Decrement the counter
function decrementCounter() {
    counter--;
    updateCounterDisplay();
}
    
// Reset the counter
function resetCounter() {
    counter = 0;
    updateCounterDisplay();
}
    
// Event listeners for buttons
incrementButton.addEventListener("click", incrementCounter);
decrementButton.addEventListener("click", decrementCounter);
resetButton.addEventListener("click", resetCounter);
    
// Initial update of counter display
updateCounterDisplay();    
    `,
  },
  currentLanguage: "html",
  currentCode: "",
};

const compilerSlice = createSlice({
  name: "compiler",
  initialState,
  reducers: {
    updateCurrentLanguage: (
      state,
      action: PayloadAction<CompilerSliceStateType["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },
    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
    updateCurrentCode: (state, action: PayloadAction<string>) => {
      state.currentCode = action.payload;
    },
  },
});

export const { updateCurrentLanguage, updateCodeValue, updateCurrentCode } =
  compilerSlice.actions;

export default compilerSlice.reducer;
