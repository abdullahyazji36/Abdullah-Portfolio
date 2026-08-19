"use client";
import { createSkillAction } from "@/actions/skill.action";
import { useState } from "react";
import { toast } from "react-toastify";
import { SkillCategory } from "@/generated/prisma/client";

type AddSkillProps = {
    categories: SkillCategory[];
};

const AddSkill = ({ categories }: AddSkillProps) => {
    const [skillName, setSkillName] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const handleSubmit = async (formData: FormData) => {
        const validation = await createSkillAction(formData);

        if (!validation?.success) {
            toast.error(validation.message);
        }

        setSkillName("");
        setCategoryId("");
    };

    return (
        <div className="w-full max-w-md">
            <h2 className="mb-6 text-3xl font-bold">
                Add Skill
            </h2>

            <form action={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    placeholder="Skill Name"
                    value={skillName}
                    name="name"
                    onChange={(e) => setSkillName(e.target.value)}
                    className="w-full rounded-lg border p-3"
                />

                <select
                    name="categoryId"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
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
                    Add Skill
                </button>
            </form>
        </div>
    );
};

export default AddSkill;