import { baseApi } from '../api/baseApi';

const categoryApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		addCategory: builder.mutation({
			query: (data) => {
				return {
					url: `/categories`,
					method: 'POST',
					body: data
				};
			},
			invalidatesTags: ['categories']
		}),
		getCategory: builder.query({
			query: () => {
				return {
					url: `/categories`,
					method: 'GET'
				};
			},
			providesTags: ['categories']
		}),
		addSubCategory: builder.mutation({
			query: (data) => {
				return {
					url: `/subcategories`,
					method: 'POST',
					body: data
				};
			},
			invalidatesTags: ['sub-categories']
		}),
		getSubCategory: builder.query({
			query: () => {
				return {
					url: `/subcategories`,
					method: 'GET'
				};
			},
			providesTags: ['sub-categories']
		})
	})
});

export const { useAddCategoryMutation, useGetCategoryQuery, useAddSubCategoryMutation, useGetSubCategoryQuery } =
	categoryApi;
