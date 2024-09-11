import { FormControl, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { toast } from 'sonner';
import { useUpdateOrderMutation } from '../../redux/features/orderApi';

const OrderStatus = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const UpdateOrderStatus = ({ id, defaultStatus }) => {
	const [status, setStatus] = useState(defaultStatus);
	const [updateOrder, { isLoading }] = useUpdateOrderMutation();

	const handleChange = async (event) => {
		const newStatus = event.target.value;
		setStatus(newStatus);

		try {
			const response = await updateOrder({
				id,
				data: { status: newStatus }
			}).unwrap();

			if (response?.success) {
				toast.success('Order status updated successfully');
			} else {
				toast.error(response?.message || 'Something went wrong');
			}
		} catch (error) {
			const message = error?.data?.errorSources?.map((source) => source.message).join(', ');
			toast.error(message || 'Something went wrong');
		}
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
