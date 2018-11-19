export default {

  getUser: (id) => (
    fetch(`http://jsonplaceholder.typicode.com/users/${id}`)
  ),

  getUsers: () => (
    fetch('http://jsonplaceholder.typicode.com/users')
  ),
};
