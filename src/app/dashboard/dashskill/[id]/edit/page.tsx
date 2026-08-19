import EditSkill from '@/components/dashboard/EditSkill';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {

    const { id } = await params;
    const skill = await prisma.skill.findUnique({
        where: { id: id }
    });

    if (!skill) {
        notFound();
    }
    const categories = await prisma.skillCategory.findMany({
        orderBy: {
            name: "asc",
        },
    });
    return (
        <div>
            <EditSkill skill={skill} categories={categories} />
        </div>
    )
}

export default Page