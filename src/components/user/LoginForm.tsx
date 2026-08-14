"use client";
import PersonalImage from "../../../public/personal.jpg";
import Image from "next/image";
import { useState } from "react";
import { LoginSchema } from "@/utils/validationSchemas";
import AlertUser from "./Alert";
import Spinner from "./Spinner";
import { loginAction } from "@/actions/auth.action";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [clientError, setClientError] = useState("");
    const [serverError, setServerError] = useState("");
    const [serverSuccess, setServerSuccess] = useState("");

    const [loading, setLoading] = useState(false);

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        const validation = LoginSchema.safeParse({ email, password });

        if (!validation.success)
            return setClientError(validation.error.issues[0].message);

        setLoading(true);
        loginAction({ email, password }).then((result) => {
            if (result.success) {
                setClientError("");
                setServerError("");
                setEmail("");
                setPassword("");
                setServerSuccess(result.message);
            }
            if (!result.success) setServerError(result.message);
            setLoading(false);

        });

        setEmail("");
        setPassword("");
        setClientError("");
    }

    return (
        <div className="flex min-h-full flex-col justify-center items-center px-6 py-24 lg:px-8">
            <div className="w-full max-w-sm rounded-2xl dark:bg-gray-800 bg-gray-50 p-8 shadow-lg">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        alt="Abdullah Portfolio"
                        src={PersonalImage}
                        className="mx-auto h-10 w-auto rounded-4xl"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={formSubmitHandler} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        {(clientError || serverError) && <AlertUser type="error" message={clientError || serverError} />}
                        {serverSuccess && <AlertUser type="success" message={serverSuccess} />}

                        <div>
                            <button
                                disabled={loading}
                                type="submit"
                                className="disabled:bg-indigo-200 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                {loading === true ? <Spinner /> : "Sign in"}
                            </button>
                        </div>
                    </form>
                </div>
            </div></div>
    )
}

export default LoginForm