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
    // const foundDuplicate = checkDuplicatedWorkspace(values, board);
    // if (foundDuplicate === false) {
    dispatch(addWorkspace(values));
    navigate("/dashboard");
    // } else {
    //   toast({
    //     title: "Board already exist.",
    //     position: "top",
    //     status: "error",
    //     duration: 2000,
    //     isClosable: true,
    //   });
    // }
    // handleClose();
  };
  // const editWorkspaceHandler = () => {

  // };

  return (
    <div className="w-full h-screen">
      <header className="bg-white h-[65px] dark:bg-secondary flex items-center  w-full border-b-[1px] border-gray/20">
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
            {profile.id.length > 0 ? "Workspace(s)" : "No Workspace"}
          </h1>
          <ToggleBtn updateThemehandler={updateThemehandler} theme={theme} />
        </div>
      </header>
      {!isCreateWorkspace && profile.id.length > 0 ? (
        <div className="h-full">
          <div className="w-4/6 mx-auto h-full flex flex-col items-center justify-center ">
            <div>
              <h1 className="text-xl md:text-2xl text-center ">Workspace(s)</h1>
              <Link
                to="/dashboard"
                className="px-4 md:px-8 py-2 mt-6 w-max rounded-lg border-[1px] border-solid  flex hover:bg-primary/50 gap-x-8 items-center justify-center"
              >
                <img
                  src="./workspace-placeholder.webp"
                  className="w-10 h-10"
                  alt=""
                />
                <div>
                  <h2 className="text-xl md:text-xl">{profile.name}</h2>
                  <p className="text-xs">{profile.email}</p>
                </div>
              </Link>
            </div>
            <div className="text-center mt-10">
              <button className="bg-primary text-white text-sm p-4 rounded-lg font-bold" onClick={() => setCreateWorkspace(true)}>
                {" "}
                Add Workspace
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {isCreateWorkspace ? (
        <div className="flex-wrap flex items-center relative h-full justify-center">
          {profile.id.length > 0 ? (
            <button onClick={()=> setCreateWorkspace(false)} className="text-lg hover:text-primary absolute top-10 left-20 flex items-center gap-x-4">
              {" "}
              <span>
                <IoArrowBack />
              </span>
              Available workspace
            </button>
          ) : null}
          <div className="w-72 lg:w-[30rem] h-auto">
            <img
              src="/start-project.png"
              alt="start project"
              loading="eager"
              className="w-72 lg:w-[30rem] h-auto"
            />
          </div>
          <div className="w-96 mx-6 md:mx-0 mt-6 md:mt-0">
            <div>
              <h1 className="text-primary text-xl sm:text-2xl md:text-3xl font-bold ">
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
                    placeholder="E.g company"
                  />
                </div>
                <div className="mb-6">
                  <TextInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="E.g company@xyz.com"
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
      ) : null}
    </div>
  );
}
