import { privateAxios } from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const fetchBlogs = async () => {
    const { data } = await privateAxios("/web-infro/all-blogs");
    return data;
}

const createBlog = async ({ payload }: { payload: any }) => {
    const { data } = await privateAxios.post(`/web-infro/create`, payload);
    return data;
};

const editBlog = async ({ id, payload }: { id: string, payload: any }) => {
    const { data } = await privateAxios.patch(`/web-infrom/update/${id}`, payload);
    return data;
}

const deleteBlog = async (id: string) => {
    const { data } = await privateAxios.delete(`/web-infro/remove/${id}`);
    return data;
}


/*---------------------------------
          ALL USEFUL HOOKS
-----------------------------------*/

export const useBlogs = () => {
    return useQuery({ queryKey: ["blogs"], queryFn: fetchBlogs });
}

export const useBlogMutations = (id: string | null) => {
    const queryClient = useQueryClient();

    // create
    const createMut = useMutation({
        mutationFn: createBlog,
        onSuccess: (data) => {
            toast.success("Data create successfully.");
            queryClient.invalidateQueries({queryKey:["blogs"]})
        },
        onError: (data) => {
            toast.error("Faild to create blog!")
        }
    })



    // edit+
    const editMut = useMutation({
        mutationFn: editBlog,
        onSuccess: (data) => {
            toast.success("Blog update successfully");
            queryClient.invalidateQueries({ queryKey: ["blogs"] })
        },
        onError: (data) => {
            toast.error("Faild to update blog! ")
        }
    })
    // Delete
    const deleteMut = useMutation({
        mutationFn: deleteBlog,
        onSuccess: (data) => {
            toast.success(data?.message || "Tutor Deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["blogs"] })
        },
        onError: (err: any) => {
            toast.error("Failed to delete blog!")
        }
    })


    return { createMut, editMut, deleteMut };


}
// 