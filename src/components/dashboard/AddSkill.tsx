"use client";
import { useState } from "react";

const AddSkill = () => {
    const [skill, setSkill] = useState("");

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(skill);

        setSkill("");
    };

    return (
        <div className="w-full max-w-md">
            <h2 className="mb-6 text-3xl font-bold">Add Skill</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Skill Name"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
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