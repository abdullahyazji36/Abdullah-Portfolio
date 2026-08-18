"use client";
import { createSkillCategoryAction } from "@/actions/skillcategory.action";
import { useState } from "react";
import { toast } from "react-toastify";

const AddSkill = () => {
    const [skillCategory, setSkillCategory] = useState("");

    const handleSubmit = async (formData: FormData) => {

        const validation = await createSkillCategoryAction(formData);

        if (!validation?.success) {
            toast.error(validation.message)
        }

        setSkillCategory("");
    };

    return (
        <div className="w-full max-w-md">
            <h2 className="mb-6 text-3xl font-bold">Add Skill</h2>

            <form action={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Skill Name"
                    value={skillCategory}
                    name="name"
                    onChange={(e) => setSkillCategory(e.target.value)}
                    className="w-full rounded-lg border p-3"
                />

                <button
                    type="submit"
                    className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
                >
                    Add Skill
                </button>
            </form>
        </div>
    );
}

export default AddSkill