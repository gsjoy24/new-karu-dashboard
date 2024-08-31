import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { toast } from 'sonner';
import KForm from '../../../components/Form/KForm';
import KInput from '../../../components/Form/KInput';
import CGModal from '../../../components/Modal/CGModal';
import { useAddProductMutation } from '../../../redux/features/productApi';

const CreateProductModal = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const toggleModal = () => setModalOpen((prev) => !prev);
	const [addProduct, { isLoading }] = useAddProductMutation();

	const onSubmit = async (data) => {
		const toastId = toast.loading('Creating product...');
		try {
			const res = await addProduct({ ...data });
			if (res?.data?.success === true) {
				toast.success('Product created successfully', {
					id: toastId,
					duration: 2000
				});
				setModalOpen(false);
			} else {
				toast.error(res?.error?.data?.message ?? 'Something went wrong', {
					id: toastId,
					duration: 2000
				});
			}
		} catch (error) {
			toast.error('Something went wrong', { id: toastId, duration: 2000 });
		}
	};
	return (
		<>
			<Button variant='contained' onClick={toggleModal}>
				Add Product
			</Button>
			<CGModal open={modalOpen} handleClose={toggleModal}>
				<KForm onSubmit={onSubmit}>
					<KInput name='name' label='Name' />
					<KInput name='stock' label='Stock' type='number' />
					<KInput name='price' label='Price' type='number' />
					<Stack direction='row' spacing={2} mt={2}>
						<Button type='submit' variant='contained' disabled={isLoading}>
							{isLoading ? 'Creating...' : 'Create'}
						</Button>
						<Button variant='outlined' onClick={toggleModal}>
							Cancel
						</Button>
					</Stack>
				</KForm>
			</CGModal>
		</>
	);
};

export default CreateProductModal;
