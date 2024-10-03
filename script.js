// Select all custom checkbox elements and goal input fields
const checkBoxList = document.querySelectorAll(".custom-checkbox");
const goalInputs = document.querySelectorAll(".goal-input");

// Select elements for displaying progress and error messages
const progressText = document.querySelector(".progress-text");
const errorText = document.querySelector(".error-text");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");

// Array of motivational quotes
const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all goals, time for chill :D",
];

// Retrieve stored goals from local storage or initialize as an empty object
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

// Count the number of completed goals
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

// Set the initial progress bar width and text
progress.style.width = `${(completedGoalsCount / goalInputs.length) * 100}%`;
progress.firstElementChild.innerText = `${completedGoalsCount}/${goalInputs.length} completed`;
progressText.innerText = allQuotes[completedGoalsCount];

// Add click event listeners to each checkbox
checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    // Check if all goal inputs are filled
    const goalFilled = [...goalInputs].every(function (input) {
      return input.value; // Return true if all input values are truthy
    });

    if (goalFilled) {
      // Toggle the completed class on the parent element of the checkbox
      checkbox.parentElement.classList.toggle("completed");

      // Get the ID of the corresponding goal input
      const inputId = checkbox.nextElementSibling.id;

      // Toggle the completed status of the goal in the allGoals object
      allGoals[inputId].completed = !allGoals[inputId].completed;

      // Recalculate the count of completed goals
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;

      // Update the progress bar width and text
      progress.style.width = `${
        (completedGoalsCount / goalInputs.length) * 100
      }%`;
      progress.firstElementChild.innerText = `${completedGoalsCount}/${goalInputs.length} completed`;
      progressText.innerText = allQuotes[completedGoalsCount];

      // Save the updated goals back to local storage
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      // Show error message if not all goals are filled
      errorText.classList.add("error-show");
    }
  });
});

// Add event listeners for each goal input field
goalInputs.forEach((input) => {
  // Populate input fields with stored goal names if available
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name; // Set input value to the goal name
    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed"); // Mark as completed if applicable
    }
  }

  // Remove error message when the input gains focus
  input.addEventListener("focus", () => {
    errorText.classList.remove("error-show");
  });

  // Update goals in local storage on input change
  input.addEventListener("input", (e) => {
    // If the goal is completed, reset the input value
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name; // Reset input to goal name
      return; // Exit the function
    }

    // Update the goal name in the allGoals object
    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value; // Update existing goal
    } else {
      // Create a new goal entry if it doesn't exist
      allGoals[input.id] = {
        name: input.value, // Set goal name
        completed: false, // Initialize as not completed
      };
    }

    // Save the updated goals back to local storage
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
