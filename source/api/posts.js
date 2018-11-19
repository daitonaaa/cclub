export default {

  getPosts: () => (
    fetch('http://jsonplaceholder.typicode.com/posts')
  ),

  getUserPosts: (userId) => (
    fetch(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  ),

  getPost: (id) => (
    fetch(`http://jsonplaceholder.typicode.com/posts/${id}`)
  ),

  deletePost: (id) => (
    fetch(`http://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE'
    })
  ),

  createPost: (post) => (
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  )
};
