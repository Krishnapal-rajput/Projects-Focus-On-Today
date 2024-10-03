const checkBoxList = document.querySelectorAll(".custom-checkbox");
const goalInputs = document.querySelectorAll(".goal-input");
const progressText = document.querySelector(".progress-text");
const errorText = document.querySelector(".error-text");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You jast completed all goals, time for chill :D",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progress.style.width = `${(completedGoalsCount / goalInputs.length) * 100}%`;
progress.firstElementChild.innerText = `${completedGoalsCount}/${goalInputs.length} completed`;
progressText.innerText = allQuotes[completedGoalsCount];

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const goalFilled = [...goalInputs].every(function (input) {
      return input.value;
    });
    if (goalFilled) {
      checkbox.parentElement.classList.toggle("completed");
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progress.style.width = `${
        (completedGoalsCount / goalInputs.length) * 100
      }%`;
      progress.firstElementChild.innerText = `${completedGoalsCount}/${goalInputs.length} completed`;
      progressText.innerText = allQuotes[completedGoalsCount];
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      errorText.classList.add("error-show");
    }
  });
});
goalInputs.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;
    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }
  input.addEventListener("focus", () => {
    errorText.classList.remove("error-show");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
