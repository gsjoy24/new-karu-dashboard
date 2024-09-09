import { FormControl, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useUpdateOrderMutation } from '../../redux/features/orderApi';

const OrderStatus = ['pending', 'processing', 'shipped', 'delivered'];

const UpdateOrderStatus = ({ defaultStatus }) => {
	const [status, setStatus] = useState(defaultStatus);
	const [updateOrder, { isLoading }] = useUpdateOrderMutation();

	const handleChange = (event) => {
		const newStatus = event.target.value;
		setStatus(newStatus);
		console.log('Selected Status:', newStatus);
	};

	return (
		<FormControl fullWidth variant='outlined'>
			<Select
				value={status}
				disabled={isLoading}
				onChange={handleChange}
				sx={{
					'& .MuiSelect-select': { padding: 1 },
					'& .MuiSelect-icon': { top: 'calc(50% - 12px)' },
					'& .MuiSelect-outlined': { borderRadius: 5 }
				}}
			>
				{OrderStatus.map((status) => (
					<MenuItem key={status} value={status}>
						{status.charAt(0).toUpperCase() + status.slice(1)}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default UpdateOrderStatus;
