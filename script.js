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


    const items = new ListItems(document.getElementById('list-items'), data);
    items.init();
    items.render();


    console.log(items.renderTest(data));

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
            let html = `<div class="list-item" data-parent>`;
            html += `<div class="list-item-header" data-open>${data.name}</div>`;

            if (data.hasChildren) {
                html += '<div class="list-item-children">';
                data.items.forEach(child => {
                    html += this.renderParent(child);
                });
                html += '</div>';
            }

            html += '</div>';
            return html;
        };

        this.renderChildren = function (data) {
            let html = `<div class="list-item" data-parent>`;
            html += `<div class="list-item-header" data-open>${data.name}</div>`;
            html += '</div>';
            return html;
        }

        this.toggleItems = function (parent) {
            parent.classList.toggle('list-item_open')
        }

        // this.renderTest = function (data) {
        //     return `
        //             <div class="test">${data.name}</div>
        //             `
        // }
    }

}
