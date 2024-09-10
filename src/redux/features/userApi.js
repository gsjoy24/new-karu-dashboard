import { baseApi } from '../api/baseApi';

const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => ({
				url: `/users`,
				method: 'GET'
			}),
			providesTags: (result) =>
				result?.data ? result.data.map(({ _id }) => ({ type: 'User', id: _id })) : [{ type: 'User', id: 'LIST' }]
		}),
		changeUserStatus: builder.mutation({
			query: (id) => ({
				url: `/users/change-status/${id}`,
				method: 'PATCH'
			}),
			invalidatesTags: (result, error, id) => [{ type: 'User', id }]
		})
	})
});

export const { useGetUserQuery, useChangeUserStatusMutation } = userApi;
