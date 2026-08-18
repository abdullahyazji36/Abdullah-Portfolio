import EditSkillCategory from '@/components/dashboard/EditSkillCategory';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {

    const { id } = await params;
    const skillCategory = await prisma.skillCategory.findUnique({
        where: { id: id }
    });

    if (!skillCategory) {
        notFound();
    }
    return (
        <div>
            <EditSkillCategory category={skillCategory} />
        </div>
    )
}

export default Page