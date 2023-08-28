// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const input = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const groceryContainer = document.querySelector(".grocery-container");
const groceryList = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editId = "";

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const inputValue = input.value;
  const id = new Date().getTime().toString();
  if (inputValue && !editFlag) {
    const articleElement = document.createElement("article");
    // add class
    articleElement.classList.add("grocery-item");
    // add id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    articleElement.setAttributeNode(attr);
    articleElement.innerHTML = `<input type="checkbox" />
            <p class="title">${inputValue}</p>
            <div class="btn-container">
              <button class="edit-btn" type="button">
                <i class="fas fa-edit"></i>
              </button>
              <button class="delete-btn" type="button">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;
    const deleteBtn = articleElement.querySelector(".delete-btn");
    const editBtn = articleElement.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);
    // append child
    groceryList.appendChild(articleElement);
    // display alert
    displayAlert("item idded to the list", "success");
    // show container
    groceryContainer.classList.add("show-container");
    // add to localstorage
    addToLocalStorage(id, inputValue);
    // set back to default
    setToDefault();
  } else if (inputValue && editFlag) {
    editElement.innerHTML = inputValue;
    displayAlert("value edited", "success");
    editLocalStorage(editId, inputValue);
    setToDefault();
  } else {
    displayAlert("Please add item", "danger");
  }
}

function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      groceryList.removeChild(item);
    });
  }
  groceryContainer.classList.remove("show-container");
  displayAlert("items cleared", "danger");
  setToDefault();
  // localStorage.removeItem("list");
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  groceryList.removeChild(element);
  if (groceryList.children.length === 0) {
    groceryContainer.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setToDefault();
  // removeFromLocalStorage(id)
}

function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  input.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitBtn.textContent = "edit";
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

function setToDefault() {
  input.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}

function addToLocalStorage(id, value) {
  console.log("added to localstorage");
}

function removeFromLocalStorage(id) {}

function editLocalStorage(id, value) {}

// ****** EVENT LISTENERS **********
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
