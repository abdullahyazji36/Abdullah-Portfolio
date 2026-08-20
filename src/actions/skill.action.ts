"use server";
import { SkillSchema } from '@/utils/validationSchemas';
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createSkillAction = async (formData: FormData) => {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: "User Not Found" }
    }

    const name = formData.get("name")?.toString();
    const categoryId = formData.get("categoryId")?.toString()

    const validation = SkillSchema.safeParse({ name });
    if (!validation.success) {
        return { success: false, message: validation.error.issues[0].message }
    }

    if (!categoryId) {
        return {
            success: false,
            message: "Category is required",
        };
    }

    try {
        const category = await prisma.skillCategory.findUnique({
            where: {
                id: categoryId,
            },
        });

        if (!category) {
            return {
                success: false,
                message: "Skill Category Not Found",
            };
        }

        await prisma.skill.create({
            data: {
                name: validation.data.name,
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        })

    } catch (error) {
        console.error(error);
        return { success: false, message: "internal server error, please try agin" };
    }

    revalidatePath('/')
    revalidatePath('/dashboard')
    revalidatePath("/dashboard/dashskill");
    redirect("/dashboard")
}

export const deleteSkillAction = async (id: string) => {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: "Unauthorized" }
    }

    try {

        const skill = await prisma.skill.findUnique({ where: { id } });
        if (!skill) {
            return { success: false, message: "Skill Not Found" }
        }

        await prisma.skill.delete({ where: { id } });

        revalidatePath("/");
        revalidatePath('/dashboard')
        revalidatePath("/dashboard/dashskill");

        return { success: true, message: "Skill deleted" };

    } catch (error) {
        console.error(error);
        return { success: false, message: "internal server error, please try agin" };
    }
}

export const updateSkillAction = async (id: string, formData: FormData) => {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: "User Not Found" }
    }

    const name = formData.get("name")?.toString();
    const categoryId = formData.get("categoryId")?.toString()

    const validation = SkillSchema.safeParse({ name });
    if (!validation.success) {
        return { success: false, message: validation.error.issues[0].message }
    }

    try {

        const skill = await prisma.skill.findUnique({ where: { id } });
        if (!skill) {
            return { success: false, message: "skill Not Found" };
        }

        await prisma.skill.update({
            where: { id },
            data: {
                name: validation.data.name,
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        });

    } catch (error) {
        console.error(error);
        return { success: false, message: "internal server error, please try agin" };
    }

    revalidatePath('/')
    revalidatePath("/dashboard/dashskill");
    redirect("/dashboard")
}
