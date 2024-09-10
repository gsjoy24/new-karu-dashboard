import { Box, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/Shared/PageTitle';
import { useGetOrdersQuery } from '../../redux/features/orderApi';
import Customer from './Customer';
import UpdateOrderStatus from './UpdateOrderStatus';

const tableHeadings = ['#', 'Order ID', 'Customer', 'Products', 'Status'];

const Orders = () => {
	const { data, isFetching } = useGetOrdersQuery({});
	return (
		<Box
			sx={{
				mt: 10,
				width: { xs: '320px', sm: '700px', md: '100%', lg: '100%' },
				mx: 'auto'
			}}
		>
			<PageTitle title='Orders' />
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
							{data?.data?.map((order, index) => (
								<TableRow key={order._id}>
									<TableCell align='center'>{index + 1}</TableCell>
									<TableCell align='center'>{order?.order_id}</TableCell>
									<TableCell align='center'>
										<Customer orderData={order} />
									</TableCell>
									<TableCell align='center'>
										{order?.products?.map((product) => (
											<Box
												sx={{
													borderBottom: '1px solid #ccc',
													width: 'fit-content',
													margin: '0 auto',
													padding: '3px'
												}}
												key={product.product._id}
											>
												<Link target='_blank' to={`https://karukon.vercel.app/product/${product?.product?.slug}`}>
													{product.product.name}
												</Link>
											</Box>
										))}
									</TableCell>
									<TableCell
										align='center'
										sx={{
											maxWidth: '100px'
										}}
									>
										<UpdateOrderStatus id={order?._id} defaultStatus={order?.status} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<Skeleton variant='rectangular' height={200} />
				)}
			</TableContainer>
		</Box>
	);
};

export default Orders;

// {
//             "_id": "66dee844f4d88f9beb6f23da",
//             "order_id": "Covln0909",
//             "customer": {
//                 "_id": "66d314e25fd0be946695c77c",
//                 "name": {
//                     "firstName": "Gour",
//                     "lastName": "Saha"
//                 },
//                 "email": "goursaha307@gmail.com",
//                 "role": "user",
//                 "isEmailConfirmed": true,
//                 "status": "active",
//                 "cart": [],
//                 "createdAt": "2024-08-31T13:04:34.132Z",
//                 "updatedAt": "2024-09-09T12:21:24.309Z",
//                 "__v": 3,
//                 "address": "Eiusmod alias modi b",
//                 "city": "Daks",
//                 "district": "asas",
//                 "mobile_number": "01722222222",
//                 "total_cart_items": 0,
//                 "full_name": "Gour Saha",
//                 "id": "66d314e25fd0be946695c77c"
//             },
//             "name": "Gour Chandra Saha",
//             "phone": "01772528866",
//             "address": "sdfcsd",
//             "district": "csdc df",
//             "city": "dfdf df",
//             "status": "pending",
//             "createdAt": "2024-09-09T12:21:24.272Z",
//             "updatedAt": "2024-09-09T12:21:24.272Z",
//             "id": "66dee844f4d88f9beb6f23da"
//         }
