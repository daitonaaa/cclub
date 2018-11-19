import url from './urls';

import Layout from 'components/Layout';
import { Home, Posts, Post, User, AddPost } from 'components/pages';


const routes = [
  {
    component: Layout,
    routes: [
      {
        ...url.home,
        component: Home,
        title: 'Главная',
      },
      {
        ...url.posts,
        component: Posts,
        title: 'Записи',
      },
      {
        ...url.addpost,
        component: AddPost,
        title: 'Добавить запись',
      },
      {
        path: url.post.path(),
        exact: url.post.exact,
        component: Post,
        title: 'Запись',
      },
      {
        path: url.user.path(),
        exact: url.user.exact,
        component: User,
        title: 'Пользователь',
      }
    ]
  }
];

export default routes;
