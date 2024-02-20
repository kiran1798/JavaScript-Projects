let userInput = document.querySelector(".input");
let addListButton = document.querySelector(".btn-primary");
let todosElement = document.querySelector(".todos-container")
let formElement = document.querySelector(".todo-form")

let localData = JSON.parse(localStorage.getItem("todos"));
let todoList = localData || [];

function generateUniqueId() {
    const defaultLength = 12; // Default length of the ID
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < defaultLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

addListButton.addEventListener("click", (event) => {
    event.preventDefault(); //prevents action of reloading the page
    if(userInput.value.length > 0) {
        todoList.push({id: generateUniqueId(), todo: userInput.value, isCompleted: false});
    }
    localStorage.setItem("todos", JSON.stringify(todoList));
    userInput.value = '';
    showTodoList(todoList)
})

todosElement.addEventListener("click", (event) => {
    let key = event.target.dataset.key;
    let delTodoKey = event.target.dataset.todokey;
    todoList = todoList.map(todo => todo.id === key ? {...todo, isCompleted: !todo.isCompleted} : todo)
    todoList = todoList.filter((todo) => todo.id !== delTodoKey);
    localStorage.setItem("todos", JSON.stringify(todoList));
    showTodoList(todoList)
})

function showTodoList(todoList) {
    for (let todo of todoList){
        todosElement.innerHTML = todoList.map(({id, todo, isCompleted}) => 
        `<div class="todo relative"> 
            <input id="item-${id}" data-key=${id} class="t-checkbox t-pointer" type="checkbox" ${isCompleted ? "checked" : ""}> 
            <label data-key=${id} class="todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" for="item-${id}"> ${todo} </label> 
            <button class="absolute right-0 button cursor">
                <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
            </button> 
        </div>`);
    }
}