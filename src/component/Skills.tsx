"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const skills = {
    Frontend: [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Material UI",
    ],
    Backend: [
        "Node.js",
        "API Routes",
        "Server Actions",
        "Auth.js"
    ],
    Database: [
        "SQL",
        "PostgreSQL",
        "Prisma",
    ],
    Tools: [
        "Git",
        "GitHub",
        "VS Code"
    ],
};

const Skills = () => {
    return (
        <div className="min-h-screen pt-32 px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <Typography variant="h4" gutterBottom>
                    Skills
                </Typography>

                <div className="grid gap-8 md:grid-cols-2">
                    {Object.entries(skills).map(([category, items]) => (
                        <Box
                            key={category}
                            sx={{
                                p: 3,
                                border: 1,
                                borderColor: "blueviolet",
                                borderRadius: 2,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ mb: 2, fontWeight: 600 }}
                            >
                                {category}
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={1}
                                useFlexGap
                                sx={{
                                    flexWrap: "wrap"
                                }}
                            >
                                {items.map((skill) => (
                                    <Chip
                                        key={skill}
                                        label={skill}
                                        color="primary"
                                        variant="outlined"
                                    />
                                ))}
                            </Stack>
                        </Box>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default Skills