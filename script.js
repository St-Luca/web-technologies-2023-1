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
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'Smth',
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
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'Smth',
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
                        name: 'Ulgran',
                        hasChildren: true,
                        items: [
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'Smth',
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
            let arrowImg = '';
            if (data.hasChildren) {
                arrowImg = '<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open>';
            } else {
                arrowImg = '<img class="list-item__arrow" src="img/transparent.png" data-open alt="transparent" style="visibility: hidden;">';
            }

            let html = `
                <div class="list-item list-item_open" data-parent>
                    <div class="list-item__inner">
                    ${arrowImg}
                        <img class="list-item__folder" src="img/folder.png" alt="folder">
                        <span>${data.name}</span>
                    </div>
                    <div class="list-item__items">
                        ${this.renderChildren(data)}
                    </div>
                </div>
            `;
            return html;
        }

        this.renderChildren = function (data) {
            let childrenHtml = '';
            if (data.hasChildren) {
                data.items.forEach(child => {
                    childrenHtml += this.renderParent(child);
                });
            } else {
                data.items.forEach(child => {
                    childrenHtml += `
                <div class="list-item">
                    <div class="list-item__inner">
                        <img class="list-item__folder" src="img/folder.png" alt="folder">
                        <span>${child.name}</span>
                    </div>
                    <div class="list-item__items"></div>
                </div>
            `;
                });
            }
            return childrenHtml;
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