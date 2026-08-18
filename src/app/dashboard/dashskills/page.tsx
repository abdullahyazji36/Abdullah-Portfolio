import DeleteSkillCategoryButton from "@/components/dashboard/DeleteSkillCategory";
import prisma from "@/lib/prisma";
import Link from "next/link";

const Page = async () => {

    const skillsCategory = await prisma.skillCategory.findMany();
    return (
        <section className="mt-8">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-4">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-4 text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {skillsCategory.map((skillCategory) => (
                                <tr
                                    key={skillCategory.id}
                                    className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        {skillCategory.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/dashboard/dashskills/${skillCategory.id}/edit`}
                                                className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                Edit Category
                                            </Link>

                                            <DeleteSkillCategoryButton id={skillCategory.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Page