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
    //items.render();
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
            //проверка всех элементов на hasChildren
            //если hasChildren, то запускаем renderParent
            //если !hasChildren, то запускаем renderChildren
            if (data.hasChildren) {

                html += `<div class="list-item__inner">`;
                html += `<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open></img>`;
                html += `<span>${data.name}</span>`;
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

    /*function ListItems(el, data) {
        this.el = el
        this.data = data

        this.init = function () {
            const itemsWithChildren = this.el.querySelectorAll('.list-item__inner [data-open]')

            itemsWithChildren.forEach(item => {
                item.addEventListener('click', () => this.toggleItems(item))
            })
        }

        this.render = function (element, data) {
            element.innerHTML = this.renderParent(data)
        }

        this.renderParent = function (data) {
            let html = '<div class="list-item">'
            html += '<div class="list-item__inner">'
            if (data.hasChildren) {
                html += `<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open>`
                html += `<img class="list-item__folder" src="img/folder.png" alt="folder">`
            } else {
                html += `<img class="list-item__folder" src="img/folder.png" alt="folder">`
            }
            html += `<span>${data.name}</span>`
            html += `</div>`

            if (data.hasChildren) {
                html += '<div class="list-item__items" style="padding-left: 1.5em; display: none;">'
                data.items.forEach(child => {
                    html += this.renderParent(child)
                })
                html += '</div>'
            }

            html += '</div>'
            return html
        }



        this.renderChildren = function (data) {
            let html = ''
            if (data.hasChildren) {
                html += '<div class="list-item__items">'
                data.items.forEach(child => {
                    html += `<div class="list-item__inner">`
                    html += `<img class="list-item__folder" src="img/folder.png" alt="folder">`
                    html += `<span>${child.name}</span>`
                    html += `</div>`
                    html += this.renderChildren(child)
                })
                html += '</div>'
            }
            return html
        }

        this.toggleItems = function (item) {
            const parent = item.closest('.list-item')
            const items = parent.querySelector('.list-item__items')

            if (items) {
                items.classList.toggle('active')
            }
        }
    }*/



    /*function ListItems(el, data) {
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
            let html = `<div class="list-item list-item_open" data-parent>`;//`<div class="list-item" data-parent>`;
            html += `<div class="list-item__inner">`;
            html += `<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open>`;
            html += `<img class="list-item__folder" src="img/folder.png" alt="folder">`;
            html += `<span>${data.name}</span>`;
            //html += `<div class="list-item-header" data-open>${data.name}</div>`;
 
            if (data.hasChildren) {
                //html += '<div class="list-item-children">';
                html += '<div class="list-item__items">';
                data.items.forEach(child => {
                    html += this.renderParent(child);
                });
                html += '</div>';
            }
 
            html += '</div>';
            return html;
        };
 
        this.renderChildren = function (data) {
            let html = `<div class="list-item__inner">`;
            html += `<img class="list-item__folder" src="img/folder.png" alt="folder">`;
            html += `<span>${data.name}</span>`;
            //let html = `<div class="list-item" data-parent>`;
            //html += `<div class="list-item-header" data-open>${data.name}</div>`;
            html += '</div>';
            return html;
        }
 
        this.toggleItems = function (parent) {
            parent.classList.toggle('list-item_open')
        }
 
        this.renderTest = function (data) {
            return `
                    <div class="test">${data.name}</div>
                    `
        }
    }*/



    /*function ListItems(el, data) {
        this.el = el;
        this.data = data;
 
        this.init = function () {
            const parents = this.el.querySelectorAll('.list-item__inner');
            console.log(parents)
 
            parents.forEach(parent => {
                const open = parent.querySelector('.list-item__arrow');
 
                console.log(open)
                open.addEventListener('click', () => this.toggleItems(parent.nextElementSibling));
            });
        };
 
        this.render = function () {
            this.el.innerHTML = this.renderParent(this.data);
        };
 
        this.renderParent = function (data) {
            let html = '';
            if (data.hasChildren) {
                data.items.forEach(child => {
                    html += `<div class="list-item list-item_open" data-parent>`;
                    html += `<div class="list-item__inner">`;
                    html += `<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down">`;
                    html += `<img class="list-item__folder" src="img/folder.png" alt="folder">`;
                    html += `<span>${child.name}</span>`;
 
                });
            }
            return html;
        };
        this.renderParent = function (data) {
            let html = '';
            if (data.hasChildren) {
                data.items.forEach(child => {
                    html += this.renderItem(data); // Рендер родителя
                    html += this.renderChildren(child); // Рендер дочерних элементов
                });
            }
            return html;
        };
 
        this.renderItem = function (data) {
            let html = `<div class="list-item list-item_open" data-parent>`;
            html += `<div class="list-item__inner">`;
            html += `<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down">`;
            html += `<img class="list-item__folder" src="img/folder.png" alt="folder">`;
            html += `<span>${data.name}</span>`;
            html += `</div>`;
            return html;
        };
 
        this.renderChildren = function (data) {
            let html = `<div class="list-item__items">`;
            html += this.renderParent(data); // Рекурсивный рендер дочерних элементов
            html += `</div>`;
            return html;
        };
 
        this.toggleItems = function (element) {
            console.log(element);
            if (element) {
                element.classList.toggle('list-item_open');
            }
        };
    }*/



}
