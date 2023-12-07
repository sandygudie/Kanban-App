import React from "react";
import Icon from "components/Icon";
import { Link } from "react-router-dom";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Index() {
  // const app = useRef<HTMLDivElement>(null);
  // const featureRef = useRef(null);

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   // const container = document.querySelector('.feature-wrapper')
  //   const sections = gsap.utils.toArray(".feature-wrapper .app_demo");
  //   // const texts = gsap.utils.toArray('.anim-text')
  //   const texts = gsap.utils.toArray('.anim-text')
  //   console.log(texts)
  //   const scrollTween = gsap.to(sections, {
  //     xPercent: -100 * (sections.length - 1),
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: ".feature-container",
  //       pin: true,
  //       scrub: 1,
  //       end: "+=2000",
  //     },
  //   });

  //   sections.forEach((section: any) => {
  //     const text = section.querySelectorAll(".anim-text");
  //     const image = section.querySelectorAll(".demo_app_img");

  //     gsap.from(text, {
  //       y: 130,
  //       opacity: 0,
  //       duration: 2,
  //       ease: "elastic",
  //       stagger: 0.1,
  //       scrollTrigger: {
  //         trigger: section,
  //         containerAnimation: scrollTween,
  //         start: "left center",
  //       },
  //     });
  //     gsap.from(image, {
  //       y: 130,
  //       opacity: 0,
  //       duration: 2,
  //       ease: "elastic",
  //       stagger: 0.1,
  //       scrollTrigger: {
  //         trigger: section,
  //         containerAnimation: scrollTween,
  //         start: "left center",
  //       },
  //     });
  //   });
  // }, []);
  const navItems = [
    { title: "Features", link: "features" },
    { title: "Technologies", link: "technologies" },
    { title: "Contact", link: "connect" },
  ];
  return (
    <div
      className="h-screen overflow-auto"
      style={{
        background: `url("./background.svg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        backgroundPosition: "center",
      }}
    >
      <div className="h-screen text-black">
        <header className="flex items-center justify-between px-4 md:px-16 py-4">
          <Link to="/">
            <Icon type="kanban_logo" />
          </Link>
          <div className="hidden md:flex items-center gap-x-6">
            {navItems.map((ele) => {
              return (
                <a
                  key={ele.title}
                  href={`#${ele.link}`}
                  className="hover:text-primary"
                >
                  {ele.title}
                </a>
              );
            })}
          </div>
          <Link
            to="/dashboard"
            className="hover:bg-primary/20 hidden md:inline bg-primary rounded-lg text-white text-base px-6 py-2 font-bold"
          >
            Get Started
          </Link>
        </header>
        <main>
          <div className="px-3 md:px-0 md:w-3/6 mx-auto my-16 md:my-36 text-center">
            <h1 className="font-bold text-[2rem] md:text-6xl">
              Effortlessly Manage your Projects.
            </h1>
            <p className="text-lg md:text-2xl my-8 font-normal leading-relaxed">
              Kanban offers a visual view for teams to manage entire tasks,
              quickly shift priorities, track project progress, and stay on top
              of deadlines.
            </p>
            <div className="">
              <Link
                to="/dashboard"
                className="hover:bg-primary/20 bg-primary rounded-lg text-white text-lg px-10 py-3 font-medium"
              >
                Go to Board
              </Link>
            </div>
          </div>

          <section id="features" className="px-4 md:px-0 my-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Features</h1>

            <div className="my-6 md:my-12">
              <div>
                <h1 className="my-4 text-xl md:text-2xl font-semibold">
                  Simplified Board View
                </h1>

                <img
                  src="simplified-board.svg"
                  className="w-auto md:h-96 mx-auto"
                  alt=""
                />
              </div>

              <div className="md:flex my-12 items-start justify-center gap-8">
                <div>
                  <h1 className="my-4 text-xl md:text-2xl font-semibold">
                    Handle Multiple Projects
                  </h1>
                  <img
                    src="mutiple-project.svg"
                    className="w-auto md:h-96 mx-auto"
                    alt="mutiple-projects-image"
                  />
                </div>
                <div className="mt-10 md:mt-0">
                  <h1 className="my-2 md:my-4 text-xl md:text-2xl font-semibold">
                    Smooth Interactions
                  </h1>
                  <img
                    src="interactive-project.svg"
                    className="w-auto md:h-96 mx-auto"
                    alt="drag-and-drop-gif"
                  />
                </div>
              </div>
            </div>
          </section>
          <section
            id="technologies"
            className="my-16 md:my-36 px-3 md:px-0 md:w-4/6 mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold">Technologies</h1>
            <div className="flex mt-12 flex-wrap items-center justify-center gap-y-4 gap-x-10">
              {[
                "Vite(ReactJs)",
                "TypeScript",
                "TailwindCSS",
                "Redux Toolkit",
                "Formik-yup",
                "GSAP",
                "Framer-motion",
                "Chakara-UI",

                "Cypress",
              ].map((ele, index) => {
                return (
                  <div
                    key={index}
                    className="px-2 md:px-6 text-white font-medium py-2 bg-primary/50 rounded-lg text-sm md:text-base"
                  >
                    {ele}
                  </div>
                );
              })}
            </div>
          </section>
          <section
            id="connect"
            className="mt-16 md:mt-36 px-3 md:px-0 md:w-4/6 mx-auto py-16 text-center"
          >
            <Link
              to="/"
              className="hover:bg-primary/20 font-bold bg-primary px-8 py-4 rounded-lg text-white"
            >
              {" "}
              Connect on GitHub
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}
