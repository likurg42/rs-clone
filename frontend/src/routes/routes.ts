const API_PREFIX = '/api';

const routes = {
  pages: {
    main: () => ['/'].join('/'),
    login: () => ['/login'].join('/'),
    signup: () => ['/signup'].join('/'),
    app: () => ['/app'].join('/'),
  },
  api: {
    login: () => [API_PREFIX, 'auth', 'login'].join('/'),
    signup: () => [API_PREFIX, 'auth', 'signup'].join('/'),
    tasks: () => [API_PREFIX, 'tasks'].join('/'),
    task: (taskID = '') => [API_PREFIX, 'tasks', taskID].join('/'),
    projects: () => [API_PREFIX, 'projects'].join('/'),
  },
};

export default routes;
