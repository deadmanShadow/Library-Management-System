import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BookPayload = Omit<Book, "_id" | "createdAt" | "updatedAt">;
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    //getbooks
    getBooks: builder.query<
      { data: Book[]; total: number },
      { page: number; limit: number }
    >({
      query: ({ page = 1, limit = 10 }) => `books?page=${page}&limit=${limit}`,
      providesTags: ["Books"],
    }),

    //single get books
    getBookById: builder.query<{ data: Book }, string>({
      query: (id) => `books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Books", id }],
    }),

    //createbooks
    createBook: builder.mutation<{ data: Book }, BookPayload>({
      query: (newBook) => ({
        url: "books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    //updatebooks
    updateBook: builder.mutation<
      { data: Book },
      { id: string; book: Partial<BookPayload> }
    >({
      query: ({ id, book }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),

    //delete
    deleteBook: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    //borrowbook
    borrowBook: builder.mutation<
      { data: Book },
      { book: string; quantity: number; dueDate: string }
    >({
      query: (body) => ({
        url: "borrow",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
} = api;
