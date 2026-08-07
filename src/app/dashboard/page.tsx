import { projects } from '@/utils/mockData';
import { skills } from '@/utils/mockData';
import { signOutUser } from '@/actions/auth.action';
import { Button } from '@mui/material';

const Dashboard = () => {

    return (
        <>
            <h1 className="mb-8 text-3xl font-bold">
                Dashboard
            </h1>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-xl p-6 shadow">
                    <h2 className="text-lg font-semibold">
                        Projects
                    </h2>

                    <p className="mt-4 text-3xl font-bold">
                        {projects.length}
                    </p>
                </div>

                <div className="rounded-xl  p-6 shadow">
                    <h2 className="text-lg font-semibold">
                        Skills
                    </h2>

                    <p className="mt-4 text-3xl font-bold">
                        {skills.length}
                    </p>
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