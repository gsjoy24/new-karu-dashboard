import { baseApi } from '../api/baseApi';

const orderApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getOrders: builder.query({
			query: () => ({
				url: `/orders`,
				method: 'GET'
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
