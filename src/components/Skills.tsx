import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import prisma from "@/lib/prisma";

const Skills = async () => {
    const skillsCategory = await prisma.skillCategory.findMany({
        include: {
            skills: true,
        },
    });
    return (
        <div className="min-h-screen pt-32 px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <Typography variant="h4" gutterBottom>
                    Skills
                </Typography>

                <div className="grid gap-8 md:grid-cols-2">
                    {skillsCategory.map((category) => (
                        <Box
                            key={category.id}
                            sx={{
                                p: 3,
                                border: 1,
                                borderColor: "blueviolet",
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                {category.name}
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={1}
                                useFlexGap
                                sx={{ flexWrap: "wrap" }}
                            >
                                {category.skills.map((skill) => (
                                    <Chip
                                        key={skill.id}
                                        label={skill.name}
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