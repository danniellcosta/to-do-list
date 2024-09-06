
// Simulação de banco de dados com LocalStorage
function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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
  const taskList = document.getElementById("lista");

  // Obtém as tarefas do Local Storage
  const tasks = JSON.parse(localStorage.getItem("tarefasToDo")) || [];

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
      li.textContent = `${task.nome}`;
      taskList.appendChild(li);
    });
  } else {
    // Se não houver tarefas, exibe uma mensagem padrão
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = "Não há tarefas de momento";
    taskList.appendChild(li);
  }
});

document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("task-list");
  
    // Obtém as tarefas do Local Storage
    const tasks = JSON.parse(localStorage.getItem("tarefasToDo")) || [];
  
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
        li.textContent = `${task.nome}`;
        taskList.appendChild(li);
      });
    } else {
      // Se não houver tarefas, exibe uma mensagem padrão
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.textContent = "Não há tarefas de momento";
      taskList.appendChild(li);
    }
  });


  
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
      li.textContent = `${task.nome}`;
      taskList.appendChild(li);
    });
  } else {
    // Se não houver tarefas, exibe uma mensagem padrão
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = "Não há tarefas de momento";
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
      li.classList.add("text-white")
      li.classList.add("rounded")
      li.textContent = `${task.nome}`;
      taskList.appendChild(li);
    });
  } else {
    // Se não houver tarefas, exibe uma mensagem padrão
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = "Não há tarefas de momento";
    taskList.appendChild(li);
  }
});
