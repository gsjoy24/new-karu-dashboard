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
			invalidatesTags: ['products', 'dashboard']
		}),
		getProducts: builder.query({
			query: (
				{ page, searchTerm } = {
					page: 1,
					searchTerm: ''
				}
			) => {
				return {
					url: `/products`,
					method: 'GET',
					params: {
						page,
						searchTerm
					}
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
			},
			providesTags: (result, error, id) => [{ type: 'products', id }]
		}),
		updateProduct: builder.mutation({
			query: ({ productId, modifiedData }) => {
				return {
					url: `/products/update/${productId}`,
					method: 'PUT',
					body: modifiedData
				};
			},
			invalidatesTags: (result, error, { productId }) => [{ type: 'products', id: productId }, 'products']
		})
	})
});

export const { useAddProductMutation, useGetProductsQuery, useGetProductQuery, useUpdateProductMutation } = productApi;
