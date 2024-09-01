import { baseApi } from '../api/baseApi';

const productApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		addProduct: builder.mutation({
			query: (data) => {
				return {
					url: `/products`,
					method: 'POST',
					body: data
				};
			},
			invalidatesTags: ['products']
		}),
		getProducts: builder.query({
			query: () => {
				return {
					url: `/products`,
					method: 'GET'
				};
			},
			providesTags: ['products']
		}),
		getProduct: builder.query({
			query: (id) => {
				return {
					url: `/products/id/${id}`,
					method: 'GET'
				};
			}
		}),
		updateProduct: builder.mutation({
			query: ({ productId, modifiedData }) => {
				return {
					url: `/products/update/${productId}`,
					method: 'PUT',
					body: modifiedData
				};
			},
			invalidatesTags: ['products']
		})
	})
});

export const { useAddProductMutation, useGetProductsQuery, useGetProductQuery, useUpdateProductMutation } = productApi;
