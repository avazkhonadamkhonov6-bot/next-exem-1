import { IResponse, IData } from "@/types/todo"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const url = "https://to-dos-api.softclub.tj/api/to-dos"

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://to-dos-api.softclub.tj/api/" }),
  tagTypes: ["Todo", "TodoById"],
  endpoints: (build) => ({
    getTodo: build.query<IResponse<IData[]>, void>({
      query: () => `to-dos`,
      providesTags: ["Todo"],
    }),

    getTodoByid: build.query<IResponse<IData>, string | number | undefined>({
      query: (id) => `to-dos/${id}`,
      providesTags: ["TodoById"],
    }),

    deleteTodo: build.mutation<IResponse<boolean>, number>({
      query: (id: number) => ({
        url: `to-dos?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),

    addTodo: build.mutation<IResponse<number>, FormData>({
      query: (formData: FormData) => ({
        url: `to-dos`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Todo"],
    }),

    editTodo: build.mutation<IResponse<number>, { id: number; name: string; description: string }>({
      query: (body) => ({
        url: `to-dos`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Todo"],
    }),

    addImg: build.mutation<IResponse<string>, { todoId: number; formData: FormData }>({
      query: ({ todoId, formData }) => ({
        url: `to-dos/${todoId}/images`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Todo"],
    }),

    deleteImg: build.mutation<IResponse<string>, number>({
      query: (imageId: number) => ({
        url: `to-dos/images/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTodoQuery,
  useDeleteTodoMutation,
  useAddTodoMutation,
  useEditTodoMutation,
  useAddImgMutation,
  useDeleteImgMutation,
  useGetTodoByidQuery
} = todoApi

export const AddUSer = (user: unknown) => ({ type: "users/add", payload: user })
export const EditUSer = (user: unknown) => ({ type: "users/edit", payload: user })
