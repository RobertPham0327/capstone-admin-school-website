import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { UserType } from '@crema/types/models/AuthUser';
import jwtAxios, { setAuthToken } from './index';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { getCsrfToken, getCurrentUser } from '@crema/services/api/auth';

interface JWTAuthContextProps {
  user: UserType | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface JWTAuthActionsProps {
  signUpUser: (data: SignUpProps) => void;
  signInUser: (data: SignInProps) => void;
  logout: () => void;
}

const JWTAuthContext = createContext<JWTAuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const JWTAuthActionsContext = createContext<JWTAuthActionsProps>({
  signUpUser: () => undefined,
  signInUser: () => undefined,
  logout: () => undefined,
});

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

interface JWTAuthAuthProviderProps {
  children: ReactNode;
}

const JWTAuthAuthProvider: React.FC<JWTAuthAuthProviderProps> = ({ children }) => {
  const _ = getCsrfToken();
  const { fetchApi: fetchCurrentUser } = getCurrentUser();
  const [firebaseData, setJWTAuthData] = useState<JWTAuthContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const infoViewActionsContext = useInfoViewActionsContext();

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      fetchCurrentUser({
        onSuccess(data) {
          setJWTAuthData({
            user: data,
            isLoading: false,
            isAuthenticated: true,
          });
        },
        onError() {
          setJWTAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          });
        },
      });
    };

    getAuthUser();
  }, []);

  const signInUser = async ({ email, password }: { email: string; password: string }) => {
    infoViewActionsContext.fetchStart();
    try {
      const { data } = await jwtAxios.post('login', {
        email,
        password,
      });
      setAuthToken(data.data.token);
      // const res = await jwtAxios.get("/auth");
      setJWTAuthData({
        user: data.data.admin,
        isAuthenticated: true,
        isLoading: false,
      });
      infoViewActionsContext.fetchSuccess();
      location.reload();
    } catch (error: any) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      infoViewActionsContext.fetchError(error?.response?.data?.messages);
    }
  };

  const signUpUser = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    infoViewActionsContext.fetchStart();
    try {
      const { data } = await jwtAxios.post('users', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get('/auth');
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      infoViewActionsContext.fetchSuccess();
    } catch (error: any) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      infoViewActionsContext.fetchError(error?.response?.data?.messages);
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;
