import {
	Box,
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import { useState } from 'react';
import CGModal from '../../components/Modal/CGModal';
import PageTitle from '../../components/Shared/PageTitle';
import AddCategoryModal from './AddCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';

const tableHeadings = ['#', 'Name', 'Description', 'Actions'];

const SubCategories = ({ category }) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>SEE</Button>
			<CGModal open={open} handleClose={() => setOpen(false)}>
				<Box
					sx={{
						mt: 10,
						width: { xs: '320px', sm: '700px', md: '100%', lg: '100%' },
						mx: 'auto'
					}}
				>
					<Stack direction='row' justifyContent='space-between' alignItems='center'>
						<PageTitle
							title={
								category?.subcategories?.length
									? `Subcategories of ${category?.name}`
									: `No subcategories found for ${category?.name}`
							}
						/>
						<AddCategoryModal />
					</Stack>
					<TableContainer component={Paper} sx={{ my: 3, borderRadius: 5 }}>
						{category?.subcategories?.length ? (
							<Table sx={{ minWidth: 650 }} size='medium' aria-label='a dense table'>
								<TableHead>
									<TableRow>
										{tableHeadings.map((heading) => (
											<TableCell key={heading} align='center' sx={{ fontSize: '20px', fontWeight: 'semibold' }}>
												{heading}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{category?.subcategories?.map((subcategory, index) => (
										<TableRow key={subcategory._id}>
											<TableCell align='center'>{index + 1}</TableCell>
											<TableCell align='center'>{category?.name}</TableCell>
											<TableCell
												align='center'
												sx={{
													maxWidth: '200px',
													overflow: 'hidden'
												}}
											>
												{subcategory?.description}
											</TableCell>
											<TableCell align='center'>
												<UpdateCategoryModal category={category} />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						) : (
							<Typography sx={{ p: 2, textAlign: 'center' }}>No subcategories found.</Typography>
						)}
					</TableContainer>
				</Box>
			</CGModal>
		</>
	);
};

export default SubCategories;
