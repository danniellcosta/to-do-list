function excluir(event) {
    const card = event.target.closest(".col");
    card.remove();
  }
  
  document.addEventListener("DOMContentLoaded", carregarTarefas);
  
  function carregarTarefas() {
    const listaTarefas = document.getElementById("lista");
    listaTarefas.innerHTML = "";
    
    const tarefasToDo = JSON.parse(localStorage.getItem("tarefasToDo")) || [];
    const tarefasDoing = JSON.parse(localStorage.getItem("tarefasDoing")) || [];
    const tarefasDone = JSON.parse(localStorage.getItem("tarefasDone")) || [];

    renderTasks(tarefasToDo, "tarefasToDo", "A fazer");
    renderTasks(tarefasDoing, "tarefasDoing", "Fazendo");
    renderTasks(tarefasDone, "tarefasDone", "Finalizado");
}

function renderTasks(tarefas, categoryKey, status) {
    tarefas.forEach((tarefa, index) => {
        const card = `
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <i class="fa-solid fa-xmark" style="float: inline-end; cursor: pointer;" onclick="excluir(${index}, '${categoryKey}')"></i>
                        <h5 class="card-title">${tarefa.nome}</h5>
                        <p class="card-text">${tarefa.descricao || ""}</p>
                        <input type="button" value="a fazer" onclick="mudarStatus(${index}, '${categoryKey}', 'tarefasToDo')" 
                               style="border:1px solid; border-radius: 5px; background: ${
                                 status === "A fazer" ? "#05BC45" : "#fff"
                               }; padding:0 5px;">
                        <input type="button" value="fazendo" onclick="mudarStatus(${index}, '${categoryKey}', 'tarefasDoing')" 
                               style="border:1px solid; border-radius: 5px; background: ${
                                 status === "Fazendo" ? "#05BC45" : "#fff"
                               }; padding:0 5px;">
                        <input type="button" value="finalizado" onclick="mudarStatus(${index}, '${categoryKey}', 'tarefasDone')" 
                               style="border:1px solid; border-radius: 5px; background: ${
                                 status === "Finalizado" ? "#05BC45" : "#fff"
                               }; padding:0 5px;">
                    </div>
                </div>
            </div>`;
        listaTarefas.innerHTML += card;
    });
}
function adicionar() {
  const inputTarefa = document.getElementById("add");
  const nomeTarefa = inputTarefa.value.trim();

  if (nomeTarefa) {
      const tarefasToDo = JSON.parse(localStorage.getItem("tarefasToDo")) || [];

      tarefasToDo.push({
          nome: nomeTarefa,
          descricao: "",
          status: "a fazer",
      });

      // Salva a tarefa no Local Storage
      localStorage.setItem("tarefasToDo", JSON.stringify(tarefasToDo));

      // Limpa o campo de input
      inputTarefa.value = "";

      // Recarrega as tarefas
      carregarTarefas();
  } else {
      alert("Por favor, digite uma tarefa.");
  }
}
  // Função para excluir tarefa
  function excluir(index) {
    let tarefasDone = JSON.parse(localStorage.getItem("tarefasDone")) || [];
  
    tarefasDone.splice(index, 1);
  
    // Atualiza o Local Storage
    localStorage.setItem("tarefasDone", JSON.stringify(tarefasDone));
  
    // Recarrega a lista de tarefas
    carregarTarefas();
  }
  
  function mudarStatus(index, fromCategory, toCategory) {
    let fromTasks = JSON.parse(localStorage.getItem(fromCategory)) || [];
    let toTasks = JSON.parse(localStorage.getItem(toCategory)) || [];

    // Remove a tarefa da categoria atual
    const taskToMove = fromTasks.splice(index, 1)[0];

    // Adiciona à nova categoria
    toTasks.push(taskToMove);

    // Atualiza o localStorage
    localStorage.setItem(fromCategory, JSON.stringify(fromTasks));
    localStorage.setItem(toCategory, JSON.stringify(toTasks));

    // Recarrega as tarefas
    carregarTarefas();
}