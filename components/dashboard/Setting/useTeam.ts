import { privateAxios } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";

const TEAM_ENDPOINTS = {
    ALL_MEMBERS: "/web-infro/all-teams",
    ADD: "/web-infro/create-team",
    UPDATE: "/web-infro/teams",
    DELETE: "/web-infro/remove",
} as const;


export const teamService = {
    // read
    async getMembers() {
        const {data} = await privateAxios.get(TEAM_ENDPOINTS.ALL_MEMBERS);
        return data.data;
    },

    // create
    async addMember(payload:any){
        const {data} = await privateAxios.post(TEAM_ENDPOINTS.ADD, payload);
        return data.data;
    },
// update
async updateMember({id, payload}: {id:string, payload:any}){
    const {data} =await privateAxios(`${TEAM_ENDPOINTS.UPDATE}/${id}`, payload)
    return data.data;
} ,
async deleteMember(id:string){
    const {data} = await privateAxios.delete(`${TEAM_ENDPOINTS.DELETE}/${id}`);
    return data.data
}
 

}

export const useTeamMembers = () => {
    return useQuery({
        queryKey: ["teams"],
        queryFn: teamService.getMembers,
    })
}

export const useTeamsMutations = () => {
    const queryClient = useQueryClient();

    // create mutaion
    const createMutaion = useMutation({
        mutationFn: teamService.addMember,
        onSuccess: (data) => {
            toast.success("Member added sucessfully!");
            queryClient.invalidateQueries({
                queryKey: ["teams"]
            })
        },
        onError: () => {
            toast.error("Memeber added failed!")
        }
    })
    // update mutaion
    const updateMutation = useMutation({
        mutationFn: teamService.updateMember,
        onSuccess: (data) => {
            toast.success("Member update successfully")
        },
        onError: (data) => {
            toast.error("Member update failed!")
        }
    })
    // delete team member
    const deleteMutation = useMutation({
        mutationFn: teamService.deleteMember,
        onSuccess: (data) => {
            toast.success("Memeber remove successfully!")
            queryClient.invalidateQueries({queryKey:["teams"]})
        },
          onError: (data) => {
            toast.error("Delete failed!")
        }
    })

    // Memoized actions
    const addTeamMember = useCallback(
        (payload: any) => createMutaion.mutateAsync(payload), 
        [createMutaion]
    );
     const updateTeamMember = useCallback(
    (payload: any) => updateMutation.mutateAsync(payload),
    [updateMutation]
  );
  const deleteTeamMember = useCallback(
    (id: string) => deleteMutation.mutateAsync(id),
    [deleteMutation]
  );
    

  return {
    createMutaion,
    updateMutation,
    deleteMutation,
    // actions
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    // combined states
    isLooading: createMutaion.isPending || updateMutation.isPending || deleteMutation.isPending
  }
}

