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
			providesTags: (result) => {
				if (result.success) {
					const data = result.data;
					return data ? [{ type: 'category', id: data.id }] : [{ type: 'category' }];
				}
				return [{ type: 'category' }];
			}
		}),
		addSubCategory: builder.mutation({
			query: (data) => {
				return {
					url: `/subcategories`,
					method: 'POST',
					body: data
				};
			},
			invalidatesTags: ['categories']
		}),
		updateCategory: builder.mutation({
			query: ({ id, data }) => {
				return {
					url: `/categories/${id}`,
					method: 'PUT',
					body: data
				};
			},
			invalidatesTags: ['categories']
		}),
		getSubCategory: builder.query({
			query: () => {
				return {
					url: `/subcategories`,
					method: 'GET'
				};
			},
			providesTags: ['sub-categories']
		}),
		updatedSubCategory: builder.mutation({
			query: ({ id, data }) => {
				return {
					url: `/subcategories/${id}`,
					method: 'PUT',
					body: data
				};
			},
			invalidatesTags: ['categories']
		})
	})
});

export const {
	useAddCategoryMutation,
	useGetCategoryQuery,
	useAddSubCategoryMutation,
	useGetSubCategoryQuery,
	useUpdateCategoryMutation,
	useUpdatedSubCategoryMutation
} = categoryApi;
