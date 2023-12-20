import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { TextInput } from "components/InputField";
import { addWorkspace } from "redux/boardSlice";
import { useDispatch } from "react-redux";

interface Props {
  handleClose: () => void;
}
export default function Index({ handleClose }: Props) {
  const dispatch = useDispatch();
  const WorkspaceSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .test("len", "At least 5 characters and not more than 15", (val) => {
        if (val == undefined) {
          return false;
        }
        return val.length >= 5 && val.length <= 15;
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
    handleClose();
  };
  // const editWorkspaceHandler = () => {

  // };

  return (
    <div>
      <h1 className="font-bold pb-2 px-4">Add Workspace</h1>
      <div className="overflow-y-auto px-4">
        <Formik
          initialValues={{ id: uuidv4(), name: "", email: "" }}
          validationSchema={WorkspaceSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={addWorkspaceHandler}
        >
          <Form>
            <div className="my-6">
              <TextInput
                label="Name"
                name="name"
                type="text"
                placeholder="E.g Organization Name"
              />
            </div>
            <div className="my-6">
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
                className="bg-primary px-2 text-white hover:bg-primary/50 font-bold py-4 w-full text-sm rounded-full"
                type="submit"
              >
                Create Workspace
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
