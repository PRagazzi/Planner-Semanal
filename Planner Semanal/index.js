function addTask(dayElement) {
    const taskInput = dayElement.querySelector(".task-input")
    const taskText =  taskInput.value.trim()
    const mensagemErro = dayElement.querySelectorAll(".mensagemErro")
    mensagemErro.forEach(msg => msg.remove())

    if(taskText === ""){
        exibirErro(taskInput,"Por favor, insira uma tarefa.")
        return
    }

    // Verificando se há duplicação de tarefas
    const taskList = dayElement.querySelector(".task-list")
    const taskExistente = taskList.querySelectorAll(".task-text")
    for(const task of taskExistente){
        if(task.textContent === taskText){
            exibirErro(taskInput, "Tarefa já adicionada!")
            taskInput.value = ""
            return
        }
    }

    const taskItem = document.createElement("li")
    
    const divButtons = document.createElement("div")
    divButtons.classList.add("div-buttons") // Adicionando a classe para estilizar

    // Criando o botão de remover tarefa
    const removeBtn = document.createElement("button")
    removeBtn.textContent = "Remover"
    removeBtn.addEventListener("click", function(){
        taskItem.remove()
        verificarListaVazia(dayElement)
    })

    // Criando botão de remover todas as tarefas
    if(!dayElement.querySelector(".removeAllBtn")){
        const removeAll = document.createElement("button")
        removeAll.textContent = "Remover Todas"
        removeAll.classList.add("removeAllBtn")
        removeAll.addEventListener("click", function (){
            taskList.innerHTML = ""
            verificarListaVazia(dayElement) // Verifica se ainda ficou alguma tarefa na ul
        })

        taskList.parentElement.appendChild(removeAll)
    }

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
            const taskAtualizada = editarTarefa.trim()
            
            // Adicionando o teste de duplicidade na edição de tarefas
            const taskAtual = taskList.querySelectorAll(".task-text")
            for(const task of taskAtual){
                if(task !== taskTextSpan && task.textContent === taskAtualizada){
                    window.alert("Essa tarefa já existe!")
                    return
                }
            }
            taskTextSpan.textContent = taskAtualizada
        }
    })

    taskItem.appendChild(taskTextSpan)

    taskItem.appendChild(divButtons)

    divButtons.appendChild(editBtn)
    divButtons.appendChild(removeBtn)

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

function verificarListaVazia(dayElement){
    const taskList = dayElement.querySelector(".task-list")
    const removeAllButton = dayElement.querySelector(".removeAllBtn")
    const mensagemErro = dayElement.querySelector(".mensagemErro")

    if(taskList.children.length === 0 && removeAllButton){
        removeAllButton.remove() // Remove o botão "Remover Todas", caso a lista esteja vazia
        mensagemErro.textContent = ""
    }
}

function exibirErro (input, mensagem) {
    const elementoErro = document.createElement("div")
    elementoErro.classList.add("mensagemErro")
    elementoErro.style.color = "red"
    elementoErro.textContent = mensagem
    input.insertAdjacentElement("afterend", elementoErro)
}