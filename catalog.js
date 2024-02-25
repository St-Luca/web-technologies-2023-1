import { Catalog } from "./src/components/catalog.js";

export const renderPostItem = item => `
    <a  
        href="posts/${item.id}"
        class="post-item"
        data-post-id="${item.id}"
    >
        <span class="post-item__title">
            ${item.title}
        </span>

        <span class="post-item__body">
            ${item.body}
        </span>
    </a>
`;

export const getPostItems = async ({ limit, page }) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
        const total = +response.headers.get('x-total-count');
        const items = await response.json();
        return { items, total };
    } catch (error) {
        console.error('Error fetching post items:', error);
        return { items: [], total: 0 };
    }
};

export const getPostItem = async (postId) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (!response.ok) {
            throw new Error('Post not found');
        }
        const post = await response.json();
        return post;
    } catch (error) {
        console.error('Error fetching post item:', error);
        return null;
    }
};

export const renderPhotoItem = item => `
    <a  
        href="photos/${item.id}"
        class="photo-item"
    >
        <span class="photo-item__title">
            ${item.title}
        </span>

        <img 
            src=${item.url}
            class="photo-item__image"
        >
    </a>
`;

export const getPhotoItems = async ({ limit, page }) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`);
        const total = +response.headers.get('x-total-count');
        const items = await response.json();
        return { items, total };
    } catch (error) {
        console.error('Error fetching photo items:', error);
        return { items: [], total: 0 };
    }
};

export const init = () => {
    const catalog = document.getElementById('catalog');
    new Catalog(catalog, {
        renderItem: renderPostItem,
        getItems: getPostItems,
        getItem: getPostItem
    }).init();

    catalog.addEventListener('click', async (event) => {
        const postItem = event.target.closest('.post-item');
        if (postItem) {
            event.preventDefault();
            const postId = postItem.getAttribute('data-post-id');
            window.location.href = `post.html?id=${postId}`;
        }
        else {
            console.error('Error get closest post-item: ', error);
        }
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
}

