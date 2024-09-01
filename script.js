const mealInput = document.getElementById("meal-input");
const caloriesInput = document.getElementById("calories-input");
const tableBody = document.getElementById("table-body");
const totalCaloriesEl = document.getElementById("total-calories");

let meals = [];

const updateTable = () => {
  tableBody.innerHTML = meals
    .map(
      (meal, index) => `
       <tr>
         <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${meal.name}</th>
         <td class="px-6 py-4">${meal.calories}</td>
         <td><button class="delete-btn px-6 py-4" data-index="${index}">🗑️</button></td>
       </tr>
     `
    )
    .join("");

  updateTotalCalories();
  addDeleteEventListeners();
};

const updateTotalCalories = () => {
  const totalCalories = meals.reduce((total, meal) => total + meal.calories, 0);
  totalCaloriesEl.textContent = totalCalories;
};

const addDeleteEventListeners = () => {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      meals = meals.filter((_, i) => i !== parseInt(index));
      updateTable();
    });
  });
};

const handleSave = () => {
  const mealName = mealInput.value.trim();
  const calories = parseInt(caloriesInput.value);

  if (mealName && !isNaN(calories)) {
    meals.push({ name: mealName, calories });
    updateTable();
    handleCancel();
  }
};

const handleCancel = () => {
  mealInput.value = "";
  caloriesInput.value = "";
};

document.getElementById("save-btn").addEventListener("click", handleSave);
document.getElementById("cancel-btn").addEventListener("click", handleCancel);
