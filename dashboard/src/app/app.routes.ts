import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/portal/portal.page').then(m => m.PortalPage),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'posts' },
      {
        path: 'posts',
        loadComponent: () => import('./pages/portal/posts/posts-list.page').then(m => m.PostsListPage)
      },
      {
        path: 'posts/new',
        loadComponent: () => import('./pages/portal/posts/post-edit.page').then(m => m.PostEditPage)
      },
      {
        path: 'posts/:id',
        loadComponent: () => import('./pages/portal/posts/post-edit.page').then(m => m.PostEditPage)
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/portal/categories/categories.page').then(m => m.CategoriesPage)
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/portal/users/users-list.page').then(m => m.UsersListPage)
      },
      {
        path: 'users/new',
        loadComponent: () => import('./pages/portal/users/user-edit.page').then(m => m.UserEditPage)
      },
      {
        path: 'users/:id',
        loadComponent: () => import('./pages/portal/users/user-edit.page').then(m => m.UserEditPage)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'advanced/json',
    loadComponent: () => import('./pages/editor/editor.page').then(m => m.EditorPage)
  }
];
