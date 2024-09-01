import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import KForm from '../../components/Form/KForm';
import KInput from '../../components/Form/KInput';
import KSelect from '../../components/Form/KSelect';
import TextEditor from '../../components/TextEditor';
import { useGetCategoryQuery } from '../../redux/features/categoryApi';
import { useAddProductMutation } from '../../redux/features/productApi';

const AddProduct = () => {
	const navigate = useNavigate();
	const { data: categories } = useGetCategoryQuery({});
	const categoryOptions = categories?.data?.map((category) => ({ value: category._id, label: category.name })) || [];

	const subCategoryOptions =
		categories?.data
			?.map((category) => category.subcategories)
			.flat()
			.map((subCategory) => ({ value: subCategory._id, label: subCategory.name })) || [];
	const [description, setDescription] = useState('');

	const [addProduct, { isLoading }] = useAddProductMutation();

	const onSubmit = async (data) => {
		const tags = data.tags.split(',').map((tag) => tag.trim());
		const images = data.images.split(',').map((image) => image.trim());
		const old_price = parseFloat(data.old_price);
		const last_price = parseFloat(data.last_price);
		// new price should be less than old price
		if (last_price >= old_price) {
			toast.error('New price should be less than old price');
			return;
		}
		if (description === '') {
			toast.error('Description is required');
			return;
		}
		const stock = parseInt(data.stock);
		const modifiedData = {
			...data,
			tags,
			images,
			old_price,
			last_price,
			stock,
			description
		};

		try {
			const response = await addProduct(modifiedData).unwrap();
			console.log({ response });
			if (response?.success) {
				toast.success('Product added successfully');
				navigate('/products');
			}
		} catch (error) {
			toast.error(error?.data?.message || 'Something went wrong');
		}
	};
	return (
		<Box
			sx={{
				mt: 10
			}}
		>
			<Typography variant='h3' gutterBottom>
				Add Product
			</Typography>
			<KForm onSubmit={onSubmit}>
				<Stack direction={{ xs: 'column', sm: 'row' }} gap={1} sx={{ width: '100%' }}>
					<KInput name='name' label='Name' />
					<KInput name='serial_number' label='Serial Number' />
				</Stack>

				<Stack direction={{ xs: 'column', sm: 'row' }} gap={1} sx={{ width: '100%' }}>
					<KInput name='stock' label='Stock' type='number' />
					<KInput name='old_price' label='Old Price' type='number' />
					<KInput name='last_price' label='New Price' type='number' />
				</Stack>
				<Stack direction={{ xs: 'column', sm: 'row' }} gap={1} sx={{ width: '100%' }}>
					<KSelect name='category' label='Category' options={categoryOptions} />
					<KSelect name='sub_category' label='Sub Category' options={subCategoryOptions} />
				</Stack>
				<KInput name='tags' label='Tags' />
				<KInput name='short_description' label='Short Description' multiline />
				<KInput name='images' label='Images' multiline />
				<br />
				<TextEditor content={description} setContent={setDescription} />
				<Button
					type='submit'
					variant='contained'
					color='primary'
					fullWidth
					sx={{
						my: 2
					}}
				>
					{isLoading ? 'Loading...' : 'Add Product'}
				</Button>
			</KForm>
		</Box>
	);
};

export default AddProduct;
