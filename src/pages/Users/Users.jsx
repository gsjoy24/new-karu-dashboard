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
	TextField
} from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import PageTitle from '../../components/Shared/PageTitle';
import { useGetUserQuery } from '../../redux/features/userApi';
import ChangeUserStatus from './ChangeUserStatus';

const Users = () => {
	const tableHeadings = ['#', 'Name', 'Email', 'Status', 'Created At', 'Actions'];
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const { data, isFetching } = useGetUserQuery({
		page,
		searchTerm
	});
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
	return (
		<Box
			sx={{
				mt: 10,
				width: { xs: '320px', sm: '700px', md: '100%', lg: '100%' },
				mx: 'auto'
			}}
		>
			<Stack
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
					flexDirection: { xs: 'column', sm: 'row' },
					gap: 2
				}}
			>
				<PageTitle title='Users' />
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
			</Stack>

			<TableContainer component={Paper} sx={{ my: 3, borderRadius: 5 }}>
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
					{isFetching ? (
						<TableBody>
							{[...Array(10)].map((_, index) => (
								<TableRow key={index}>
									{[...Array(6)].map((_, index) => (
										<TableCell key={index} align='center'>
											<Skeleton variant='text' />
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					) : (
						<TableBody>
							{data?.data?.map((user, index) => (
								<TableRow key={user?._id}>
									<TableCell align='center'>{index + 1}</TableCell>
									<TableCell align='center'>{user?.name}</TableCell>

									<TableCell align='center'>{user?.email}</TableCell>
									<TableCell align='center'>
										<Chip
											label={user?.status}
											color={user?.status === 'active' ? 'success' : 'error'}
											className='uppercase'
										/>
									</TableCell>
									<TableCell align='center'>{user?.createdAt.split('T')[0]}</TableCell>
									<TableCell align='center'>
										<ChangeUserStatus user={user} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					)}
				</Table>
			</TableContainer>
			{/* Pagination Component */}
			{data?.meta?.totalPages > 1 && (
				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
					<Pagination count={data.meta.totalPages} page={page} onChange={handlePageChange} color='primary' />
				</Box>
			)}
		</Box>
	);
};

export default Users;
