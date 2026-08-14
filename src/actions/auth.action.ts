"use server";
import { signIn, signOut } from "@/auth";
import { LoginSchema } from "@/utils/validationSchemas";
import { AuthError } from "next-auth";
import { z } from "zod";

type LoginDto = z.infer<typeof LoginSchema>;

export const loginAction = async (data: LoginDto) => {
    const validation = LoginSchema.safeParse(data);

    if (!validation.success)
        return { success: false, message: "Invalid credentials" };

    const { email, password } = validation.data;

    try {

        await signIn("credentials", { email, password, redirectTo: "/dashboard" });

        return { success: true, message: "Signed in Successfuly" }

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { success: false, message: "Invalid email or password" };
                default:
                    return { success: false, message: "Somthing went wrong" };
            }
        }

        throw error;

    }


}

export const signOutUser = async () => {
    await signOut();
}