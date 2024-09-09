import {
	Box,
	Paper,
	Skeleton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';
import PageTitle from '../../components/Shared/PageTitle';
import { useGetCategoryQuery } from '../../redux/features/categoryApi';
import AddCategoryModal from './AddCategoryModal';
import SubCategories from './SubCategories';
import UpdateCategoryModal from './UpdateCategoryModal';

const tableHeadings = ['#', 'Name', 'Description', 'Sub Categories', 'Actions'];

const Categories = () => {
	const { data, isFetching } = useGetCategoryQuery();
	return (
		<Box
			sx={{
				mt: 10,
				width: { xs: '320px', sm: '700px', md: '100%', lg: '100%' },
				mx: 'auto'
			}}
		>
			<Stack direction='row' justifyContent='space-between' alignItems='center'>
				<PageTitle title='Categories' />
				<AddCategoryModal />
			</Stack>
			<TableContainer component={Paper} sx={{ my: 3, borderRadius: 5 }}>
				{!isFetching ? (
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
							{data?.data?.map((category, index) => (
								<TableRow key={category._id}>
									<TableCell align='center'>{index + 1}</TableCell>
									<TableCell align='center'>{category?.name}</TableCell>
									<TableCell
										align='center'
										sx={{
											maxWidth: '200px',
											overflow: 'hidden'
										}}
									>
										{category?.description}
									</TableCell>
									<TableCell align='center'>
										<SubCategories category={category} />
									</TableCell>
									<TableCell align='center'>
										<UpdateCategoryModal category={category} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<Skeleton variant='rectangular' width='100%' height={300} />
				)}
			</TableContainer>
		</Box>
	);
};

export default Categories;
