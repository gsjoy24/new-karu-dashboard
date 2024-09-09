import { baseApi } from '../api/baseApi';

const orderApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getOrders: builder.query({
			query: () => {
				return {
					url: `/orders`,
					method: 'GET'
				};
			},
			providesTags: ['orders']
		}),
		updateOrder: builder.mutation({
			query: ({ id, data }) => {
				return {
					url: `/orders/${id}`,
					method: 'PUT',
					body: data
				};
			},
			invalidatesTags: ['orders']
		})
	})
});

export const { useGetOrdersQuery, useUpdateOrderMutation } = orderApi;
