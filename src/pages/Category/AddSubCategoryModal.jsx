import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { toast } from 'sonner';
import KForm from '../../components/Form/KForm';
import KInput from '../../components/Form/KInput';
import CGModal from '../../components/Modal/CGModal';
import PageTitle from '../../components/Shared/PageTitle';
import { useAddSubCategoryMutation } from '../../redux/features/categoryApi';

const AddSubCategoryModal = ({ categoryId }) => {
	const [open, setOpen] = useState(false);
	const [addSubCategory, { isLoading }] = useAddSubCategoryMutation();

	const handleSubmit = async (data) => {
		try {
			const response = await addSubCategory({
				...data,
				category: categoryId
			}).unwrap();

			console.log({ response });

			if (response?.success) {
				setOpen(false);
				toast.success('New Subcategory added successfully');
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
			<Button variant='contained' onClick={() => setOpen(true)}>
				Add Sub Category
			</Button>
			<CGModal open={open} handleClose={() => setOpen(false)}>
				<PageTitle title='Add Sub Category' />
				<br />
				<KForm onSubmit={handleSubmit}>
					<KInput label='Name' name='name' />
					<KInput label='Description' name='description' multiline rows={3} />
					<Stack direction='row' justifyContent='flex-end'>
						<Button type='submit' variant='contained' disabled={isLoading}>
							{isLoading ? 'Adding...' : 'Add'}
						</Button>
					</Stack>
				</KForm>
			</CGModal>
		</>
	);
};

export default AddSubCategoryModal;
