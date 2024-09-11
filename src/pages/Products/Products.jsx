import {
	Box,
	Button,
	IconButton,
	Pagination,
	Paper,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField
} from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/Shared/PageTitle';
import { useGetProductsQuery } from '../../redux/features/productApi';

const Products = () => {
	// State for pagination and search
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const handlePageChange = (_, value) => {
		setPage(value);
	};
	const handleSearchChange = (event) => {
		// set one second delay to avoid multiple API calls
		setTimeout(() => {
			setSearchTerm(event.target.value);
			setPage(1);
		}, 1000);
	};

	const { data, isFetching } = useGetProductsQuery({
		page,
		searchTerm
	});

	const tableHeadings = ['#', 'Name', 'Stock', 'Price', 'Actions'];

	return (
		<Box
			sx={{
				mt: 10,
				width: { xs: '320px', sm: '700px', md: '100%', lg: '100%' },
				mx: 'auto'
			}}
		>
			<Stack direction='row' justifyContent='space-between' alignItems='center' flexWrap='wrap' gap={2}>
				<PageTitle title='Products' />
				{/* Search Field */}
				<TextField
					sx={{
						maxWidth: '400px'
					}}
					label='Search Orders'
					variant='outlined'
					fullWidth
					onChange={handleSearchChange}
					placeholder='Search by Order ID or Customer Name'
				/>
				<Button component={Link} to='/add-product' variant='contained'>
					Add Product
				</Button>
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
										<IconButton component={Link} to={`/update-product?id=${product._id}`}>
											<FaRegPenToSquare />
										</IconButton>
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
						count={data?.meta?.totalPages}
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
