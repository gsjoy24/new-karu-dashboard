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
			providesTags: (result) => {
				if (result.success) {
					const data = result.data;
					return data ? data.map((order) => ({ type: 'Order', id: order._id })) : [{ type: 'Order' }];
				}
				return [{ type: 'Order' }];
			}
		}),
		updateOrder: builder.mutation({
			query: ({ id, data }) => {
				return {
					url: `/orders/${id}`,
					method: 'PUT',
					body: data
				};
			},
			// Optimistic update
			onQueryStarted: async ({ id, data }, { dispatch, queryFulfilled }) => {
				// Update the cache optimistically
				const patchResult = dispatch(
					orderApi.util.updateQueryData('getOrders', undefined, (draft) => {
						const order = draft.data.find((order) => order._id === id);
						if (order) {
							Object.assign(order, data);
						}
					})
				);

				try {
					await queryFulfilled;
				} catch {
					// If the mutation fails, undo the optimistic update
					patchResult.undo();
				}
			},
			// Invalidates only the specific order that was updated
			invalidatesTags: (result, error, { id }) => [{ type: 'Order', id }]
		})
	})
});

export const { useGetOrdersQuery, useUpdateOrderMutation } = orderApi;
