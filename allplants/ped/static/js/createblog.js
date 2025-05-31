// function showSidebar(){
//     const sidebar = document.querySelector('.sidebar')
//     sidebar.style.display = 'flex'
// }

// function hideSidebar(){
//     const sidebar = document.querySelector('.sidebar')
//     sidebar.style.display = 'none'
// }

// // Handle form submission
// document.getElementById("newBlogForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     let title = document.getElementById("title").value;
//     let content = document.getElementById("content").value;
//     let imageFile = document.getElementById("image").files[0];  // Get the uploaded image

//     let imageBase64 = "";
//     if (imageFile) {
//         let reader = new FileReader();
//         reader.onloadend = function() {
//             imageBase64 = reader.result;
//             savePost(title, content, imageBase64);  // Call savePost when the image is ready
//         };
//         reader.readAsDataURL(imageFile);  // Convert the image to base64
//     } else {
//         savePost(title, content, imageBase64);  // Save post even if no image is uploaded
//     }
// });

// // Function to save the blog post to localStorage
// function savePost(title, content, imageBase64) {
//     // Create new blog post object
//     let newPost = {
//         title: title,
//         content: content,
//         image: imageBase64,
//         date: new Date().toLocaleDateString(),
//     };

//     // Get existing posts from localStorage or initialize an empty array
//     let posts = JSON.parse(localStorage.getItem("posts")) || [];

//     // Add the new post to the array
//     posts.push(newPost);

//     // Save the updated posts to localStorage
//     localStorage.setItem("posts", JSON.stringify(posts));

//     // Clear the form inputs
//     document.getElementById("title").value = "";
//     document.getElementById("content").value = "";
//     document.getElementById("image").value = "";

//     // Redirect back to the main blog page
//     window.location.href = "mainblog.html";
// }

// // Function to display blog posts
// function displayPosts() {
//     let posts = JSON.parse(localStorage.getItem("posts")) || [];
//     let postsContainer = document.getElementById("blogPosts");

//     // Clear existing posts
//     postsContainer.innerHTML = "<h2>Latest Posts</h2>";

//     // Loop through the posts and display them
//     posts.forEach(function(post, index) {

//         let postDiv = document.createElement("div");
//         postDiv.classList.add("blog-post");

//         let postTitle = document.createElement("h3");
//         postTitle.textContent = post.title;

//         let postContent = document.createElement("p");
//         postContent.textContent = post.content;

//         let postDate = document.createElement("small");
//         postDate.textContent = `Posted on: ${post.date}`;


//         // If there is an image, display it
//         if (post.image) {
//             let postImage = document.createElement("img");
//             postImage.src = post.image;
//             postImage.alt = "Blog Post Image";
//             postDiv.appendChild(postImage);
//         }

//         // Create a delete button with a bin icon
//         let deleteButton = document.createElement("button");
//         deleteButton.classList.add("delete-button");

//         // Add bin icon
//         let binIcon = document.createElement("img");
//         binIcon.src = "https://img.icons8.com/ios/452/delete-forever.png";  // Bin icon
//         binIcon.alt = "Delete Icon";
//         deleteButton.appendChild(binIcon);

//         // Add event listener for deleting the post
//         deleteButton.addEventListener("click", function() {
//             showConfirmPopup(index);  // Show confirmation popup instead

//         });

//         // Append the title, content, date, and delete button to the post
//         postDiv.appendChild(postTitle);
//         postDiv.appendChild(postContent);
//         postDiv.appendChild(postDate);
//         postDiv.appendChild(deleteButton);  // Add the delete button to the post

//         // Display comments made in mainblog (read-only)
//         let comments = JSON.parse(localStorage.getItem("comments")) || {};
//         let commentsContainer = document.createElement("div");
//         commentsContainer.classList.add("comments-container");
//         commentsContainer.innerHTML = "<strong>Comments:</strong>";

//         if (comments[index] && comments[index].length > 0) {
//             comments[index].forEach(comment => {
//                 const commentDiv = document.createElement("div");
//                 commentDiv.classList.add("comment");
//                 commentDiv.textContent = comment;
//                 commentsContainer.appendChild(commentDiv);
//             });
//         } else {
//             let noComment = document.createElement("p");
//             noComment.textContent = "No comments yet.";
//             commentsContainer.appendChild(noComment);
//         }

//         postDiv.appendChild(commentsContainer);
//                 postsContainer.appendChild(postDiv);
//     });
// }

// // Function to delete a blog post
// function deletePost(index) {
//     let posts = JSON.parse(localStorage.getItem("posts")) || [];   // Get the existing posts from localStorage
//     posts.splice(index, 1);   // Remove the post at the given index
//     localStorage.setItem("posts", JSON.stringify(posts));  // Save the updated posts to localStorage
//     displayPosts();   // Re-render the posts after deletion
// }

// // Load existing posts when the page is loaded
// window.onload = function() {
//     displayPosts();
// };

// let postToDeleteIndex = null;

// document.getElementById("confirmDelete").addEventListener("click", function() {
//     if (postToDeleteIndex !== null) {
//         deletePost(postToDeleteIndex);
//         postToDeleteIndex = null;
//         hideConfirmPopup();
//     }
// });

// document.getElementById("cancelDelete").addEventListener("click", function() {
//     postToDeleteIndex = null;
//     hideConfirmPopup();
// });

// function showConfirmPopup(index) {
//     postToDeleteIndex = index;
//     document.getElementById("deleteConfirm").style.display = "flex";
// }

// function hideConfirmPopup() {
//     document.getElementById("deleteConfirm").style.display = "none";
// }
