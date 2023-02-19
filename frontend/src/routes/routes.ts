const routes = {
  pages: {
    main: () => '/',
    login: () => '/login',
    signup: () => '/signup',
    app: () => '/app',
  },
  api: {
    login: () => '/api/auth/login',
    signup: () => '/api/auth/signup',
    tasks: () => '/api/tasks/',
    task: (taskID = '') => `/api/tasks/${taskID}`,
  },
};

export default routes;
