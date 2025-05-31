// Confirm delete function
function confirmDelete() {
    return confirm("Are you sure you want to delete this blog?");
}

// Sidebar toggle
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

// Redirect to create blog page
document.getElementById("createBlogIcon").addEventListener("click", function () {
    window.location.href = "createblog.html";
});

// Display blog posts
function displayPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let comments = JSON.parse(localStorage.getItem("comments")) || {};
    let postsContainer = document.getElementById("blogPosts");

    postsContainer.innerHTML = "<h2>Latest Posts</h2>";

    posts.forEach(function (post, index) {
        let postDiv = document.createElement("div");
        postDiv.classList.add("blog-post");
        postDiv.dataset.blogId = index;  // Assign blogId for comment identification

        let postTitle = document.createElement("h3");
        postTitle.textContent = post.title;

        let postContent = document.createElement("p");
        postContent.textContent = post.content;

        let postDate = document.createElement("small");
        postDate.textContent = Posted on: ${post.date};

        // Add image if present
        if (post.image) {
            let postImage = document.createElement("img");
            postImage.src = post.image;
            postImage.style.maxWidth = "100%";
            postImage.style.height = "auto";
            postDiv.appendChild(postImage);
        }

        // Append post details
        postDiv.appendChild(postTitle);
        postDiv.appendChild(postContent);
        postDiv.appendChild(postDate);

        // Comment section
        let commentHeading = document.createElement("h4");
        commentHeading.textContent = "Comments";
        commentHeading.style.margin = "10px 0 5px 0";
        postDiv.appendChild(commentHeading);

        let commentSection = document.createElement("div");
        commentSection.classList.add("comment-section");
        postDiv.appendChild(commentSection);

        // Add comment list and form
        const commentList = document.createElement("ul");
        commentList.classList.add("comment-list");
        renderComments(index, commentList);

        const commentForm = document.createElement("form");
        commentForm.innerHTML = `
            <input type="text" placeholder="Write a comment..." required>
            <button type="submit">Comment</button>
        `;

        commentForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let input = commentForm.querySelector("input").value.trim();
            if (!input) return;
            addComment(index, input);
            commentForm.querySelector("input").value = '';
            renderComments(index, commentList);
        });

        commentSection.appendChild(commentList);
        commentSection.appendChild(commentForm);

        // Add delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete Blog";
        deleteBtn.onclick = function () {
            if (confirmDelete()) {
                deletePost(index);
            }
        };
        postDiv.appendChild(deleteBtn);

        postsContainer.appendChild(postDiv);
    });
}

// Add comment
function addComment(postId, comment) {
    let comments = JSON.parse(localStorage.getItem("comments")) || {};
    if (!comments[postId]) comments[postId] = [];
    comments[postId].push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
}

// Delete comment
function deleteComment(postId, commentIndex) {
    let comments = JSON.parse(localStorage.getItem("comments")) || {};
    if (comments[postId]) {
        comments[postId].splice(commentIndex, 1);
        localStorage.setItem("comments", JSON.stringify(comments));
    }
}

// Render comments
function renderComments(postId, commentList) {
    commentList.innerHTML = '';
    let comments = JSON.parse(localStorage.getItem("comments")) || {};
    (comments[postId] || []).forEach((comment, index) => {
        const li = document.createElement("li");
        li.textContent = comment;

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.style.marginLeft = "10px";
        delBtn.onclick = () => {
            deleteComment(postId, index);
            renderComments(postId, commentList);
        };

        li.appendChild(delBtn);
        commentList.appendChild(li);
    });
}

// Delete post
function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    displayPosts(); // Refresh posts
}

// Load posts on page load
window.onload = function () {
    displayPosts();
};

// Confirm delete function
// function confirmDelete() {
//     return confirm("Are you sure you want to delete this blog?");
// }

// // Sidebar toggle
// function showSidebar() {
//     const sidebar = document.querySelector('.sidebar');
//     sidebar.style.display = 'flex';
// }

// function hideSidebar() {
//     const sidebar = document.querySelector('.sidebar');
//     sidebar.style.display = 'none';
// }

// // Redirect to create blog page
// document.getElementById("createBlogIcon").addEventListener("click", function () {
//     window.location.href = "createblog.html";
// });

// // Display blog posts
// function displayPosts() {
//     let posts = JSON.parse(localStorage.getItem("posts")) || [];
//     let comments = JSON.parse(localStorage.getItem("comments")) || {};
//     let postsContainer = document.getElementById("blogPosts");

//     postsContainer.innerHTML = "<h2>Latest Posts</h2>";

//     posts.forEach(function (post, index) {
//         let postDiv = document.createElement("div");
//         postDiv.classList.add("blog-post");
//         postDiv.dataset.blogId = index;  // Assign blogId for comment identification

//         let postTitle = document.createElement("h3");
//         postTitle.textContent = post.title;

//         let postContent = document.createElement("p");
//         postContent.textContent = post.content;

//         let postDate = document.createElement("small");
//         postDate.textContent = `Posted on: ${post.date}`;

//         // Add image if present
//         if (post.image) {
//             let postImage = document.createElement("img");
//             postImage.src = post.image;
//             postImage.style.maxWidth = "100%";
//             postImage.style.height = "auto";
//             postDiv.appendChild(postImage);
//         }

//         // Append post details
//         postDiv.appendChild(postTitle);
//         postDiv.appendChild(postContent);
//         postDiv.appendChild(postDate);

//         // Comment section
//         let commentHeading = document.createElement("h4");
//         commentHeading.textContent = "Comments";
//         commentHeading.style.margin = "10px 0 5px 0";
//         postDiv.appendChild(commentHeading);

//         let commentSection = document.createElement("div");
//         commentSection.classList.add("comment-section");
//         postDiv.appendChild(commentSection);

//         // Add comment list and form
//         const commentList = document.createElement("ul");
//         commentList.classList.add("comment-list");
//         renderComments(index, commentList);

//         const commentForm = document.createElement("form");
//         commentForm.innerHTML = `
//             <input type="text" placeholder="Write a comment..." required>
//             <button type="submit">Comment</button>
//         `;

//         commentForm.addEventListener("submit", function (e) {
//             e.preventDefault();
//             let input = commentForm.querySelector("input").value.trim();
//             if (!input) return;
//             addComment(index, input);
//             commentForm.querySelector("input").value = '';
//             renderComments(index, commentList);
//         });

//         commentSection.appendChild(commentList);
//         commentSection.appendChild(commentForm);

//         // Add delete button
//         let deleteBtn = document.createElement("button");
//         deleteBtn.textContent = "Delete Blog";
//         deleteBtn.onclick = function () {
//             if (confirmDelete()) {
//                 deletePost(index);
//             }
//         };
//         postDiv.appendChild(deleteBtn);

//         postsContainer.appendChild(postDiv);
//     });
// }

// // Add comment
// function addComment(postId, comment) {
//     let comments = JSON.parse(localStorage.getItem("comments")) || {};
//     if (!comments[postId]) comments[postId] = [];
//     comments[postId].push(comment);
//     localStorage.setItem("comments", JSON.stringify(comments));
// }

// // Delete comment
// function deleteComment(postId, commentIndex) {
//     let comments = JSON.parse(localStorage.getItem("comments")) || {};
//     if (comments[postId]) {
//         comments[postId].splice(commentIndex, 1);
//         localStorage.setItem("comments", JSON.stringify(comments));
//     }
// }

// // Render comments
// function renderComments(postId, commentList) {
//     commentList.innerHTML = '';
//     let comments = JSON.parse(localStorage.getItem("comments")) || {};
//     (comments[postId] || []).forEach((comment, index) => {
//         const li = document.createElement("li");
//         li.textContent = comment;

//         const delBtn = document.createElement("button");
//         delBtn.textContent = "❌";
//         delBtn.style.marginLeft = "10px";
//         delBtn.onclick = () => {
//             deleteComment(postId, index);
//             renderComments(postId, commentList);
//         };

//         li.appendChild(delBtn);
//         commentList.appendChild(li);
//     });
// }

// // Delete post
// function deletePost(index) {
//     let posts = JSON.parse(localStorage.getItem("posts")) || [];
//     posts.splice(index, 1);
//     localStorage.setItem("posts", JSON.stringify(posts));
//     displayPosts(); // Refresh posts
// }

// // Load posts on page load
// window.onload = function () {
//     displayPosts();
// };
