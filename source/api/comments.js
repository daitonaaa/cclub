export default {

  getComments: (id) => (
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
  ),
};
