import {
	Box,
	Chip,
	Paper,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';
import PageTitle from '../../components/Shared/PageTitle';
import { useGetUserQuery } from '../../redux/features/userApi';
import ChangeUserStatus from './ChangeUserStatus';

const Users = () => {
	const tableHeadings = ['#', 'Name', 'Email', 'Status', 'Created At', 'Actions'];
	const { data, isFetching } = useGetUserQuery({});
	return (
		<Box
			sx={{
				mt: 10,
				width: { xs: '320px', sm: '700px', md: '100%', lg: '100%' },
				mx: 'auto'
			}}
		>
			<PageTitle title='Users' />

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
									<TableCell align='center'>{user?.full_name}</TableCell>
									<TableCell align='center'>{user?.email}</TableCell>
									<TableCell align='center'>
										<Chip label={user?.status} color={user?.status === 'active' ? 'success' : 'error'} />
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
		</Box>
	);
};

export default Users;
