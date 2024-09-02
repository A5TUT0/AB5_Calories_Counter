const addMeal = (meals, meal) => [...meals, meal];

const removeMealByIndex = (meals, index) => meals.filter((_, i) => i !== index);

const calculateTotalCalories = (meals) =>
  meals.reduce((total, meal) => total + meal.calories, 0);

const createTableRow = (meal, index) => `
  <tr>
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${meal.name}</th>
    <td class="px-6 py-4">${meal.calories}</td>
    <td><button class="delete-btn px-6 py-4" data-index="${index}">🗑️</button></td>
  </tr>
`;

const render = (meals) => {
  const tableBody = document.getElementById("table-body");
  const totalCaloriesEl = document.getElementById("total-calories");

  tableBody.innerHTML = meals.map(createTableRow).join("");
  totalCaloriesEl.textContent = calculateTotalCalories(meals);

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      meals = removeMealByIndex(meals, index);
      render(meals);
    });
  });
};

const handleSave = () => {
  const mealName = document.getElementById("meal-input").value.trim();
  const calories = parseInt(document.getElementById("calories-input").value);

  if (isValidMeal(mealName, calories)) {
    meals = addMeal(meals, { name: mealName, calories });
    render(meals);
    handleCancel();
  }
};

const isValidMeal = (mealName, calories) => mealName && !isNaN(calories);

const handleCancel = () => {
  document.getElementById("meal-input").value = "";
  document.getElementById("calories-input").value = "";
};

document.getElementById("save-btn").addEventListener("click", handleSave);
document.getElementById("cancel-btn").addEventListener("click", handleCancel);

let meals = [];
render(meals);
