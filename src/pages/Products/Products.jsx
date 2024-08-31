import {
	Box,
	Pagination,
	Paper,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { useGetProductsQuery } from '../../redux/features/productApi';
import CreateProductModal from './components/CreateProductModal';
// import DeleteProduct from './components/DeleteProduct';
// import UpdatedProduct from './components/UpdatedProduct';

const Products = () => {
	const [page, setPage] = useState(1);
	const query = {};
	if (page) {
		query['page'] = page;
	}
	const { data, isFetching } = useGetProductsQuery(query);

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const tableHeadings = ['#', 'Name', 'Stock', 'Price', 'Actions'];

	return (
		<Box
			sx={{
				mt: 10,
				width: { xs: '320px', sm: '700px', md: '100%', lg: '100%' },
				mx: 'auto'
			}}
		>
			<Stack direction='row' justifyContent='space-between' alignItems='center'>
				<Typography variant='h4' sx={{ mt: 2 }}>
					Product List
				</Typography>
				<CreateProductModal />
			</Stack>

			<TableContainer component={Paper} sx={{ my: 3, borderRadius: 5 }}>
				{isFetching ? (
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
							{[...Array(10)].map((_, index) => (
								<TableRow key={index}>
									{[...Array(7)].map((_, index) => (
										<TableCell key={index} align='center'>
											<Skeleton variant='text' />
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
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
							{data?.data?.map((product, index) => (
								<TableRow key={product._id}>
									<TableCell
										align='center'
										component='th'
										scope='row'
										sx={{ fontSize: '16px', fontWeight: 'semibold' }}
									>
										{index + 1}
									</TableCell>
									<TableCell
										align='center'
										component='th'
										scope='row'
										sx={{ fontSize: '16px', fontWeight: 'semibold' }}
									>
										{product?.name}
									</TableCell>
									<TableCell align='center' sx={{ fontSize: '16px', fontWeight: 'semibold' }}>
										{product?.stock}
									</TableCell>
									<TableCell
										align='center'
										sx={{
											fontSize: '16px',
											fontWeight: 'semibold',
											color: '#000'
										}}
									>
										{product?.last_price}
									</TableCell>
									<TableCell align='center'>
										<Stack direction='row' spacing={1}>
											{/* <UpdatedProduct product={product} />
											<DeleteProduct id={product._id} /> */}
										</Stack>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</TableContainer>

			{data?.meta && (
				<Box display='flex' justifyContent='center' sx={{ my: 3 }}>
					<Pagination
						count={data?.meta?.totalPage}
						page={page}
						onChange={handlePageChange}
						color='primary'
						size='large'
					/>
				</Box>
			)}
		</Box>
	);
};

export default Products;
