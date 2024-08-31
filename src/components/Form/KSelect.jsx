import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { CiWarning } from 'react-icons/ci';

const KSelect = ({ label, options, name, sx }) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<FormControl sx={sx ? { ...sx } : { width: '100%' }} disabled={!options}>
					<InputLabel id='demo-select-small-label'>{label}</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						{...field}
						label={label}
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
