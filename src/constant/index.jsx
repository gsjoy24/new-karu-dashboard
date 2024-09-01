import AddCircleIcon from '@mui/icons-material/AddCircle';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const NavLinks = [
	{
		title: 'Dashboard',
		icon: <DashboardIcon />,
		link: '/'
	},
	{
		title: 'Users',
		icon: <PeopleIcon />,
		link: '/orders'
	},
	{
		title: 'Orders',
		icon: <BorderAllIcon />,
		link: '/orders'
	},
	{
		title: 'Add Product',
		icon: <AddCircleIcon />,
		link: '/add-product'
	},
	{
		title: 'Products',
		icon: <ProductionQuantityLimitsIcon />,
		link: '/products'
	},
	{
		title: 'Category',
		icon: <CategoryIcon />,
		link: '/category'
	}
];

export default NavLinks;
