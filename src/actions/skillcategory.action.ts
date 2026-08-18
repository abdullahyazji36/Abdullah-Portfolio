"use server";
import { SkillCategorySchema } from '@/utils/validationSchemas';
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const createSkillCategoryAction = async (formData: FormData) => {
    try {
        const name = formData.get("name")?.toString();

        const session = await auth();

        if (!session?.user?.id) {
            return { success: false, message: "User Not Found" }
        }
        const validation = SkillCategorySchema.safeParse({ name });

        if (!validation.success) {
            return { success: false, message: validation.error.issues[0].message }
        }


        await prisma.skillCategory.create({
            data: {
                name: validation.data.name
            }
        })

    } catch (error) {
        console.error(error);
        return { success: false, message: "internal server error, please try agin" };
    }

    revalidatePath('/')
    revalidatePath("/dashboard/dashskills");
    redirect("/dashboard")
}

export const deleteSkillCategoryAction = async (id: string) => {

    try {
        const session = await auth();

        if (!session?.user?.id) {
            return { success: false, message: "Unauthorized" }
        }

        const skillCategory = await prisma.skillCategory.findUnique({ where: { id } });

        if (!skillCategory) {
            return { success: false, message: "SkillCategory Not Found" };
        }

        await prisma.skillCategory.delete({ where: { id } });

        revalidatePath("/");
        revalidatePath("/dashboard/dashskills");

        return { success: true, message: "Skill Category deleted" };

    } catch (error) {
        console.error(error);
        return { success: false, message: "internal server error, please try agin" };
    }

}

export const updateSkillCategoryAction = async (id: string, formData: FormData) => {
    try {
        const name = formData.get("name")?.toString();

        const session = await auth();

        if (!session?.user?.id) {
            return { success: false, message: "User Not Found" }
        }
        const validation = SkillCategorySchema.safeParse({ name });

        if (!validation.success) {
            return { success: false, message: validation.error.issues[0].message }
        }

        const skillCategory = await prisma.skillCategory.findUnique({ where: { id } });

        if (!skillCategory) {
            return { success: false, message: "SkillCategory Not Found" };
        }


        await prisma.skillCategory.update({
            where: { id },
            data: {
                name: validation.data.name
            }
        })

    } catch (error) {
        console.error(error);
        return { success: false, message: "internal server error, please try agin" };
    }

    revalidatePath('/')
    revalidatePath("/dashboard/dashskills");
    redirect("/dashboard")
}
