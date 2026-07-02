import Hero from "@/component/home/Hero";
import Project from "@/component/Project";
import Skills from "@/component/Skills";

export default function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="projects">
        <Project />
      </section>
      <section id="skills">
        <Skills />
      </section>
    </>
  );
}
