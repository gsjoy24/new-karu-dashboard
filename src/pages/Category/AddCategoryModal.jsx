import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { toast } from 'sonner';
import KForm from '../../components/Form/KForm';
import KInput from '../../components/Form/KInput';
import CGModal from '../../components/Modal/CGModal';
import PageTitle from '../../components/Shared/PageTitle';
import { useAddCategoryMutation } from '../../redux/features/categoryApi';

const AddCategoryModal = () => {
	const [open, setOpen] = useState(false);
	const [addCategory, { isLoading }] = useAddCategoryMutation();

	const handleSubmit = async (data) => {
		try {
			const response = await addCategory(data).unwrap();
			if (response?.success) {
				setOpen(false);
				toast.success('Category added successfully');
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
				Add Category
			</Button>
			<CGModal open={open} handleClose={() => setOpen(false)}>
				<PageTitle title='Add Category' />
				<br />
				<KForm onSubmit={handleSubmit}>
					<KInput label='Name' name='name' />
					<KInput label='Description' name='description' multiline rows={3} />
					<KInput label='Image' name='image' />
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

export default AddCategoryModal;
