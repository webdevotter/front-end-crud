import {http} from './http';
import {ui} from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);


// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);


// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Get Posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}


// Add Posts
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  if(title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else {
    const data = {
      title,
      body
    }
  
    // Create Post
    http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
  }

  
}

// Delete Post

function deletePost(e) {
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are You Sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

// Edit Post

function enableEdit(e) {
  if(e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    }

    // Fill form with current post
    ui.fillForm(data);
 }
  e.preventDefault();
}