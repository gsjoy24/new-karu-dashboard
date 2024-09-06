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
		link: '/users'
	},
	{
		title: 'Orders',
		icon: <BorderAllIcon />,
		link: '/orders'
	},
	{
		title: 'Products',
		icon: <ProductionQuantityLimitsIcon />,
		link: '/products'
	},
	{
		title: 'Categories',
		icon: <CategoryIcon />,
		link: '/categories'
	}
];

export default NavLinks;
