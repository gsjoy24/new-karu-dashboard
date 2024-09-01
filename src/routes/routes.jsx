import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AddProduct from '../pages/AddProduct/AddProduct';
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
				path: '/add-product',
				element: <AddProduct />
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
