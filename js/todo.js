document.addEventListener("DOMContentLoaded", carregarTarefas);

function tempo(date) {
  const segundos = Math.floor((new Date() - date) / 1000);
  let intervalo = Math.floor(segundos / 3600);

  if (intervalo >= 1) {
    return intervalo + " hora(s) atrás";
  }
  intervalo = Math.floor(segundos / 60);
  if (intervalo >= 1) {
    return intervalo + " minuto(s) atrás";
  }
  return segundos + " segundo(s) atrás";
}

function updateLastAction() {
  const now = new Date();
  localStorage.setItem('lastActionTodo', now); 
  document.getElementById('lastUpdate').innerText = "Última atualização: " + tempo(now);
}

document.getElementById('btn-action').addEventListener('click', function() {
  updateLastAction();
});

// Função para carregar as tarefas da página
function carregarTarefas() {
  const listaTarefas = document.getElementById("lista");
  const tituloCard = document.getElementById("card-header");
  listaTarefas.innerHTML = "";

  const tarefasTodo = JSON.parse(localStorage.getItem("tarefasTodo")) || [];
  const lastAction = localStorage.getItem('lastActionTodo');

  if (lastAction) {
    document.getElementById('num').innerText = "Última atualização: " + tempo(new Date(lastAction));
  }

  tituloCard.innerText = `Tarefas A Fazer | ${tarefasTodo.length}`;

  if (tarefasTodo.length === 0) {
    listaTarefas.innerHTML = "<p>Não há tarefas no momento.</p>";
  } else {
    tarefasTodo.forEach((tarefa, index) => {
      const card = `
          <div class="col">
            <div class="card">
              <div class="card-body">
                <i class="fa-solid fa-xmark" style="float: inline-end; cursor: pointer;" onclick="excluir(${index})"></i>
                <h5 class="card-title">${tarefa.nome}</h5>
                <p class="card-text">${tarefa.descricao || ""}</p>
                <input type="button" value="a fazer" onclick="mudarStatus(${index}, 'a fazer')" 
                       style="border:1px solid #8E2D2B; border-radius: 5px; background: ${
                         tarefa.status === "a fazer" ? "#8E2D2B" : "#fff"
                       }; padding:0 5px;">
                <input type="button" value="fazendo" onclick="mudarStatus(${index}, 'fazendo')" 
                       style="border:1px solid #FFD049; border-radius: 5px; background: ${
                         tarefa.status === "fazendo" ? "#FFD049" : "#fff"
                       }; padding:0 5px;">
                <input type="button" value="finalizado" onclick="mudarStatus(${index}, 'finalizado')" 
                       style="border:1px solid #05BC45; border-radius: 5px; background: ${
                         tarefa.status === "finalizado" ? "#05BC45" : "#fff"
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
    const tarefasTodo = JSON.parse(localStorage.getItem("tarefasTodo")) || [];

    tarefasTodo.push({
      nome: nomeTarefa,
      descricao: "", 
      status: "a fazer",
    });

    localStorage.setItem("tarefasTodo", JSON.stringify(tarefasTodo));
    inputTarefa.value = "";
    carregarTarefas();
  } else {
    alert("Por favor, digite uma tarefa.");
  }
}

// Função para excluir tarefa
function excluir(index) {
  let tarefasTodo = JSON.parse(localStorage.getItem("tarefasTodo")) || [];
  tarefasTodo.splice(index, 1);
  localStorage.setItem("tarefasTodo", JSON.stringify(tarefasTodo));
  carregarTarefas();
}

// Função para mudar o status da tarefa
function mudarStatus(index, novoStatus) {
  let tarefasTodo = JSON.parse(localStorage.getItem("tarefasTodo")) || [];
  const tarefa = tarefasTodo[index];
  
  tarefasTodo.splice(index, 1); // Remove a tarefa atual da lista "A Fazer"

  if (novoStatus === "fazendo") {
    let tarefasOngoing = JSON.parse(localStorage.getItem("tarefasOngoing")) || [];
    tarefa.status = "fazendo";
    tarefasOngoing.push(tarefa);
    localStorage.setItem("tarefasOngoing", JSON.stringify(tarefasOngoing)); // Adiciona na lista de tarefas "Sendo Feitas"
  } else if (novoStatus === "finalizado") {
    let tarefasDone = JSON.parse(localStorage.getItem("tarefasDone")) || [];
    tarefa.status = "finalizado";
    tarefasDone.push(tarefa);
    localStorage.setItem("tarefasDone", JSON.stringify(tarefasDone)); // Adiciona na lista de "Finalizadas"
  }

  localStorage.setItem("tarefasTodo", JSON.stringify(tarefasTodo)); // Atualiza a lista de "A Fazer"
  carregarTarefas();
}