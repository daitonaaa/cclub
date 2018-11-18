export default {
  home: { path: '/', exact: true },
  posts: { path: '/posts', exact: true },
  post: { path: (id = ':id') => `/post/${id}`, exact: true, },
  user: { path: (id = ':id') => `/user/${id}`, exact: true, },
};
