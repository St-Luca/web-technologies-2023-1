import { getPostItem } from './src/components/catalog.js';

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

const showPostDetail = async (postId) => {
    try {
        if (!postId) {
            console.log('Post ID not provided');
            return;
        }

        console.log(postId);
        const post = await getPostItem(postId);
        console.log(post);
        const postDetailContainer = document.getElementById('post-detail');
        if (post) {
            postDetailContainer.innerHTML = `
                <h1>${post.title}</h1>
                <p>${post.body}</p>
            `;
        } else {
            postDetailContainer.innerHTML = '<p>Post not found</p>';
        }
    } catch (error) {
        console.error('Error fetching post item:', error);
    }
};

window.onload = async () => {
    await showPostDetail(postId);
};
