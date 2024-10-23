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
  localStorage.setItem('lastActionFinalizado', now); 
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

  const tarefasDone = JSON.parse(localStorage.getItem("tarefasDone")) || [];
  const lastAction = localStorage.getItem('lastActionFinalizado');

  if (lastAction) {
    document.getElementById('num').innerText = "Última atualização: " + tempo(new Date(lastAction));
  }

  tituloCard.innerText = `Tarefas Finalizadas | ${tarefasDone.length }`;

  if (tarefasDone.length === 0) {
    listaTarefas.innerHTML = "<p>Não há tarefas no momento.</p>";
  } else {
    tarefasDone.forEach((tarefa, index) => {
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
    const tarefasDone = JSON.parse(localStorage.getItem("tarefasDone")) || [];

    tarefasDone.push({
      nome: nomeTarefa,
      descricao: "", 
      status: "finalizado",
    });

    localStorage.setItem("tarefasDone", JSON.stringify(tarefasDone));
    inputTarefa.value = "";
    carregarTarefas();
  } else {
    alert("Por favor, digite uma tarefa.");
  }
}


// Função para excluir tarefa
function excluir(index) {
  let tarefasDone = JSON.parse(localStorage.getItem("tarefasDone")) || [];
  tarefasDone.splice(index, 1);
  localStorage.setItem("tarefasDone", JSON.stringify(tarefasDone));
  carregarTarefas();
}

// Função para mudar o status da tarefa
function mudarStatus(index, novoStatus) {
  let tarefasDone = JSON.parse(localStorage.getItem("tarefasDone")) || [];
  const tarefa = tarefasDone[index];

  tarefasDone.splice(index, 1); // Remove a tarefa da lista "Finalizadas"

  if (novoStatus === "a fazer") {
    let tarefasTodo = JSON.parse(localStorage.getItem("tarefasToDo")) || [];
    tarefa.status = "a fazer";
    tarefasTodo.push(tarefa);
    localStorage.setItem("tarefasTodo", JSON.stringify(tarefasTodo)); // Adiciona na lista "A Fazer"
  } else if (novoStatus === "fazendo") {
    let tarefasOngoing = JSON.parse(localStorage.getItem("tarefasOngoing")) || [];
    tarefa.status = "fazendo";
    tarefasOngoing.push(tarefa);
    localStorage.setItem("tarefasOngoing", JSON.stringify(tarefasOngoing)); // Adiciona na lista "Sendo Feitas"
  }

  localStorage.setItem("tarefasDone", JSON.stringify(tarefasDone)); // Atualiza a lista "Finalizadas"
  carregarTarefas();
}