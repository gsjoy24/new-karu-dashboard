import BorderAllIcon from '@mui/icons-material/BorderAll';
import CategoryIcon from '@mui/icons-material/Category';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PeopleIcon from '@mui/icons-material/People';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography
} from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

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

const MobileSidebar = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Drawer anchor='left' open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: '80vw' } }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-around', p: 1 }}>
					<Typography
						component={Link}
						to='/'
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							gap: '8px',
							textDecoration: 'none',
							fontSize: '2rem',
							fontWeight: 'bold'
						}}
					>
						KK
					</Typography>
					<IconButton onClick={() => setOpen(false)}>
						<CloseIcon />
					</IconButton>
				</Box>
				<List>
					{links.map((link) => (
						<ListItem key={link.title} disablePadding onClick={() => setOpen(false)}>
							<ListItemButton
								component={NavLink}
								to={link.link}
								sx={{
									minHeight: 54,
									justifyContent: 'initial',
									px: 4,
									display: 'flex',
									'&:hover': {
										bgcolor: '#f1f1f1'
									}
								}}
							>
								<ListItemIcon>{link.icon}</ListItemIcon>
								<ListItemText primary={link.title} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>

			<IconButton onClick={() => setOpen((prevState) => !prevState)}>
				<MenuRoundedIcon fontSize='large' />
			</IconButton>
		</>
	);
};

export default MobileSidebar;
