"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

interface RestrictModalProps {
    title: string;
    open: boolean;
    onClose: () => void;
    onSubmit: (data: RestrictFormData) => void;
}

export interface RestrictFormData {
    restriction_period: string;
    restriction_reason: string;
}

const RestrictModal: React.FC<RestrictModalProps> = ({title, open, onClose, onSubmit }) => {
    const { register, handleSubmit, reset } = useForm<RestrictFormData>({
        defaultValues: {
            restriction_period: "One_Month",
            restriction_reason: "",
        },
    });

    const handleFormSubmit = (data: RestrictFormData) => {
        onSubmit(data);
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Restrict {title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Restriction Period</label>
                        <select
                            {...register("restriction_period")}
                            className="w-full border rounded-md px-3 py-2"
                        >
                            <option value="One_Week">One Week</option>
                            <option value="One_Month">One Month</option>
                            <option value="Three_Months">Three Months</option>
                            <option value="Six_Months">Six Months</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Restriction Reason</label>
                        <textarea
                            {...register("restriction_reason", { required: true })}
                            placeholder="Enter reason..."
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Confirm Restriction</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RestrictModal;
