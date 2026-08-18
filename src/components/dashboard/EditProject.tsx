"use client";
import { upadateProjectAction } from "@/actions/project.action";
import { toast } from "react-toastify";
import { Project } from "@/generated/prisma/client";
import Image from "next/image";

const EditProject = ({ project }: { project: Project }) => {

    const handleSubmit = async (formData: FormData) => {

        const validation = await upadateProjectAction(project.id, formData);

        if (!validation?.success) {
            toast.error(validation.message)
        }
    };

    return (
        <div className="w-full max-w-xl">
            <h2 className="mb-6 text-3xl font-bold">Add Project</h2>

            <form action={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Project Name"
                    defaultValue={project.title}
                    name="title"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                <textarea
                    rows={4}
                    placeholder="Project Description"
                    defaultValue={project.content ?? ""}
                    name="content"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                <input
                    type="url"
                    name="githubUrl"
                    placeholder="GitHub URL"
                    defaultValue={project.githubUrl ?? ""}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"

                />

                <input
                    type="url"
                    name="webUrl"
                    placeholder="Web URL"
                    defaultValue={project.webUrl ?? ""}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"

                />

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Project Image
                    </label>

                    <input
                        id="image"
                        type="file"
                        name="image"
                        accept="image/jpeg,image/png,image/webp"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                {project.image && (
                    <div className="mt-3">
                        <p className="mb-2 text-sm text-gray-500">
                            Current image:
                        </p>

                        <Image
                            src={project.image}
                            alt={project.title}
                            width={128}
                            height={128}
                            className="h-32 w-32 rounded-lg object-cover"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                >
                    Edit Project
                </button>
            </form>
        </div>
    );
}

export default EditProject