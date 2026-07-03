import { Typography, Box } from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';

const steps = [
    'Planning and Data Modeling',
    'Database and ORM Initialization',
    'Schema Creation and Database Migration',
    'Backend and API Development (Server Action / Route Handler)',
    'Authentication and Authorization Integration',
    'Frontend and UI Development',
    'Testing and Deployment',
];

const About = () => {
    return (
        <div className="min-h-screen pt-32 px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <Typography variant="h4" gutterBottom>
                    About me
                </Typography>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <Typography variant="body1">
                            I am a full-stack web developer, and I build web projects to enhance my
                            skills.
                        </Typography>
                    </div>
                    <div className="rounded-xl border border-violet-500 p-6 shadow-sm">
                        <Typography variant="h6" gutterBottom>
                            Development Workflow
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 3 }}>
                            I develop projects from scratch, following these stages:
                        </Typography>
                        <Box sx={{ mt: 4 }}>
                            <ul className="space-y-3">
                                {steps.map((step) => (
                                    <li key={step} className="flex items-center gap-2 text-violet-500">
                                        <LabelIcon fontSize="small" />
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About