import { auth } from '@/auth';
import EditProject from '@/components/dashboard/EditProject';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {
    const session = await auth();

    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: { id: id }
    });

    if (!project || project.userId !== session?.user?.id) {
        notFound();
    }
    return (
        <div>
            <EditProject project={project} />
        </div>
    )
}

export default Page