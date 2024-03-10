function toggleItems(parent) {
    parent.classList.toggle('list-item_open');
}

const parents = document.querySelectorAll('.list-item');
parents.forEach(parent => {
    parent.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleItems(parent);
    });
});

