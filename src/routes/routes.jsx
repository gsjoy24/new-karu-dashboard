import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AddProduct from '../pages/AddProduct/AddProduct';
import DashboardManagement from '../pages/Dashboard/DashboardManagement';
import Login from '../pages/Login/Login';
import Products from '../pages/Products/Products';
import UpdateProduct from '../pages/UpdateProduct/UpdateProduct';

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
				path: '/update-product',
				element: <UpdateProduct />
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
