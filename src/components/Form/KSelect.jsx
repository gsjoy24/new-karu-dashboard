import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { CiWarning } from 'react-icons/ci';

const KSelect = ({ label, options, name, sx }) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<FormControl sx={sx ? { ...sx } : { width: '100%', mb: '5px' }} disabled={!options}>
					<p>{label}</p>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						{...field}
						disabled={[...options]?.length ? false : true}
						placeholder={label}
						variant='outlined'
						size='small'
						value={field.value || ''}
						error={!!error?.message}
					>
						{options?.map((option) => (
							<MenuItem key={option?.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
					{error?.message && (
						<FormHelperText>
							{
								<span className='flex items-center gap-1 relative right-3 text-red-600'>
									<CiWarning size={16} /> {error?.message}
								</span>
							}
						</FormHelperText>
					)}
				</FormControl>
			)}
		/>
	);
};

export default KSelect;
