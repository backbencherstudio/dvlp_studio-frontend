import { publicAxios } from "@/lib/axios"

export const getAvailableTutors = async () => {
    const res = await publicAxios.get('/teacher/all-sessions');
    return res.data;
}