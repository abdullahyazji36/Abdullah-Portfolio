"use client";
import { deleteSkillAction } from "@/actions/skill.action";
import { Button } from "@mui/material";
import Form from "next/form";
import { toast } from "react-toastify";


const DeleteSkillButton = ({ id }: { id: string }) => {
    const handleSubmit = async () => {
        const validation = await deleteSkillAction(id);
        if (!validation?.success) {
            toast.error(validation.message)
            return;
        }
        await deleteSkillAction(id);

        toast.success(validation.message)
    }

    return (
        <Form action={handleSubmit} className="inline-flex">
            <Button
                type="submit"
                color="error"
                size="small"
                sx={{
                    textTransform: "none",
                    minWidth: "auto",
                    padding: "6px 16px",
                }}
                variant="contained"
            >
                Delete
            </Button>
        </Form>
    )
}

export default DeleteSkillButton