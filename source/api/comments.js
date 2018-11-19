export default {

  getComments: (id) => (
    fetch(`http://jsonplaceholder.typicode.com/posts/${id}/comments`)
  ),
};
