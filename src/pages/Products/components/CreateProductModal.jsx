import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import CGModal from '../../../components/Modal/CGModal';

const CreateProductModal = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [discounts, setDiscounts] = useState([]);

	const { handleSubmit, control, watch, reset } = useForm();
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
			arr = [];
		}
		setDiscounts([...new Set(arr)]);
	}, [discountWatcher]);

	const toggleModal = () => setModalOpen((prev) => !prev);
	// const [createProduct, { isLoading }] = useCreateProductMutation();

	// const onSubmit = async (data) => {
	// 	if (!discounts.length) {
	// 		toast.warning('Select discounts!');
	// 		return;
	// 	}
	// 	data.couponDiscount = discounts;
	// 	const toastId = toast.loading('Creating product...');
	// 	try {
	// 		const res = await createProduct({ ...data });
	// 		if (res?.data?.success === true) {
	// 			toast.success('Product created successfully', {
	// 				id: toastId,
	// 				duration: 2000
	// 			});
	// 			reset();
	// 			setDiscounts([]);
	// 			setModalOpen(false);
	// 		} else {
	// 			toast.error(res?.error?.data?.message ?? 'Something went wrong', {
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
			<Button variant='contained' onClick={toggleModal}>
				Create Product
			</Button>
			<CGModal open={modalOpen} handleClose={toggleModal}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box sx={{ textAlign: 'center' }}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Controller
									name='productCode'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<TextField
											{...field}
											type='text'
											label='Product Code'
											variant='outlined'
											margin='normal'
											fullWidth
										/>
									)}
								/>
							</Grid>
							<Grid item xs={6}>
								<Controller
									name='productName'
									control={control}
									defaultValue=''
									required={true}
									render={({ field }) => (
										<TextField {...field} label='Product Name' variant='outlined' margin='normal' fullWidth />
									)}
								/>
							</Grid>
							<Grid item xs={6}>
								<Controller
									name='productLink'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<TextField {...field} label='Product Link' variant='outlined' margin='normal' fullWidth />
									)}
								/>
							</Grid>
							<Grid item xs={6}>
								<Controller
									name='couponDiscount'
									control={control}
									defaultValue=''
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
								Create
							</Button>
						</Box>
					</Box>
				</form>
			</CGModal>
		</>
	);
};

export default CreateProductModal;
