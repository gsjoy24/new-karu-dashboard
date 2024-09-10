import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useGetDashboardQuery } from '../../redux/features/dashboardApi';

const DashboardManagement = () => {
	const { data } = useGetDashboardQuery({});
	const mainData = data?.data || {};
	return (
		<Box sx={{ padding: '2rem', mt: 10 }}>
			{/* Dashboard Header */}
			<Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold', marginBottom: '2rem' }}>
				Dashboard
			</Typography>

			{/* Grid Container for Cards */}
			<Grid container spacing={3}>
				{/* Total Users Card */}
				<Grid item xs={12} sm={6} md={3}>
					<Card sx={{ backgroundColor: '#f0f4ff', borderRadius: 3 }}>
						<CardContent>
							<Typography variant='h6' sx={{ fontWeight: 'bold' }}>
								Total Users
							</Typography>
							<Typography variant='h3' sx={{ color: '#1a73e8', fontWeight: 'bold' }}>
								{mainData.totalUsers}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				{/* Total Orders Card */}
				<Grid item xs={12} sm={6} md={3}>
					<Card sx={{ backgroundColor: '#e0ffe5', borderRadius: 3 }}>
						<CardContent>
							<Typography variant='h6' sx={{ fontWeight: 'bold' }}>
								Total Orders
							</Typography>
							<Typography variant='h3' sx={{ color: '#34a853', fontWeight: 'bold' }}>
								{mainData.totalOrders.total}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				{/* Total Products Card */}
				<Grid item xs={12} sm={6} md={3}>
					<Card sx={{ backgroundColor: '#ffedcc', borderRadius: 3 }}>
						<CardContent>
							<Typography variant='h6' sx={{ fontWeight: 'bold' }}>
								Total Products
							</Typography>
							<Typography variant='h3' sx={{ color: '#ff8c00', fontWeight: 'bold' }}>
								{mainData.totalProducts}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				{/* Total Categories Card */}
				<Grid item xs={12} sm={6} md={3}>
					<Card sx={{ backgroundColor: '#ffe0e0', borderRadius: 3 }}>
						<CardContent>
							<Typography variant='h6' sx={{ fontWeight: 'bold' }}>
								Total Categories
							</Typography>
							<Typography variant='h3' sx={{ color: '#d93025', fontWeight: 'bold' }}>
								{mainData.totalCategories}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				{/* Total Sub-Categories Card */}
				<Grid item xs={12} sm={6} md={3}>
					<Card sx={{ backgroundColor: '#e1e0ff', borderRadius: 3 }}>
						<CardContent>
							<Typography variant='h6' sx={{ fontWeight: 'bold' }}>
								Total Sub-Categories
							</Typography>
							<Typography variant='h3' sx={{ color: '#5e35b1', fontWeight: 'bold' }}>
								{mainData.totalSubCategories}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				{/* Orders Status Breakdown */}
				<Grid item xs={12} md={6}>
					<Card sx={{ borderRadius: 3, backgroundColor: '#e8f0fe' }}>
						<CardContent>
							<Typography variant='h6' sx={{ fontWeight: 'bold' }}>
								Orders Status
							</Typography>
							<Grid container spacing={2} sx={{ marginTop: '1rem' }}>
								{Object.entries(mainData.totalOrders).map(
									([key, value], index) =>
										key !== 'total' && (
											<Grid item xs={6} key={index}>
												<Typography variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
													{key}
												</Typography>
												<Typography variant='h5' sx={{ fontWeight: 'bold', color: '#1a73e8' }}>
													{value}
												</Typography>
											</Grid>
										)
								)}
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};

export default DashboardManagement;
