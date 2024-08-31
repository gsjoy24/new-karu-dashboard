import { Box, Typography } from '@mui/material';

const DashboardManagement = () => {
	return (
		<Box
			sx={{
				my: 10,
				display: { xs: 'block', sm: 'flex', md: 'flex', lg: 'flex' },
				justifyContent: 'space-between',
				alignItems: 'center',
				'& > :not(:last-child)': {
					mb: { xs: 2, sm: 0, md: 0, lg: 0 }
				}
			}}
		>
			<Typography variant='h4'>Welcome to Karukon Dashboard</Typography>
		</Box>
	);
};

export default DashboardManagement;
