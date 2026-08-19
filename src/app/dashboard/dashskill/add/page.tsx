import AddSkill from '@/components/dashboard/AddSkill'
import prisma from '@/lib/prisma';


const Page = async () => {
    const categories = await prisma.skillCategory.findMany({
        orderBy: {
            name: "asc",
        },
    });

    return (
        <div>
            <AddSkill categories={categories} />
        </div>
    )
}

export default Page