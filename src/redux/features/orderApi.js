import { baseApi } from '../api/baseApi';

const orderApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getOrders: builder.query({
			query: () => ({
				url: `/orders`,
				method: 'GET'
			}),
			providesTags: (result) => {
				// Ensure robust error handling and return default tag when there's no result
				if (result?.success && Array.isArray(result.data)) {
					const data = result.data;
					return data.length ? data.map((order) => ({ type: 'Order', id: order._id })) : [{ type: 'Order' }];
				}
				// In case of failure or no result, return a generic tag
				return [{ type: 'Order' }];
			}
		}),
		updateOrder: builder.mutation({
			query: ({ id, data }) => ({
				url: `/orders/${id}`,
				method: 'PUT',
				body: data
			}),
			// Optimistic update
			onQueryStarted: async ({ id, data }, { dispatch, queryFulfilled }) => {
				// Update the cache optimistically
				const patchResult = dispatch(
					orderApi.util.updateQueryData('getOrders', undefined, (draft) => {
						// Make sure 'draft.data' exists and is an array
						if (draft.data) {
							const order = draft.data.find((order) => order._id === id);
							if (order) {
								Object.assign(order, data);
							}
						}
					})
				);

				try {
					await queryFulfilled;
				} catch (error) {
					// If the mutation fails, undo the optimistic update
					patchResult.undo();
					console.error('Update failed: ', error); // Optionally log the error
				}
			},
			// Invalidates only the specific order that was updated
			invalidatesTags: (result, error, { id }) => [{ type: 'Order', id }]
		})
	})
});

export const { useGetOrdersQuery, useUpdateOrderMutation } = orderApi;
