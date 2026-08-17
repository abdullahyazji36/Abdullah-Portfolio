"use client";
import { useState } from "react";
import { createProjectAction } from "@/actions/project.action";
import { toast } from "react-toastify";

const AddProjects = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [webUrl, setWebUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (formData: FormData) => {

        const validation = await createProjectAction(formData);

        if (!validation?.success) {
            toast.error(validation.message)
        }

        setName("");
        setDescription("");
        setGithubUrl("");
        setWebUrl("");
    };

    return (
        <div className="w-full max-w-xl">
            <h2 className="mb-6 text-3xl font-bold">Add Project</h2>

            <form action={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Project Name"
                    value={name}
                    name="title"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                <textarea
                    rows={4}
                    placeholder="Project Description"
                    value={description}
                    name="content"
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                <input
                    type="url"
                    name="githubUrl"
                    placeholder="GitHub URL"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"

                />

                <input
                    type="url"
                    name="webUrl"
                    placeholder="Web URL"
                    value={webUrl}
                    onChange={(e) => setWebUrl(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"

                />

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Project Image
                    </label>

                    <input
                        type="file"
                        name="image"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                {/* Selected Image */}
                {image && (
                    <div className="text-sm text-gray-600">
                        Selected: {image.name}
                    </div>
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