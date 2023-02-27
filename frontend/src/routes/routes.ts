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
    task: (taskId = '') => [API_PREFIX, 'tasks', taskId].join('/'),
    projects: () => [API_PREFIX, 'projects'].join('/'),
    project: (projectId = '') => [API_PREFIX, 'projects', projectId].join('/'),
    contexts: () => [API_PREFIX, 'contexts'].join('/'),
    context: (contextId = '') => [API_PREFIX, 'contexts', contextId].join('/'),

  },
};

export default routes;
