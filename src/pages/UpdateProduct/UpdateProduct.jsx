import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import KForm from '../../components/Form/KForm';
import KInput from '../../components/Form/KInput';
import KSelect from '../../components/Form/KSelect';
import TextEditor from '../../components/TextEditor';
import { useGetCategoryQuery } from '../../redux/features/categoryApi';
import { useGetProductQuery, useUpdateProductMutation } from '../../redux/features/productApi';

const UpdateProduct = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const productId = searchParams.get('id');
	const { data: product, isLoading } = useGetProductQuery(productId || '');
	const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

	const defaultValues = {
		name: product?.data?.name || '',
		serial_number: product?.data?.serial_number || '',
		stock: product?.data?.stock || '',
		old_price: product?.data?.old_price || '',
		last_price: product?.data?.last_price || '',
		category: product?.data?.category?._id || '',
		sub_category: product?.data?.sub_category?._id || '',
		tags: product?.data?.tags?.join(', ') || '',
		short_description: product?.data?.short_description || '',
		images: product?.data?.images?.join(', ') || ''
	};

	const { data: categories } = useGetCategoryQuery({});
	const categoryOptions = categories?.data?.map((category) => ({ value: category._id, label: category.name })) || [];

	const subCategoryOptions =
		categories?.data
			?.map((category) => category.subcategories)
			.flat()
			.map((subCategory) => ({ value: subCategory._id, label: subCategory.name })) || [];
	const [description, setDescription] = useState('');

	if (!product?.success) {
		return <h1 className='mt-[200px]'>Product not found</h1>;
	}

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

		const stock = parseInt(data.stock);
		const modifiedData = {
			...data,
			tags,
			images,
			old_price,
			last_price,
			stock
		};
		if (description.length > 0) {
			modifiedData.description = description;
		} else {
			modifiedData.description = product.data.description;
		}

		try {
			const response = await updateProduct({ productId, modifiedData }).unwrap();
			if (response?.success) {
				toast.success('Product updated successfully');
				navigate('/products');
			}
		} catch (error) {
			toast.error(error?.data?.message || 'Something went wrong');
		}
	};

	return isLoading ? (
		<></>
	) : (
		<Box
			sx={{
				mt: 10
			}}
		>
			<Typography variant='h3' gutterBottom>
				Update Product
			</Typography>
			<KForm onSubmit={onSubmit} defaultValues={defaultValues}>
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
				<TextEditor content={product?.data?.description || ''} setContent={setDescription} />
				<Button
					type='submit'
					variant='contained'
					color='primary'
					fullWidth
					sx={{
						my: 2
					}}
				>
					{isUpdating ? 'Loading...' : 'Update Product'}
				</Button>
			</KForm>
		</Box>
	);
};

export default UpdateProduct;
