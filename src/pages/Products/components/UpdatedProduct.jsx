/* eslint-disable no-mixed-spaces-and-tabs */
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import CGModal from '../../../components/Modal/CGModal';
// import { useUpdateProductMutation } from '../../../redux/features/product/productApi';

const UpdatedProduct = ({ product }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [discounts, setDiscounts] = useState(product?.couponDiscount || []);
	const defaultCouponDiscount = product?.couponDiscount?.join(', ') || '';
	const { handleSubmit, control, reset, register, watch } = useForm();
	const discountWatcher = watch('couponDiscount', '');
	useEffect(() => {
		let arr;
		if (discountWatcher?.length) {
			arr = discountWatcher
				?.split(',')
				.map((number) => number.trim())
				.flatMap((number) => number.split(/\s+/))
				.filter((number) => number !== '')
				.filter((value, index, self) => self.indexOf(value) === index);
		} else {
			arr = product?.couponDiscount || [];
		}
		setDiscounts([...new Set(arr)]);
	}, [discountWatcher, product]);
	const toggleModal = () => setModalOpen((prev) => !prev);

	// const [updateProduct, { isLoading }] = useUpdateProductMutation();

	// const onSubmit = async (data) => {
	// 	data.couponDiscount = discounts;
	// 	const toastId = toast.loading('Updating product...');
	// 	try {
	// 		const res = await updateProduct({ id: product._id, data });
	// 		if (res?.data?.success === true) {
	// 			toast.success('Product updated successfully', {
	// 				id: toastId,
	// 				duration: 2000
	// 			});
	// 			reset();
	// 			setModalOpen(false);
	// 		} else {
	// 			toast.error(res?.error?.data?.message ?? 'Something went wrong!', {
	// 				id: toastId,
	// 				duration: 2000
	// 			});
	// 		}
	// 	} catch (error) {
	// 		toast.error('Something went wrong', { id: toastId, duration: 2000 });
	// 	}
	// };

	return (
		<>
			<IconButton onClick={toggleModal}>
				<EditIcon />
			</IconButton>
			<CGModal open={modalOpen} handleClose={toggleModal}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField
								defaultValue={product?.productCode}
								{...register('productCode')}
								type='text'
								label='Product Code'
								variant='outlined'
								margin='normal'
								fullWidth
								required
							></TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField
								defaultValue={product?.productName || ''}
								{...register('productName')}
								type='text'
								label='Product Name'
								variant='outlined'
								margin='normal'
								fullWidth
								required
							></TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField
								defaultValue={product?.productLink || ''}
								{...register('productLink')}
								type='text'
								label='Product Link'
								variant='outlined'
								margin='normal'
								fullWidth
								required
							></TextField>
						</Grid>
						<Grid item xs={6}>
							<Controller
								name='couponDiscount'
								control={control}
								defaultValue={defaultCouponDiscount}
								required={true}
								render={({ field }) => (
									<TextField {...field} label='Coupon Discount' variant='outlined' margin='normal' fullWidth />
								)}
							/>

							{discounts?.length > 0 ? (
								<Stack direction='row' gap={1}>
									{discounts?.map((dis) => (
										<Chip key={dis} label={dis} />
									))}
								</Stack>
							) : (
								<Typography variant='body2' textAlign='left'>
									Enter all coupon discounts and separate them with a comma. (100, 200)
								</Typography>
							)}
						</Grid>
					</Grid>
					<Box mt={2} sx={{ textAlign: 'center' }}>
						<Button variant='contained' type='submit' disabled={isLoading}>
							Update
						</Button>
					</Box>
				</form>
			</CGModal>
		</>
	);
};

export default UpdatedProduct;
