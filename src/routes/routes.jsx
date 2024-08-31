import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import DashboardManagement from '../pages/Dashboard/DashboardManagement';
import Login from '../pages/Login/Login';
import Products from '../pages/Products/Products';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <DashboardManagement />
			},
			{
				path: '/products',
				element: <Products />
			}
		]
	},
	{
		path: '/login',
		element: <Login />
	}
]);

export default router;
