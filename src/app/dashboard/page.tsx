// import { projects } from '@/utils/mockData';
import { skills } from '@/utils/mockData';
import { signOutUser } from '@/actions/auth.action';
import { Button } from '@mui/material';
import Link from 'next/link';
import prisma from "@/lib/prisma";


const Dashboard = async () => {

    const projectCount = await prisma.project.count()

    const skillCategoryCount = await prisma.skillCategory.count();

    return (
        <>
            <h1 className="mb-8 text-3xl font-bold">
                Dashboard
            </h1>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-xl p-6 shadow bg-gray-50 dark:bg-gray-800">
                    <h2 className="text-lg font-semibold">
                        Projects
                    </h2>

                    <p className="mt-4 text-3xl font-bold">
                        {projectCount}
                    </p>
                    <Link href="/dashboard/dashprojects"
                        className="inline-block mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        All Projects</Link>
                </div>

                <div className="rounded-xl  p-6 shadow bg-gray-50 dark:bg-gray-800">
                    <h2 className="text-lg font-semibold">
                        Skills
                    </h2>

                    <p className="mt-4 text-3xl font-bold">
                        {skillCategoryCount}
                    </p>
                    <Link href="/dashboard/dashskills"
                        className="inline-block mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        All Skill Category
                    </Link>
                </div>

            </div>

            <form action={signOutUser} className='mt-5'>
                <Button variant="contained" color="error" type="submit">
                    Sign Out
                </Button>
            </form>
        </>
    );
}

export default Dashboard;