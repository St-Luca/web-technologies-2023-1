if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}

function init() {
    const data = {
        name: 'Каталог товаров',
        hasChildren: true,
        items: [
            {
                name: 'Мойки',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        items: [
                            {
                                name: 'SMT1',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'SMT2',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    },
                    {
                        name: 'VigroMramor',
                        hasChildren: false,
                        items: []
                    },
                    {
                        name: 'Handmade',
                        hasChildren: true,
                        items: [
                            {
                                name: 'SMT3',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'SMT4',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    },
                    {
                        name: 'VigroGlass',
                        hasChildren: false,
                        items: []
                    }
                ]
            },
            {
                name: 'Фильтры',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran3',
                        hasChildren: true,
                        items: [
                            {
                                name: 'SMT5',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'SMT6',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    },
                    {
                        name: 'VigroMramor',
                        hasChildren: false,
                        items: []
                    },
                ]
            }
        ]
    }

    console.log(data);
    const items = new ListItems(document.getElementById('list-items'), data);
    console.log(items);
    items.render();
    items.init();

    function ListItems(el, data) {
        this.el = el;
        this.data = data;

        this.init = function () {
            const parents = this.el.querySelectorAll('[data-parent]')

            parents.forEach(parent => {
                const open = parent.querySelector('[data-open]')

                open.addEventListener('click', () => this.toggleItems(parent))
            })
        }

        this.render = function () {
            this.el.insertAdjacentHTML('beforeend', this.renderParent(this.data))
        }

        this.renderParent = function (data) {
            let html = `<div class="list-item list-item_open" data-parent>`;
            html += `<div class="list-item__inner">`;

            // if (data.hasChildren) {
            //     html += `<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open>`;
            //     html += `<img class="list-item__folder" src="img/folder.png" alt="folder">`;

            // }
            // else {
            //     html += `<img class="list-item__folder" src="img/folder.png" alt="folder" data-open>`;
            // }
            html += `<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open>`;
            html += `<img class="list-item__folder" src="img/folder.png" alt="folder">`;

            html += `<span>${data.name}</span>`;
            html += '</div>';
            /*if (data.hasChildren) {
                html += `<div class="list-item__items">`; //элеметы дети
                data.items.forEach(child => {
                    html += this.renderParent(child);
                });
                html += '</div>';
            }
            else {
                this.renderChildren(data);
            }
            //возвращает рендер родительского элемента
            return html;*/
            html += '<div class="list-item__items">';
            if (data.hasChildren) {
                data.items.forEach(child => {
                    html += this.renderParent(child);
                });
            }
            // else {
            //     html += `<img class="list-item__folder" src="img/folder.png" alt="folder">`;

            //     html += `<span>${data.name}</span>`;
            // }
            html += '</div>';
            html += '</div>';
            return html;
        }

        this.renderChildren = function (data) {
            let html = `<div class="list-item__inner">`;
            html += `<img class="list-item__folder" src="img/folder.png" alt="folder">`;
            html += `<span>${data.name}</span>`;
            html += `</div>`;
            return html;
        }

        this.toggleItems = function (parent) {
            parent.classList.toggle('list-item_open')
        }

        /*        this.renderTest = function (data) {
                    return `
                    <div class="test">${data.name}</div>
                    `
                }*/
    }
}
