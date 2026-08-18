"use client";
import { updateSkillCategoryAction } from "@/actions/skillcategory.action";
import { toast } from "react-toastify";
import { SkillCategory } from "@/generated/prisma/client";

const EditSkillCategory = ({ category }: { category: SkillCategory }) => {

    const handleSubmit = async (formData: FormData) => {

        const validation = await updateSkillCategoryAction(category.id, formData);

        if (!validation?.success) {
            toast.error(validation.message)
        }
    };

    return (
        <div className="w-full max-w-md">
            <h2 className="mb-6 text-3xl font-bold">Add Skill</h2>

            <form action={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Skill Name"
                    defaultValue={category.name}
                    name="name"
                    className="w-full rounded-lg border p-3"
                />

                <button
                    type="submit"
                    className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
                >
                    Edit Category
                </button>
            </form>
        </div>
    );
}

export default EditSkillCategory