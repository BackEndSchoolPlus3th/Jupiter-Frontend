// src/hooks/useAuth.js
import { useAuth } from '../components/contexts/AuthContext';
const useAuthHook = () => {
  const { user, login, logout, loading } = useAuth();
  return { user, login, logout, loading };
};

export default useAuthHook;
