import { baseApi } from '../api/baseApi';

const orderApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getOrders: builder.query({
			query: ({ page, searchTerm } = { page: 1, searchTerm: '' }) => ({
				url: `/orders`,
				method: 'GET',
				params: { page, searchTerm }
			}),
			providesTags: ['Order']
		}),
		updateOrder: builder.mutation({
			query: ({ id, data }) => ({
				url: `/orders/${id}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['Order', 'dashboard']
		})
	})
});

export const { useGetOrdersQuery, useUpdateOrderMutation } = orderApi;
