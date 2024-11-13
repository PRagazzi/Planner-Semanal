function addTask(dayElement) {
    const taskInput = dayElement.querySelector(".task-input")
    const taskText =  taskInput.value.trim()

    if(taskText === ""){
        window.alert("Por favor, insira uma tarefa.")
        return
    }

    const taskItem = document.createElement("li")
    taskItem.textContent = taskText

    const removeBtn = document.createElement("button")
    removeBtn.textContent = "Remover"
    removeBtn.addEventListener("click", function(){
        taskItem.remove()
    })

    taskItem.appendChild(removeBtn)

    const taskList = dayElement.querySelector(".task-list")
    taskList.appendChild(taskItem)

    taskInput.value = ""
    taskInput.placeholder = "Adicionar Tarefa"
}

document.querySelectorAll(".day").forEach(dayElement => {
    const addButton = dayElement.querySelector(".add-btn")
    addButton.addEventListener("click", function(){
        addTask(dayElement)
    })
})