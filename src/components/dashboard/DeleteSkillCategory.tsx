"use client";
import { deleteSkillCategoryAction } from "@/actions/skillcategory.action";
import { Button } from "@mui/material";
import Form from "next/form";
import { toast } from "react-toastify";


const DeleteSkillCategoryButton = ({ id }: { id: string }) => {
    const handleSubmit = async () => {
        const validation = await deleteSkillCategoryAction(id);
        if (!validation?.success) {
            toast.error(validation.message)
        }
        await deleteSkillCategoryAction(id);

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

export default DeleteSkillCategoryButton