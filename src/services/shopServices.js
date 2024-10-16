import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { realtime_database_url } from "../database/fireConfig";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: realtime_database_url }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories.json`,
    }),
    getProducts: builder.query({
      query: () => `products.json`,
    }),
    getProductsByCategory: builder.query({
      query: (category) =>
        `products.json?orderBy="category"&equalTo="${category}"`,
      transformResponse: (response) => {
        const productsTransformed = Object.values(response);
        return productsTransformed;
      },
    }),
    getProductById: builder.query({
      query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
      transformResponse: (response) => {
        const productTransformed = Object.values(response).pop();
        return productTransformed;
      },
    }),
    getOrdersByUser: builder.query({
      query: (user) => `orders.json`,
      transformResponse: (response, meta, param) => {
        response = Object.values(response);
        const productsFiltered = response.filter((e) => e.user === param);
        return productsFiltered;
      },
    }),
    postCart: builder.mutation({
      query: (order) => ({
        url: `orders.json`,
        method: `POST`,
        body: order,
      }),
    }),
    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
    }),
    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: "PUT",
        body: { image: image },
      }),
    }),
    getProfileLocation: builder.query({
      query: (localId) => `profileLocation/${localId}.json`,
    }),
    postProfileLocation: builder.mutation({
      query: ({ location, localId }) => ({
        url: `profileLocation/${localId}.json`,
        method: "PUT",
        body: { location: location },
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  usePostCartMutation,
  useGetProfileImageQuery,
  usePostProfileImageMutation,
  useGetProfileLocationQuery,
  usePostProfileLocationMutation,
  useGetOrdersByUserQuery,
} = shopApi;
