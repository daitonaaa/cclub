export default {

  getPosts: () => (
    fetch('https://jsonplaceholder.typicode.com/posts')
  ),

  getUserPosts: (userId) => (
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  ),

  getPost: (id) => (
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  ),

  deletePost: (id) => (
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE'
    })
  ),
};
