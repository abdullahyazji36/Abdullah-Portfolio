"use client";

import Image from "next/image";
import PersonalImage from "../../../public/personal.jpg";
import { Button } from "@mui/material";

const Hero = () => {
    return (
        <div className="min-h-screen flex items-center pt-24 px-6 lg:px-8">
            <div className="mx-auto max-w-5xl w-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div>
                        <Image
                            src={PersonalImage}
                            alt="Abdullah"
                            width={320}
                            height={320}
                            className="rounded-full shadow-xl w-56 h-56 sm:w-48 sm:h-48 lg:w-80 lg:h-80 object-cover"
                            priority
                        />
                    </div>

                    <div className="max-w-xl text-center md:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                            Abdullah Yazji
                        </h1>

                        <p className="mt-6 text-lg dark:text-gray-400 text-gray-600 leading-8">
                            Fullstack Developer focused on building modern web applications
                            with strong frontend experiences and reliable backend architectures.
                            Skilled in designing, developing, and deploying scalable solutions
                            using current technologies. Passionate about clean code, problem-solving,
                            and creating efficient digital products from concept to completion.
                        </p>

                        <div className="mt-8 flex justify-center md:justify-start gap-4">
                            <Button
                                component="a"
                                href="#about"
                                variant="contained"
                            >
                                About me
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;