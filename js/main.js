
// Simulação de banco de dados com LocalStorage
function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (username.length < 3){
    alert("o nome de usuário deve ter pelo menos 3 caractéres!");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    errorMessage.textContent = "Por favor, insira um e-mail válido";
    return false;
  }

  const passwordRegex = /^(?=.*\d).{5,}$/;
  if (!passwordRegex.test(password)){
    alert("A senha deve ter pelo menos 5 caracteres e incluir ao menos um número.");
    return false;
    }

  if (username && email && password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(
      (user) => user.username === username || user.email === email
    );

    if (!userExists) {
      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Usuário cadastrado com sucesso!");
      window.location.href = "index.html";
    } else {
      alert("Usuário já cadastrado com esse username ou email.");
    }
  } else {
    alert("Preencha todos os campos.");
  }
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const validUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (validUser) {
    alert("Login realizado com sucesso!");
    window.location.href = "principal.html"; // Página após login
  } else {
    alert("Username ou senha incorretos.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-list");

  // Obtém as tarefas do Local Storage
  const tasks = JSON.parse(localStorage.getItem("tarefasTodo")) || [];

  // Limpa o conteúdo do card
  taskList.innerHTML = "";

  // Se existirem tarefas, as exibe
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.classList.add("bg-dark");
      li.classList.add("text-white");
      li.classList.add("rounded");
      li.classList.add("m-1");
      li.textContent = `${task.nome}`;
      taskList.appendChild(li);
    });
  } else {
    // Se não houver tarefas, exibe uma mensagem padrão
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = "Não há tarefas no momento";
    taskList.appendChild(li);
  }
});



  // Função para atualizar o status de uma tarefa
function updateTaskStatus(taskName, newStatus) {
  // Pega todas as tarefas de todos os status
  let tarefasToDo = JSON.parse(localStorage.getItem("tarefasToDo")) || [];
  let tarefasOngoing = JSON.parse(localStorage.getItem("tarefasOngoing")) || [];
  let tarefasDone = JSON.parse(localStorage.getItem("tarefasDone")) || [];

  // Remove a tarefa de qualquer lista em que ela esteja
  tarefasToDo = tarefasToDo.filter(task => task.nome !== taskName);
  tarefasOngoing = tarefasOngoing.filter(task => task.nome !== taskName);
  tarefasDone = tarefasDone.filter(task => task.nome !== taskName);

  // Adiciona a tarefa na lista correspondente ao novo status
  if (newStatus === "ToDo") {
    tarefasToDo.push({ nome: taskName });
  } else if (newStatus === "Ongoing") {
    tarefasOngoing.push({ nome: taskName });
  } else if (newStatus === "Done") {
    tarefasDone.push({ nome: taskName });
  }

  // Atualiza o LocalStorage
  localStorage.setItem("tarefasToDo", JSON.stringify(tarefasToDo));
  localStorage.setItem("tarefasOngoing", JSON.stringify(tarefasOngoing));
  localStorage.setItem("tarefasDone", JSON.stringify(tarefasDone));

  // Atualiza a exibição na página principal
  location.reload(); // Recarrega a página principal para refletir as mudanças
}

  
document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-list-ongoing");

  // Obtém as tarefas do Local Storage
  const tasks = JSON.parse(localStorage.getItem("tarefasOngoing")) || [];

  // Limpa o conteúdo do card
  taskList.innerHTML = "";

  // Se existirem tarefas, as exibe
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.classList.add("bg-dark");
      li.classList.add("text-white")
      li.classList.add("rounded")
      li.classList.add("m-1");
      li.textContent = `${task.nome}`;
      taskList.appendChild(li);
    });
  } else {
    // Se não houver tarefas, exibe uma mensagem padrão
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = "Não há tarefas no momento";
    taskList.appendChild(li);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-list-done");

  // Obtém as tarefas do Local Storage
  const tasks = JSON.parse(localStorage.getItem("tarefasDone")) || [];

  // Limpa o conteúdo do card
  taskList.innerHTML = "";

  // Se existirem tarefas, as exibe
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.classList.add("bg-dark");
      li.classList.add("text-white");
      li.classList.add("rounded");
      li.classList.add("m-1");
      li.textContent = `${task.nome}`;
      taskList.appendChild(li);
    });
  } else {
    // Se não houver tarefas, exibe uma mensagem padrão
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = "Não há tarefas no momento";
    taskList.appendChild(li);
  }
});
