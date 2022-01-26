let add_todo = document.querySelector(".add");
let todo_list = document.querySelector(".todos");
let search = document.querySelector(".search input");
let intro = todo_list.children[0];
let local = [];

function create_template(todo) {
    return `
    <li class="list-group-item d-flex justify-content-between text-light align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;    
}

function get_local_storage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function set_local_storage(key) {
    localStorage.setItem("todo", JSON.stringify(key));
}

// check if there's todo in localstorage or not 
// if it is there, consturct li tags according to that elements
// or not, initialize the new local storage
if(!localStorage.getItem("todo")) {
    localStorage.setItem("todo", JSON.stringify([]));
}
else {
    local = JSON.parse(localStorage.getItem("todo"));
    if(local.length != 0) {
        intro.remove();
    }
    local.forEach(item => {
        todo_list.innerHTML += create_template(item);
    })
}

//adding a new todo list 
add_todo.addEventListener("submit", (e) => {
    e.preventDefault();
    let new_todo = add_todo.add.value.trim();
    if (new_todo) {
        local = get_local_storage("todo");
        if(intro) {
            intro.remove(); 
        }
        local.push(new_todo);
        set_local_storage(local);
        todo_list.innerHTML += create_template(new_todo);
    }
    add_todo.reset();
});

//delete an existing todo list
todo_list.addEventListener("click", e => {
    let del = "";
    let dex = 0;
    if (Array.from(e.target.classList).includes("delete")) {
        del = e.target.parentElement.textContent.trim();
        Array.from(e.target.parentElement.parentElement.children).forEach((item, index) => {
            if (e.target.parentElement == item) {
                dex = index;
            }
        });
        e.target.parentElement.remove();
        if(!Array.from(todo_list.children).length) {
            todo_list.append(intro);
        }
        local = get_local_storage("todo");
        let filtered = local.filter((item, index) =>  {
            return (item != del && index != dex) || (item == del && index != dex)
        });

        set_local_storage(filtered);

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