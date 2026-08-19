"use server";
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { ProjectSchema } from '@/utils/validationSchemas';
import { z } from "zod";
import { redirect } from 'next/navigation';
import { uploadImage } from "@/lib/uploadImage";


type CreateProjectDto = z.infer<typeof ProjectSchema>;

export async function createProjectAction(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: "User Not Found" }
    }

    const title = formData.get("title")?.toString() ?? "";
    const content = formData.get("content")?.toString() ?? "";
    const githubUrl = formData.get("githubUrl")?.toString();
    const webUrl = formData.get("webUrl")?.toString();
    const image = formData.get("image") as File | null;

    const projectData: CreateProjectDto = {
        title: title,
        content: content
    };

    const validation = ProjectSchema.safeParse(projectData);
    if (!validation.success) {
        return { success: false, message: validation.error.issues[0].message }
    }

    try {

        let imageUrl: string | null = null;

        if (image && image.size > 0) {
            if (image.size > 5 * 1024 * 1024) {
                return {
                    success: false,
                    message: "Image must be less than 5MB",
                };
            }

            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp",
            ];

            if (!allowedTypes.includes(image.type)) {
                return {
                    success: false,
                    message: "Only JPG, PNG and WEBP images are allowed",
                };
            }

            imageUrl = await uploadImage(image);
        }

        await prisma.project.create({
            data: {
                title: validation.data.title,
                content: validation.data.content,
                githubUrl: githubUrl || null,
                webUrl: webUrl || null,
                image: imageUrl,
                userId: session.user.id
            },
        });

    } catch (error) {
        console.error(error);
        return { success: false, message: "internal server error, please try again" };
    }

    revalidatePath('/')
    revalidatePath('/dashboard')
    revalidatePath("/dashboard/dashprojects");
    redirect("/dashboard")
}

export const deleteProjectAction = async (id: string) => {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: "Unauthorized" }
    }

    try {

        const project = await prisma.project.findUnique({ where: { id } });
        if (!project || project.userId !== session.user.id) {
            return { success: false, message: "Not allowed" };
        }

        await prisma.project.delete({ where: { id } });

        revalidatePath("/");
        revalidatePath('/dashboard')
        revalidatePath("/dashboard/dashprojects");

        return { success: true, message: "Project deleted" };

    } catch (error) {
        console.error(error);
        return { success: false, message: "internal server error, please try again" };
    }
}

export const updateProjectAction = async (id: string, formData: FormData) => {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: "Unauthorized" }
    }

    const title = formData.get("title")?.toString() ?? "";
    const content = formData.get("content")?.toString() ?? "";
    const githubUrl = formData.get("githubUrl")?.toString();
    const webUrl = formData.get("webUrl")?.toString();
    const image = formData.get("image") as File | null;

    const projectData: CreateProjectDto = {
        title: title,
        content: content
    };

    const validation = ProjectSchema.safeParse(projectData);
    if (!validation.success) {
        return { success: false, message: validation.error.issues[0].message }
    }

    try {

        const project = await prisma.project.findUnique({ where: { id } });
        if (!project || project.userId !== session.user.id) {
            return { success: false, message: "Not allowed" };
        }

        let imageUrl = project.image;

        if (image && image.size > 0) {
            if (image.size > 5 * 1024 * 1024) {
                return {
                    success: false,
                    message: "Image must be less than 5MB",
                };
            }

            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp",
            ];

            if (!allowedTypes.includes(image.type)) {
                return {
                    success: false,
                    message: "Only JPG, PNG and WEBP images are allowed",
                };
            }

            imageUrl = await uploadImage(image);
        }

        await prisma.project.update({
            where: { id },
            data: {
                title,
                content,
                githubUrl: githubUrl || null,
                webUrl: webUrl || null,
                image: imageUrl,
            },
        });
    } catch (error) {
        console.error(error);
        return { success: false, message: "internal server error, please try again" };
    }


    revalidatePath("/");
    revalidatePath("/dashboard/dashprojects");
    redirect("/dashboard")
}