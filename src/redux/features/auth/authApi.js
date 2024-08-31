import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => {
				return {
					url: `/admins/auth/login`,
					method: 'POST',
					body: data
				};
			}
		})
	})
});

export const { useLoginMutation } = authApi;
