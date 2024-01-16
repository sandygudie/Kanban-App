import { useRef } from "react";
import Icon from "components/Icon";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoDotFill } from "react-icons/go";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";

export default function Index() {
  gsap.registerPlugin(ScrollTrigger);
  const hero = useRef(null);
  useGSAP(
    () => {
      gsap.from(".header", {
        duration: 1.5,
        opacity: 0,
        y: -50,
        ease: "back",
      });
      gsap.from(".title-left", {
        duration: 1.5,
        opacity: 0,
        delay: 0.5,

        y: 10,
      });
      gsap.from(".title-right", {
        duration: 1.8,
        delay: 0.8,
        opacity: 0,
        y: 20,
      });
      gsap.from(".description", {
        duration: 2,
        opacity: 0,
        delay: 1.2,
        y: 40,
      });
    },

    { scope: hero }
  );

  const navItems = [
    { title: "Features", link: "features" },
    { title: "Technologies", link: "technologies" },
    { title: "Contact", link: "connect" },
  ];
  return (
    <div
      style={{
        background: "url(./background.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="home-container h-screen overflow-y-auto relative w-full"
    >
      <div ref={hero} className="h-full w-full relative z-20 text-black">
        <header className="header flex items-center justify-between px-4 lg:px-16 py-8">
          <Link to="/">
            <Icon type="kanban_logo" />
          </Link>
          <div className="hidden md:flex items-center gap-x-12 w-4/6 justify-end">
            {navItems.map((ele) => {
              return (
                <a
                  key={ele.title}
                  href={`#${ele.link}`}
                  className="hover:text-primary text-lg"
                >
                  {ele.title}
                </a>
              );
            })}
          </div>
          <div className="hover:scale-110 transition ease-in-out delay-100 duration-300"></div>
        </header>
        <main>
          <div>
            <div className="px-3 lg:px-0 lg:w-3/6 mx-auto my-16 lg:my-36 text-center">
              <h1 className="font-bold text-[2rem] md:text-6xl">
                <p className="title-left"> Effortlessly Manage </p>
                <p className="title-right">Your Projects.</p>
              </h1>
              <div className="description">
                <p className="text-lg md:text-[25px] my-8 font-normal leading-[2.5rem]">
                  Kanban offers a visual view for teams to manage tasks, quickly
                  shift priorities, track project progress, and stay on top of
                  deadlines.
                </p>

                <div className=" w-fit mx-auto ">
                  <Link
                    to="/dashboard"
                    className="bg-primary/70 hover:bg-primary rounded-lg text-white text-lg px-10 py-4 font-medium"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <section
            id="features"
            className="px-4 md:px-0 text-center rounded-b-[9rem] py-24"
          >
            <h1 className="text-3xl md:text-4xl font-bold">Features</h1>
            <div className="box my-6 md:my-16 ">
              <div className="simplified-view grid items-center md:grid-cols-2 md:ml-24">
                <img
                  src="full-board.webp"
                  className="h-72 lg:h-[26rem]"
                  alt="mutiple-projects-image"
                />
                <div className="text-left md:px-8 py-4">
                  <p className="text-2xl md:text-3xl font-semibold mb-4">
                    What you get
                  </p>
                  <div>
                    {[
                      "Simplified board view.",
                      "Handle multiple projects.",
                      "Smooth drag and drop interaction.",
                      "Optimal layout on device's screen size.",
                      "Create, read, update, and delete boards and tasks.",
                      "Keep track of any changes.",
                      "Toggle theme between dark and light mode.",
                      "Form validation.",
                    ].map((ele, index) => {
                      return (
                        <p
                          key={index}
                          className="text-black md:text-xl flex items-center gap-x-2 py-2"
                        >
                          {" "}
                          <GoDotFill size={20} className="text-primary" />
                          {ele}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="technologies"
            className="px-3 md:px-0 md:mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold">Built with</h1>
            <Marquee className="mt-12 ">
              {[
                "formik.png",
                "gsap.png",
                "tailwind-css-logo.png",
                "atom.webp",
                "chakara-ui.png",
                "formik.png",
                "redux.webp",
                "typescript-new.webp",
                "cypress.png",
              ].map((ele, index) => {
                return <img key={index} src={ele} className="w-36 mx-4" />;
              })}
            </Marquee>
          </section>
          <section
            id="connect"
            className="mt-16 bg-primary md:mt-36 py-16 text-center"
          >
            <p className="text-4xl md:text-5xl text-white font-bold">
              {" "}
              Let&apos;s connect
            </p>
            <p className="text-white text-lg mt-4 mb-7 w-5/6 md:w-1/2 mx-auto font-medium">
              If you&apos;d like to work together on a new project or have any
              questions then please get in touch - I&apos;d love to hear from
              you!
            </p>
            <div className="flex items-center gap-x-6 text-lg text-white gap-y-2 justify-center">
              <Link
                to="https://github.com/sandygudie"
                target="_blank"
                className="hover:text-gray"
              >
                {" "}
                <FaGithub />
              </Link>
              <Link
                target="_blank"
                to="https://www.linkedin.com/in/goodnews-sandy"
                className="hover:text-gray"
              >
                {" "}
                <FaLinkedinIn />
              </Link>
              <Link
                target="_blank"
                to="https://goodnewssandy.netlify.app/#project"
                className="hover:text-gray"
              >
                {" "}
                <CgWebsite />
              </Link>
              <Link
                target="_blank"
                to="mailto:goodnewssandy@gmail.com"
                className="hover:text-gray"
              >
                <MdOutlineEmail />
              </Link>
            </div>
          </section>
        </main>
        <footer className="py-3 w-full text-sm bg-primary text-center text-white">
          Copyright <span>&copy;</span>
          {new Date().getFullYear()}. Sandy Goodnews
        </footer>
      </div>
    </div>
  );
}
