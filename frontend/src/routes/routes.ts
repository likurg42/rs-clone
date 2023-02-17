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
    tasks: (userId = '') => `/api/tasks/${userId}`,
  },
};

export default routes;
