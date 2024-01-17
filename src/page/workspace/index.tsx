import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { TextInput } from "components/InputField";
import { addWorkspace, appData } from "redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import logoMobile from "../../assets/logo-mobile.svg";
import Icon from "components/Icon";
import ToggleBtn from "components/ToggleBtn";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "types";
import { IoArrowBack } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";

export default function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTheme = localStorage.getItem("theme")!;
  const [theme, setTheme] = useState(currentTheme ? currentTheme : "dark");
  const [isCreateWorkspace, setCreateWorkspace] = useState(false);
  const updateThemehandler = (theme: string) => setTheme(theme);
  const data: AppState = useSelector(appData);
  const { profile } = data;

  useEffect(() => {
    if (!profile.id.length) {
      setCreateWorkspace(true);
    }
  }, [profile.id.length]);

  const WorkspaceSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .test("len", "At least 5 characters and not more than 25", (val) => {
        if (val == undefined) {
          return false;
        }
        return val.length >= 5 && val.length <= 25;
      }),
    email: Yup.string().required("Required"),
  });

  const addWorkspaceHandler = (values: any) => {
    dispatch(addWorkspace(values));
    navigate("/dashboard");
  };
  console.log(isCreateWorkspace);
  return (
    <div className={`w-full ${isCreateWorkspace ? "h-full" : "h-screen"}`}>
      <header className="bg-white h-[65px] dark:bg-secondary flex items-center w-full border-b-[1px] border-gray/20">
        <div
          className={`border-r-[1px] border-gray/20 py-6 px-4 min-w-[14rem] cursor-pointer hidden md:block`}
        >
          <Icon type="kanban_logo" />
        </div>
        <div className="block md:hidden border-gray/20 p-3 cursor-pointer">
          <img src={logoMobile} alt="logo" className="w-8 h-8" />
        </div>
        <div className="flex items-center justify-between w-full pr-2 md:px-4">
          <h1 className="font-bold text-gray text-lg">
            {profile.id.length > 0 ? "Workspace" : "No Workspace"}
          </h1>
          <ToggleBtn updateThemehandler={updateThemehandler} theme={theme} />
        </div>
      </header>
      {!isCreateWorkspace && profile.id.length > 0 ? (
        <div className="h-full overflow-hidden">
          <div className="mx-auto h-full flex flex-col items-center justify-center ">
            <div>
              <h1 className="text-xl md:text-2xl text-center">
                Available Workspace(s)
              </h1>
              <Link
                to="/dashboard"
                className="px-3 md:px-8 py-3 mt-6 w-max rounded-lg border-[1px] border-solid flex hover:bg-primary/50 gap-x-4 md:gap-x-8 items-center justify-center"
              >
                <img
                  src="./workspace-placeholder.webp"
                  className="w-10 h-10"
                  alt=""
                />
                <div>
                  <h2 className="text-base md:text-lg">{profile.name}</h2>
                  <p className="text-xs">{profile.email}</p>
                </div>
              </Link>
            </div>
            <div className="text-center mt-10">
              <button
                className="bg-primary/70 hover:bg-primary text-white text-sm py-4 px-8 rounded-lg font-bold"
                onClick={() => setCreateWorkspace(true)}
              >
                {" "}
                Add Workspace
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {isCreateWorkspace ? (
        <div className={`${profile.id.length > 0 ? "h-full" : "h-screen"} `}>
          {profile.id.length > 0 ? (
            <button
              onClick={() => setCreateWorkspace(false)}
              className="text-lg hover:text-primary p-4 md:p-8 flex items-center gap-x-4"
            >
              {" "}
              <span>
                <IoArrowBack />
              </span>
              Available workspace
            </button>
          ) : null}
          <div className="flex-wrap flex items-start md:items-center relative h-full justify-center">
            <Swiper
              loop={true}
              spaceBetween={20}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className="mySwiper hidden md:inline md:w-[30rem] ml-0 mr-10 h-auto"
            >
              {["/start-project.webp", "/todo-graphic.webp", "/tod.webp"].map(
                (ele, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img
                        src={ele}
                        alt="start project"
                        loading="eager"
                        className="w-[25rem] h-auto"
                      />
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>
            <div className="w-96 mx-6 md:mx-0 mt-20 md:mt-0">
              <div>
                <h1 className="text-primary text-xl sm:text-3xl md:text-3xl font-bold ">
                  Welcome to Kanban!
                </h1>
                <p className="text-gray mt-1 text-base mb-8">
                  Get started by creating a workspace!
                </p>
              </div>
              <Formik
                initialValues={{ id: uuidv4(), name: "", email: "" }}
                validationSchema={WorkspaceSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={addWorkspaceHandler}
              >
                <Form>
                  <div className="my-4">
                    <TextInput
                      label="Organization's name"
                      name="name"
                      type="text"
                      placeholder="E.g xyz"
                    />
                  </div>
                  <div className="mb-6">
                    <TextInput
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="E.g xyz@gmail.com"
                    />
                  </div>

                  <div className="my-8">
                    <button
                      aria-label="Board"
                      className=" px-2 text-white bg-primary font-bold py-4 w-full text-sm rounded-full"
                      type="submit"
                    >
                      Create Workspace
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
