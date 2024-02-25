import { getPostItem } from './catalog.js';

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

const getCommentsForPost = async (postId) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        if (!response.ok) {
            throw new Error('Comments not found');
        }
        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error('Error fetching comments for post:', error);
        return [];
    }
};

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

            // Получаем комментарии для поста
            const comments = await getCommentsForPost(postId);
            if (comments.length > 0) {
                const commentsContainer = document.createElement('div');
                commentsContainer.innerHTML = '<h2 class = "comment">Comments</h2>';
                comments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.innerHTML = `
                        <h3 class = "comment">${comment.name}</h3>
                        <p class = "comment">${comment.body}</p>
                    `;
                    commentsContainer.appendChild(commentElement);
                });
                postDetailContainer.appendChild(commentsContainer);
            } else {
                postDetailContainer.innerHTML += '<p>No comments for this post</p>';
            }
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
