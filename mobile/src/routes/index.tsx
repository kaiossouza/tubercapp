import React, {useContext} from 'react';
import AuthContext from '../contexts/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
    const { user } = useContext(AuthContext);

    return !!user ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;