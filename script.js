let add_todo = document.querySelector(".add");
let todo_list = document.querySelector(".todos");
let search = document.querySelector(".search input");

function create_template(todo) {
    return `
    <li class="list-group-item d-flex justify-content-between text-light align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;    
}

//adding a new todo list 
add_todo.addEventListener("submit", (e) => {
    e.preventDefault();
    let new_todo = add_todo.add.value.trim();
    todo_list.innerHTML += create_template(new_todo);
    add_todo.reset();
});

//delete an existing todo list
todo_list.addEventListener("click", e => {
    if (Array.from(e.target.classList).includes("delete")) {
        e.target.parentElement.remove();
    }
});

//search the lists
search.addEventListener("keyup", () => {
    Array.from(todo_list.children).forEach(child => {
        if (child.textContent.toLowerCase().includes(search.value.trim().toLowerCase())) {
            if(Array.from(child.classList).includes("d-none")) {
                child.classList.remove("d-none");
            }
        }
        else {
            child.classList.add("d-none");
        }
    });
});