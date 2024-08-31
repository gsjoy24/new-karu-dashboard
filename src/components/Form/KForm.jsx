import { FormProvider, useForm } from 'react-hook-form';

const KForm = ({ children, onSubmit, defaultValues, styleClasses }) => {
	const formConfig = {};

	if (defaultValues) {
		formConfig['defaultValues'] = defaultValues;
	}

	const methods = useForm(formConfig);
	const { handleSubmit } = methods;
	const submit = (data) => {
		onSubmit(data);
	};
	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(submit)} className={styleClasses}>
				{children}
			</form>
		</FormProvider>
	);
};

export default KForm;
