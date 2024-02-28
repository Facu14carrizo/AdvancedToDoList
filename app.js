const input = document.querySelector('input');
const addBtn = document.querySelector('.btn-add');
const ul = document.querySelector("ul");
const empty = document.querySelector('.empty');
const clearBtn = document.querySelector('.btn-clear');

// Recuperar tareas del Local Storage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            addTask(task);
        });
    }
});

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const text = input.value.trim(); // Eliminar espacios en blanco al principio y al final del texto

    if (text !== "") {
        addTask(text);
        input.value = "";
        empty.style.display = "none";
        saveTasksToLocalStorage(); // Guardar la tarea en el Local Storage
    }
});

clearBtn.addEventListener("click", (e) => {
    ul.innerHTML = ""; // Borrar todas las tareas
    empty.style.display = "block";
    localStorage.removeItem('tasks'); // Eliminar todas las tareas del Local Storage
});

function addTask(text) {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = text;

    li.appendChild(p);
    li.appendChild(addDeleteBtn());
    ul.appendChild(li);
}

function addDeleteBtn() {
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);
        saveTasksToLocalStorage(); // Guardar la tarea en el Local Storage
        if (ul.childElementCount === 0) {
            empty.style.display = "block";
        }
    });
    return deleteBtn;
}

function saveTasksToLocalStorage() {
    const tasks = [];
    ul.querySelectorAll("li").forEach(li => {
        tasks.push(li.querySelector("p").textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
