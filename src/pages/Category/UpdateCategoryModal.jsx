import { Button, IconButton, Stack } from '@mui/material';
import { useState } from 'react';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { toast } from 'sonner';
import KForm from '../../components/Form/KForm';
import KInput from '../../components/Form/KInput';
import CGModal from '../../components/Modal/CGModal';
import PageTitle from '../../components/Shared/PageTitle';
import { useUpdateCategoryMutation } from '../../redux/features/categoryApi';

const UpdateCategoryModal = ({ category }) => {
	const [open, setOpen] = useState(false);
	const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
	const defaultValues = {
		name: category?.name || '',
		description: category?.description || '',
		image: category?.image || ''
	};

	const handleSubmit = async (data) => {
		try {
			const response = await updateCategory({
				id: category._id,
				data
			}).unwrap();
			console.log(response);
			if (response?.success) {
				setOpen(false);
				toast.success('Category updated successfully');
			} else {
				toast.error(response?.message || 'Something went wrong');
			}
		} catch (error) {
			const message = error?.data?.errorSources?.map((source) => source.message).join(', ');
			toast.error(message || 'Something went wrong');
		}
	};

	return (
		<>
			<IconButton onClick={() => setOpen(true)}>
				<FaRegPenToSquare />
			</IconButton>
			<CGModal open={open} handleClose={() => setOpen(false)}>
				<PageTitle title='Update Category' />
				<br />
				<KForm onSubmit={handleSubmit} defaultValues={defaultValues}>
					<KInput label='Name' name='name' />
					<KInput label='Description' name='description' multiline rows={3} />
					<KInput label='Image' name='image' />
					<Stack direction='row' justifyContent='flex-end'>
						<Button type='submit' variant='contained' disabled={isLoading}>
							{isLoading ? 'Updating...' : 'Update'}
						</Button>
					</Stack>
				</KForm>
			</CGModal>
		</>
	);
};

export default UpdateCategoryModal;
