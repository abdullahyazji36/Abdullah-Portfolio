"use client";
import { updateSkillAction } from "@/actions/skill.action";
import { toast } from "react-toastify";
import { Skill, SkillCategory } from "@/generated/prisma/client";
// import { SkillCategory } from "@/utils/types";

const EditSkill = ({ skill, categories }: {
    skill: Skill, categories: SkillCategory[];
}) => {
    const handleSubmit = async (formData: FormData) => {

        const validation = await updateSkillAction(skill.id, formData);

        if (!validation?.success) {
            toast.error(validation.message)
        }
    };
    return (
        <div className="w-full max-w-md">
            <h2 className="mb-6 text-3xl font-bold">
                Edit Skill
            </h2>

            <form action={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    placeholder="Skill Name"
                    defaultValue={skill.name}
                    name="name"
                    className="w-full rounded-lg border p-3"
                />

                <select
                    name="categoryId"
                    defaultValue={skill.categoryId}
                    className="w-full rounded-lg border p-3 bg-gray-600"
                >
                    <option value="">
                        Select Category
                    </option>

                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
                >
                    Edit Skill
                </button>
            </form>
        </div>
    )
}

export default EditSkill