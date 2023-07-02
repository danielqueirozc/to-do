const todoForm = document.querySelector('#to-do-form')
const todoInput = document.querySelector('#to-do-input')
const todoList = document.querySelector('#to-do-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')

let oldInputValue

function saveTodo(text) {
  const todo = document.createElement("div")
  todo.classList.add("to-do")

  const todoTitle = document.createElement("h3")
  todoTitle.innerText = text
  todo.appendChild(todoTitle)

  const doneBtn = document.createElement("button")
  doneBtn.classList.add("finish-to-do")
  doneBtn.innerHTML = '<i class="ph ph-check"></i>'
  todo.appendChild(doneBtn)

  const editBtn = document.createElement("button")
  editBtn.classList.add("edit-to-do")
  editBtn.innerHTML = '<i class="ph ph-pencil"></i>'
  todo.appendChild(editBtn)

  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add("remove-to-do")
  deleteBtn.innerHTML = '<i class="ph ph-x"></i>'
  todo.appendChild(deleteBtn)

  todoList.appendChild(todo)

  todoInput.value = ""
  todoInput.focus()
}

function toggleForms() {
  editForm.classList.toggle("hide")
  todoForm.classList.toggle("hide")
  todoList.classList.toggle("hide")
}

function updateTodo(text) {
  const todos = document.querySelectorAll(".to-do")

  todos.forEach((todo) =>  {
    let todoTitle = todo.querySelector("h3")

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text
    }
  })
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const inputValue = todoInput.value

  if (inputValue) {
    saveTodo(inputValue)
  }
})

document.addEventListener("click", (e) => {
  const targetEl = e.target
  const parentEl = targetEl.closest("div")
  let todoTitle

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText
  }

  if (targetEl.classList.contains("finish-to-do")) {
    parentEl.classList.toggle("done")
  }

  if (targetEl.classList.contains("remove-to-do")) {
    parentEl.remove()
  }

  if (targetEl.classList.contains("edit-to-do")) {
    toggleForms()

    editInput.value = todoTitle
    oldInputValue = todoTitle
  }
})

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault()

  toggleForms()
})

editForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const editInputValue = editInput.value

  if (editInputValue) {
    updateTodo(editInputValue)
  }

  toggleForms()
})