import { Avatar, Box, Button, Divider, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import CGModal from '../../components/Modal/CGModal';

const Customer = ({ orderData }) => {
	const [open, setOpen] = useState(false);
	const { customer, name, address, city, district, phone, order_id, status } = orderData;
	const customerName = customer?.full_name || `${customer?.name?.firstName || 'N/A'} ${customer?.name?.lastName || ''}`;
	return (
		<>
			<Button variant='text' onClick={() => setOpen(true)} title='View Customer Details'>
				{customerName}
			</Button>
			<CGModal open={open} handleClose={() => setOpen(false)}>
				<Box sx={{ padding: 4 }}>
					<Typography variant='h4' gutterBottom align='center'>
						Order Details
					</Typography>
					<Divider sx={{ mb: 3 }} />
					<Grid container spacing={4}>
						{/* Customer Details */}
						<Grid item xs={12} md={6}>
							<Box display='flex' alignItems='center' gap={2} mb={2}>
								<Avatar sx={{ bgcolor: 'primary.main' }}>{customerName[0]}</Avatar>
								<Typography variant='h6'>{customerName}</Typography>
							</Box>
							<Stack spacing={1}>
								<Typography variant='body1'>
									<strong>Email:</strong> {customer?.email || 'N/A'}
								</Typography>
								<Typography variant='body1'>
									<strong>Mobile Number:</strong> {customer?.mobile_number || 'N/A'}
								</Typography>
								<Typography variant='body1'>
									<strong>Address:</strong> {customer?.address || 'N/A'}
								</Typography>
								<Typography variant='body1'>
									<strong>City:</strong> {customer?.city || 'N/A'}
								</Typography>
								<Typography variant='body1'>
									<strong>District:</strong> {customer?.district || 'N/A'}
								</Typography>
								<Typography variant='body1'>
									<strong>Status:</strong> {customer?.status || 'N/A'}
								</Typography>
							</Stack>
						</Grid>

						{/* Order Details */}
						<Grid item xs={12} md={6}>
							<Typography variant='h6' gutterBottom>
								Order Information
							</Typography>
							<Stack spacing={1}>
								<Typography variant='body1'>
									<strong>Order ID:</strong> {order_id}
								</Typography>
								<Typography variant='body1'>
									<strong>Order Name:</strong> {name || 'N/A'}
								</Typography>
								<Typography variant='body1'>
									<strong>Phone:</strong> {phone || 'N/A'}
								</Typography>
								<Typography variant='body1'>
									<strong>Shipping Address:</strong> {address || 'N/A'}
								</Typography>
								<Typography variant='body1'>
									<strong>City:</strong> {city || 'N/A'}
								</Typography>
								<Typography variant='body1'>
									<strong>District:</strong> {district || 'N/A'}
								</Typography>
								<Typography variant='body1'>
									<strong>Status:</strong> {status || 'N/A'}
								</Typography>
							</Stack>
						</Grid>
					</Grid>
				</Box>
			</CGModal>
		</>
	);
};

export default Customer;
