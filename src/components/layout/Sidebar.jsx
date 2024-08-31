import BorderAllIcon from '@mui/icons-material/BorderAll';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';

const links = [
	{
		title: 'Dashboard',
		icon: <DashboardIcon />,
		link: '/'
	},
	{
		title: 'Orders',
		icon: <BorderAllIcon />,
		link: '/orders'
	},
	{
		title: 'Users',
		icon: <PeopleIcon />,
		link: '/orders'
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

const Sidebar = ({ open }) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
			<List sx={{ flexGrow: 1 }}>
				{links.map((link) => (
					<ListItem
						key={link.title}
						disablePadding
						sx={{
							display: 'block',
							'&:hover': {
								bgcolor: '#f1f1f1'
							}
						}}
					>
						<ListItemButton
							component={NavLink}
							to={link.link}
							sx={{
								minHeight: 54,
								justifyContent: 'initial',
								px: 4,
								display: 'flex',
								'&.active': {
									bgcolor: '#f1f1f1'
								}
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: 3,
									justifyContent: 'center',
									fontSize: 30
								}}
							>
								{link.icon}
							</ListItemIcon>
							{open && <ListItemText primary={link.title} sx={{ opacity: 1 }} />}
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default Sidebar;
