import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Stack,
	Typography
} from '@mui/material';
import { useState } from 'react';
import { BiShow } from 'react-icons/bi';

// OrderModal Component
const OrderModal = ({ order }) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button variant='text' onClick={() => setOpen(true)} title='View Order Details'>
				<BiShow size={20} />
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)} maxWidth='md' fullWidth>
				<DialogTitle>Order Details - {order?.order_id}</DialogTitle>
				<DialogContent dividers>
					{/* Customer Information */}
					<Box sx={{ mb: 2 }}>
						<Typography variant='h6'>Customer Information</Typography>
						<Divider sx={{ my: 1 }} />
						<Typography>Name: {order?.name}</Typography>
						<Typography>Phone: {order?.phone}</Typography>
						<Typography>Address: {order?.address}</Typography>
						<Typography>District: {order?.district}</Typography>
						<Typography>City: {order?.city}</Typography>
						<Typography>Order Note: {order?.order_note}</Typography>
						<Typography>Status: {order?.status}</Typography>
					</Box>
					Products List
					<Box sx={{ mb: 2 }}>
						<Typography variant='h6'>Products</Typography>
						<Divider sx={{ my: 1 }} />
						{order?.products.map((item) => (
							<Box key={item.product._id} sx={{ mb: 2 }}>
								<Stack direction='row' spacing={2} alignItems='center'>
									<Box
										component='img'
										src={item.product.images[0]}
										alt={item.product.name}
										sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
									/>
									<Box>
										<Typography variant='body1'>{item?.product?.name}</Typography>
										<Typography variant='body2'>SKU: {item?.product.sku}</Typography>
										<Typography variant='body2'>Quantity: {item?.quantity}</Typography>
										<Typography variant='body2'>Price: ৳ {item?.product?.last_price}</Typography>
										<Typography variant='body2'>Total: ৳ {item?.total_price}</Typography>
									</Box>
								</Stack>
							</Box>
						))}
					</Box>
					{/* Total Price */}
					<Box>
						<Typography variant='h6'>Total Price: ৳ {order?.total_price}</Typography>
					</Box>
				</DialogContent>

				{/* Modal Actions */}
				<DialogActions>
					<Button onClick={() => setOpen(false)} variant='contained' color='primary'>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default OrderModal;
