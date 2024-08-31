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
			}
		}),
		getProducts: builder.query({
			query: () => {
				return {
					url: `/products`,
					method: 'GET'
				};
			}
		})
	})
});

export const { useAddProductMutation, useGetProductsQuery } = productApi;
