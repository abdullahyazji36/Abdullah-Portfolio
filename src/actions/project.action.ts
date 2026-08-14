"use server";
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { ProjectSchema } from '@/utils/validationSchemas';
import { z } from "zod";
import { redirect } from 'next/navigation';


type CreateProjectDto = z.infer<typeof ProjectSchema>;

export async function createProjectAction(formData: FormData) {
    try {
        const title = formData.get("title")?.toString();
        const content = formData.get("content")?.toString();

        const session = await auth();

        const projectData: CreateProjectDto = {

            title: title ?? "",

            content: content ?? ""

        };

        const validation = ProjectSchema.safeParse(projectData);

        if (!validation.success) {
            return { success: false, message: validation.error.issues[0].message }
        }

        if (!session?.user?.id) {
            return { success: false, message: "User Not Found" }
        }

        await prisma.project.create({
            data: {
                title: validation.data.title,
                content: validation.data.content,
                userId: session.user.id
            },
        });

    } catch (error) {
        console.error(error);
        return { success: false, message: "internal server error, please try agin" };
    }

    revalidatePath('/')
    redirect("/dashboard")
}