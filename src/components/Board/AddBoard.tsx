import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { SubtaskInput, TextInput } from "components/InputField";
import { AppState, IBoard, IColumn } from "types";
import { editBoard, appData, addBoard } from "redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { checkDuplicatedBoard } from "utilis";
import { useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
interface Props {
  active?: IBoard;
  handleClose: () => void;
}
function AddBoard({ handleClose, active }: Props) {
  const dispatch = useDispatch();
  const data: AppState = useSelector(appData);
  const board: IBoard[] = data.board;
  const toast = useToast();

  const BoardSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .test("len", "At least 5 characters and not more than 15", (val) => {
        if (val == undefined) {
          return false;
        }
        return val.length >= 5 && val.length <= 15;
      }),
    columns: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Required"),
          tasks: Yup.array(),
        })
      )
      .min(1, "Add a column."),
  });

  const addBoardHandler = (values: IBoard) => {
    const foundDuplicate = checkDuplicatedBoard(values, board);
    if (foundDuplicate === false) {
      dispatch(addBoard(values));
    } else {
      toast({
        title: "Board already exist.",
        position: "top",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    handleClose();
  };

  const editBoardHandler = (values: IBoard) => {
    dispatch(editBoard(values));
    handleClose();
  };

  return (
    <div>
      <h1 className="font-bold text-lg pb-2 px-4">
        {active ? "Edit" : "Add New"} Board
      </h1>
      <div className="overflow-y-auto h-auto max-h-[30rem] px-4">
        <Formik
          initialValues={
            active
              ? { id: active.id, name: active.name, columns: active.columns }
              : { id: uuidv4(), name: "", columns: [] }
          }
          validationSchema={BoardSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={active ? editBoardHandler : addBoardHandler}
        >
          {({ values, errors }) => (
            <Form>
              <div className="mb-6">
                <TextInput
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="E.g  Development, Marketing"
                />
              </div>
              <div className="mb-6">
                <label className="text-sm font-bold">Columns</label>
                <FieldArray
                  name="columns"
                  render={(arrayHelpers) => (
                    <div>
                      {values.columns &&
                        values.columns.length > 0 &&
                        values.columns.map((task: IColumn, index: number) => (
                          <SubtaskInput
                            key={task.id}
                            index={index}
                            name={`columns.${index}.name`}
                            arrayHelpers={arrayHelpers}
                            placeholder="E.g Todo, Progress, Done"
                          />
                        ))}
                      <button
                        aria-label="Add Column"
                        className="bg-primary/40 text-primary dark:bg-white dark:text-primary px mt-3 font-bold text-sm -2 py-3 w-full rounded-full"
                        type="button"
                        onClick={() => {
                          arrayHelpers.push({
                            id: uuidv4(),
                            name: "",
                            tasks: [],
                          });
                        }}
                      >
                        + Add New Column
                      </button>

                      {values.columns.length >= 0 ? (
                        typeof errors.columns === "string" ? (
                          <div className="text-error text-xs">
                            {errors.columns}
                          </div>
                        ) : null
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="my-8">
                <button
                  aria-label="Board"
                  className="px-2 text-white bg-primary/70 hover:bg-primary font-bold py-4 w-full text-sm rounded-full"
                  type="submit"
                >
                  {active ? "Update" : "Create"} Board
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddBoard;
