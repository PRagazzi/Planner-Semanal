function addTask(dayElement) {
    const taskInput = dayElement.querySelector(".task-input")
    const taskText =  taskInput.value.trim()

    if(taskText === ""){
        window.alert("Por favor, insira uma tarefa.")
        return
    }

    const taskItem = document.createElement("li")
    
    const divButtons = document.createElement("div")
    divButtons.classList.add("div-buttons") // Adicionando a classe para estilizar

    // Criando o botão de remover tarefa
    const removeBtn = document.createElement("button")
    removeBtn.textContent = "Remover"
    removeBtn.addEventListener("click", function(){
        taskItem.remove()
    })


    // Criando uma span para organizar o texto da li
    const taskTextSpan = document.createElement("span")
    taskTextSpan.classList.add("task-text") // Adicionando a classe para estilizar
    taskTextSpan.textContent = taskText

    // Adicionando a possibilidade de edição de tarefas
    const editBtn = document.createElement("button")
    editBtn.textContent = "Editar"
    editBtn.addEventListener("click", function () {
        const editarTarefa = window.prompt("Editando...", taskTextSpan.textContent)
        if (editarTarefa !== null & editarTarefa.trim() !== "") {
            taskTextSpan.textContent = editarTarefa.trim()
        }
    })

    taskItem.appendChild(taskTextSpan)

    taskItem.appendChild(divButtons)

    divButtons.appendChild(editBtn)

    divButtons.appendChild(removeBtn)

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