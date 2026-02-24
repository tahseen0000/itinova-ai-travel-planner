import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '@/firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential
} from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up onAuthStateChanged');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged - user:', user?.email);
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('signIn called with:', email);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    console.log('signUp called with:', email);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    console.log('logout called');
    await signOut(auth);
    console.log('signOut completed');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};