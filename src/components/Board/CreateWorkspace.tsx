import { Formik, Form } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { TextInput } from "components/InputField";
import { addWorkspace } from "redux/boardSlice";
import { useDispatch } from "react-redux";

export default function Index() {
  const dispatch = useDispatch();
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
    // const foundDuplicate = checkDuplicatedBoard(values, board);
    // if (foundDuplicate === false) {
    dispatch(addWorkspace(values));
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
      <div className="flex-wrap flex items-center h-full justify-center">
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
    </div>
  );
}
