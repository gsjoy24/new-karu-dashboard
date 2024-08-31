/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCurrentUser } from '../redux/features/auth/authSlice';

const PrivateRoute = ({ children }) => {
	const user = useSelector(selectCurrentUser);

	if (!user) {
		return <Navigate to='/login' />;
	}
	if (user) {
		return children;
	}
};

export default PrivateRoute;
