"use client";
import { useState } from "react";

const AddProjects = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({
            name,
            description,
        });

        setName("");
        setDescription("");
    };

    return (
        <div className="max-w-xl">
            <h2 className="mb-6 text-3xl font-bold">Add Project</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border p-3"
                />

                <textarea
                    rows={4}
                    placeholder="Project Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-lg border p-3"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full rounded-lg border p-2"
                />

                {image && (
                    <p className="mt-2 text-sm text-gray-600">
                        Selected: {image.name}
                    </p>
                )}

                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                >
                    Save Project
                </button>
            </form>
        </div>
    );
}

export default AddProjects