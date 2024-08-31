import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
	Box,
	Chip,
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
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import CreateProductModal from './components/CreateProductModal';
import DeleteProduct from './components/DeleteProduct';
import UpdatedProduct from './components/UpdatedProduct';

const Products = () => {
	const [page, setPage] = useState(1);
	const query = {};
	if (page) {
		query['page'] = page;
	}
	const data = [];

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const tableHeadings = ['#', 'Product Code', 'Product Name', 'Product Link', 'Discounts', 'Calls'];
	const loggedUser = useSelector(selectCurrentUser);

	loggedUser?.role === 'super_admin' && tableHeadings.push('Actions');

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
				{loggedUser?.role === 'super_admin' && <CreateProductModal />}
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
							{products?.data?.map((product, index) => (
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
										{product?.productCode}
									</TableCell>
									<TableCell align='center' sx={{ fontSize: '16px', fontWeight: 'semibold' }}>
										{product?.productName}
									</TableCell>
									<TableCell
										align='center'
										sx={{
											fontSize: '16px',
											fontWeight: 'semibold',
											color: '#000'
										}}
									>
										<Link to={product?.productLink}>
											<OpenInNewIcon
												style={{
													color: '#555'
												}}
											/>
										</Link>
									</TableCell>
									<TableCell align='center' sx={{ fontSize: '16px', fontWeight: 'semibold' }}>
										{product?.couponDiscount?.map((dis) => (
											<Chip
												key={dis}
												label={dis}
												sx={{
													m: '2px'
												}}
											/>
										))}
									</TableCell>
									<TableCell align='center' sx={{ fontSize: '16px', fontWeight: 'semibold' }}>
										d
									</TableCell>
									{loggedUser?.role === 'super_admin' && (
										<TableCell align='center' sx={{ fontSize: '16px', fontWeight: 'semibold' }}>
											<UpdatedProduct product={product} />
											<DeleteProduct id={product._id} />
										</TableCell>
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</TableContainer>
			{products?.meta && (
				<Box display='flex' justifyContent='center' sx={{ my: 3 }}>
					<Pagination
						count={products?.meta?.totalPage}
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
