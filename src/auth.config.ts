import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/utils/validationSchenas";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth"

export default {
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(data) {
                const validation = LoginSchema.safeParse(data);
                if (validation.success) {
                    const { email, password } = validation.data;

                    const user = await prisma.user.findUnique({ where: { email } });

                    if (!user || !user.password) return null;

                    const validPassword = await bcrypt.compare(password, user.password);

                    if (validPassword) return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    };
                }
                return null
            },
        }),
    ],
} satisfies NextAuthConfig