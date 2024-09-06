import { baseApi } from '../api/baseApi';

const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => {
				return {
					url: `/users`,
					method: 'GET'
				};
			},
			providesTags: ['users']
		}),
		changeUserStatus: builder.mutation({
			query: (id) => {
				return {
					url: `/users/change-status/${id}`,
					method: 'PATCH'
				};
			},
			invalidatesTags: ['users']
		})
	})
});

export const { useGetUserQuery, useChangeUserStatusMutation } = userApi;
