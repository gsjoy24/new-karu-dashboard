import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { toast } from 'sonner';

export default function DeleteProduct({ id }) {
	const [open, setOpen] = React.useState(false);
	// const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// const handleDelete = async () => {
	// 	try {
	// 		const res = await deleteProduct(id);
	// 		if (res?.data?.success) {
	// 			handleClose();
	// 			toast.success('Product deleted successfully!');
	// 		} else {
	// 			toast.error(res?.error?.data?.message || 'something went wrong!');
	// 		}
	// 	} catch (error) {
	// 		toast.error('something went wrong!');
	// 	}
	// };

	return (
		<React.Fragment>
			<IconButton disabled={isDeleting} onClick={handleClickOpen}>
				<DeleteIcon />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>Delete Product</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to delete this product?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleDelete} disabled={isDeleting} autoFocus>
						{isDeleting ? 'Deleting...' : 'Delete'}
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
