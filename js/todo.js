function excluir(event) {
  const card = event.target.closest(".col");
  card.remove();
}

document.addEventListener("DOMContentLoaded", carregarTarefas);

// Função para carregar as tarefas da página
function carregarTarefas() {
  const listaTarefas = document.getElementById("lista");
  const tituloCard = document.getElementById("card-header");
  listaTarefas.innerHTML = "";

  // Pega as tarefas do Local Storage
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  tituloCard.innerText = `Tarefas a fazer | ${tarefas.length }`;

  if (tarefas.length === 0) {
    listaTarefas.innerHTML = "<p>Não há tarefas no momento.</p>";
  } else {
    // Cria os cards para cada tarefa
    tarefas.forEach((tarefa, index) => {
      const card = `
          <div class="col">
            <div class="card">
              <div class="card-body">
                <i class="fa-solid fa-xmark" style="float: inline-end; cursor: pointer;" onclick="excluir(${index})"></i>
                <h5 class="card-title">${tarefa.nome}</h5>
                <p class="card-text">${tarefa.descricao || ""}</p>
                <input type="button" value="a fazer" onclick="mudarStatus(${index}, 'a fazer')" 
                       style="border:1px solid #; border-radius: 5px; background: ${
                         tarefa.status === "a fazer" ? "#FFD049" : "#fff"
                       }; padding:0 5px;">
                <input type="button" value="fazendo" onclick="mudarStatus(${index}, 'fazendo')" 
                       style="border:1px solid #FFD049; border-radius: 5px; background: ${
                         tarefa.status === "fazendo" ? "#FFD049" : "#fff"
                       }; padding:0 5px;">
                <input type="button" value="finalizado" onclick="mudarStatus(${index}, 'finalizado')" 
                       style="border:1px solid #FFD049; border-radius: 5px; background: ${
                         tarefa.status === "finalizado" ? "#FFD049" : "#fff"
                       }; padding:0 5px;">
              </div>
            </div>
          </div>`;
      listaTarefas.innerHTML += card;
    });
  }
}
// Função para adicionar nova tarefa
function adicionar() {
  const inputTarefa = document.getElementById("add");
  const nomeTarefa = inputTarefa.value.trim();

  if (nomeTarefa) {
    // Pega as tarefas existentes do Local Storage
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    // Adiciona a nova tarefa
    tarefas.push({
      nome: nomeTarefa,
      descricao: "", // Pode ser um campo de descrição futura
      status: "a fazer",
    });

    // Salva as tarefas atualizadas no Local Storage
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    // Limpa o campo de input
    inputTarefa.value = "";

    // Recarrega a lista de tarefas
    carregarTarefas();
  } else {
    alert("Por favor, digite uma tarefa.");
  }
}

// Função para excluir tarefa
function excluir(index) {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  tarefas.splice(index, 1);

  // Atualiza o Local Storage
  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  // Recarrega a lista de tarefas
  carregarTarefas();
}

// Função para mudar o status da tarefa
function mudarStatus(index, novoStatus) {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  tarefas[index].status = novoStatus;

  // Atualiza o Local Storage
  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  // Recarrega a lista de tarefas
  carregarTarefas();
}