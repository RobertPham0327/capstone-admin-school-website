import React from 'react';
// import { useAppDispatch } from '../../../toolkit/hooks';
import JWTAuthAuthProvider from '@crema/services/auth/jwt-auth/JWTAuthProvider';

// import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS } from '@crema/constants/ActionTypes';

type Props = {
  children: React.ReactNode;
};
const AppAuthProvider = ({ children }: Props) => {
  return <JWTAuthAuthProvider>{children}</JWTAuthAuthProvider>;
};

export default AppAuthProvider;
