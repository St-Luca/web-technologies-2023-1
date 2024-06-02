import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
import Todos from "../services/todos.js";
import Form from "../components/form.js";

const init = async () => {
    const { ok: isLogged } = await Auth.me()

    if (!isLogged) {
        return location.login()
    } else {
        loading.stop()
    }

    const form = document.getElementById('todo-form');
    new Form(form, {
        'description': () => false,
    }, (values) => {
        addTodo(values.description);
    })

    function createTodo(todo) {
        const todoHTML = document.createElement('div');
        const todoCheckbox = document.createElement('input');
        const todoDescription = document.createElement('span');
        const todoRemoveButton = document.createElement('button');

        todoHTML.classList.add('todo');
        todoCheckbox.setAttribute('type', 'checkbox');
        todoCheckbox.classList.add('todo__checkbox');
        todoCheckbox.checked = todo.completed;

        todoCheckbox.onchange = async function (event) {
            loading.start();
            const checkboxValue = event.target.checked;
            event.target.checked = !event.target.checked;

            const response = await Todos.updateStatusById(todo.id, checkboxValue);
            loading.stop();

            if (response) {
                event.target.checked = !event.target.checked;
            } else {
                alert('Ошибка при отправке запроса');
            }
        }
        todoDescription.classList.add('todo__description');
        todoDescription.innerText = todo.description;

        todoRemoveButton.classList.add('todo__remove');
        todoRemoveButton.innerText = 'Удалить';

        todoRemoveButton.onclick = async function (event) {
            const response = confirm('Вы уверены, что хотите удалить?');

            if (response) {
                loading.start();
                await Todos.deleteById(todo.id);
                await addTodoList();
            }
        }

        todoHTML.appendChild(todoCheckbox);
        todoHTML.appendChild(todoDescription);
        todoHTML.appendChild(todoRemoveButton);

        return todoHTML;
    }
    const addTodoList = async () => {
        const todos = await Todos.getAll();
        document.querySelector('.todo-list').innerHTML = '';
        loading.stop();

        todos.forEach(todo => {
            const todoHTML = createTodo(todo);
            document.querySelector('.todo-list')
                .appendChild(todoHTML);
        });
    }

    const addTodo = async (description) => {
        loading.start();
        const response = await Todos.create(description);

        if (response.ok) {
            await addTodoList();
        } else {
            console.log('Ошибка добавления');
        }
    }

    await addTodoList();
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}
