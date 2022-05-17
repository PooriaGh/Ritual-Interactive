import { useEffect } from 'react';

const useHttpAuthHandler = (axios) => {
  const reqInterceptor = axios.interceptors.request.use((req) => {
    req.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return req;
  });

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
    };
  });
};

export default useHttpAuthHandler;
