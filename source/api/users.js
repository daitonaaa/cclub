export default {

  getUser: (id) => (
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  ),

  getUsers: () => (
    fetch('https://jsonplaceholder.typicode.com/users')
  ),
};
