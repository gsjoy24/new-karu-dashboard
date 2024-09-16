import { Box, Button, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import CGModal from '../../components/Modal/CGModal';

const NoteModal = ({ orderData }) => {
	const [open, setOpen] = useState(false);
	const { name, order_note } = orderData;
	return (
		<>
			<Button variant='text' onClick={() => setOpen(true)} title='View Customer Note'>
				Note
			</Button>
			<CGModal open={open} handleClose={() => setOpen(false)}>
				<Box sx={{ padding: 4 }}>
					<Typography variant='h4' gutterBottom align='center'>
						Order note for {name}
					</Typography>
					<Divider sx={{ mb: 3 }} />

					<Typography variant='body1' gutterBottom align='center'>
						{order_note}
					</Typography>
				</Box>
			</CGModal>
		</>
	);
};

export default NoteModal;
