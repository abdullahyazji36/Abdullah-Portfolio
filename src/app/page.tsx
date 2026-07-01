import Hero from "@/component/home/Hero";
import Project from "@/component/Project";

export default function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="projects">
        <Project />
      </section>
    </>
  );
}
