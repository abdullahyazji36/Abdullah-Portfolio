"use client";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const projects = [
    {
        id: "1",
        title: "Title",
        desc: "Description",
        img: "/img.jpg"
    },
    {
        id: "2",
        title: "Title",
        desc: "Description",
        img: "/img.jpg"
    }
]

const Project = () => {
    return (
        <div className='min-h-screen pt-24 px-6 lg:px-8 mb-6'>
            <div className='mx-auto max-w-5xl w-full'>
                <h2 className='text-2xl pb-6'>Projects</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {projects.map((project) => (
                        <Card key={project.id} sx={{
                            height: "100%", transition: '0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: 6,
                            },
                        }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                image={project.img}
                                className='object-cover'
                                sx={{
                                    height: 200,
                                    objectFit: "cover"
                                }}
                            />
                            <CardContent className='dark:bg-gray-700'>
                                <Typography gutterBottom variant="h5" component="div" className='dark:text-gray-200'>
                                    {project.title}
                                </Typography>
                                <Typography variant="body2" className='dark:text-gray-400'>
                                    {project.desc}
                                </Typography>
                            </CardContent>
                            <CardActions className='dark:bg-gray-700'>
                                <Button size="small" sx={{ textTransform: "none" }} variant="outlined">GitHub</Button>
                                <Button size="small" sx={{ textTransform: "none" }} variant="outlined">View Web</Button>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Project