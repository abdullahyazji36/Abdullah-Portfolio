export type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
}

export type SkillItem = {
    id: string;
    title: string;
}

export type Skill = {
    id: string;
    title: string;
    skills: SkillItem[];
}