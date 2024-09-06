import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { toast } from 'sonner';
import { useChangeUserStatusMutation } from '../../redux/features/userApi';

export default function ChangeUserStatus({ user }) {
	const [open, setOpen] = useState(false);
	const [changeUserStatus, { isLoading }] = useChangeUserStatusMutation();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleConfirm = async () => {
		try {
			const res = await changeUserStatus(user?._id);
			if (res?.data?.success) {
				handleClose();
				toast.success(res?.data?.message || 'User status changed successfully!');
			} else {
				toast.error(res?.error?.data?.message || 'something went wrong!');
			}
		} catch (error) {
			toast.error(error?.data?.message || 'something went wrong!');
		}
	};

	return (
		<>
			<Button disabled={isLoading} onClick={handleClickOpen} color={user?.status === 'active' ? 'error' : 'success'}>
				{user?.status === 'active' ? 'Block' : 'Activate'}
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'></DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to {user?.status === 'active' ? 'block' : 'activate'} {user?.full_name || 'this user'}{' '}
						?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleConfirm} disabled={isLoading} autoFocus>
						{isLoading ? 'Loading...' : 'Yes'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

// ['active', 'blocked']
