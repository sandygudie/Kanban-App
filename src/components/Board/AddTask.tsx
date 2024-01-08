import { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import SelectBox from "components/SelectBox";
import { TextInput, TextArea, SubtaskInput } from "../InputField";
import { AppState, IBoard, IColumn, ISubTask, ITask } from "types";
import { appData, addTask, editTask, deleteTask } from "redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { checkDuplicatedTask } from "utilis";
import { useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  handleClose: () => void;
  tasks?: ITask;
  index?: number;
  activeColumn?: IColumn;
}
export default function AddTask({ handleClose, activeColumn, tasks }: Props) {
  const dispatch = useDispatch();
  const data: AppState = useSelector(appData);
  const active: IBoard = data.active;
  const toast = useToast();
  const [selectedColumn, setSelectedColumn] = useState<string | any>(
    tasks
      ? active.columns.find((item: IColumn) =>
          item.tasks.find((o) => o == tasks)
        )?.name
      : activeColumn
      ? activeColumn.name
      : active.columns[0]?.name
  );

  const TaskSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string(),
    status: Yup.string(),
    subtasks: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required("Required"),
          isCompleted: Yup.boolean(),
        })
      )
      .min(1, "Add a substask."),
  });

  const addTaskHandler = (values: ITask) => {
    values.status = selectedColumn;
    const foundDuplicate = checkDuplicatedTask(values, active);
    if (foundDuplicate === false) {
      dispatch(addTask({ updatedTasks: values, position: 0 }));
    } else {
      toast({
        title: "Task already exist.",
        position: "top",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    handleClose();
  };

  const editTaskHandler = (values: ITask) => {
    if (values.status === selectedColumn) {
      dispatch(editTask({ values, tasks }));
    } else {
      const updatedTasks = {
        ...values,
        status: selectedColumn,
      };
      dispatch(addTask({ updatedTasks, position: 0 }));
      dispatch(deleteTask(tasks));
    }
    handleClose();
  };

  return (
    <div>
      <h1 className="font-bold text-lg pb-2 px-4">
        {tasks ? (
          "Edit"
        ) : activeColumn ? (
          <span>
            Add{" "}
            <span className="text-primary text-lg">{activeColumn.name}</span>
          </span>
        ) : (
          "Add New"
        )}{" "}
        Task
      </h1>
      <div className="overflow-y-auto h-[30rem] pl-0 pr-4 md:px-4">
        <Formik
          initialValues={
            tasks
              ? {
                  id: tasks.id,
                  title: tasks.title,
                  description: tasks.description,
                  status: tasks.status,
                  subtasks: tasks.subtasks,
                }
              : {
                  id: uuidv4(),
                  title: "",
                  description: "",
                  status: selectedColumn,
                  subtasks: [],
                }
          }
          validationSchema={TaskSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values) => {
            tasks ? editTaskHandler(values) : addTaskHandler(values);
          }}
        >
          {({ values, errors }) => (
            <Form className="pb-4">
              <div className="mb-6">
                <TextInput
                  label="Title"
                  name="title"
                  type="text"
                  placeholder="E.g Pending design task"
                />
              </div>
              <div className="my-6">
                <TextArea
                  placeholder="E.g  The hero page design is not completed"
                  name="description"
                  label="Description"
                />
              </div>

              <div className="mb-6">
                <label className="text-sm font-bold">Subtasks</label>
                <FieldArray
                  name="subtasks"
                  render={(arrayHelpers) => (
                    <div>
                      {values.subtasks &&
                        values.subtasks.length > 0 &&
                        values.subtasks.map((task: ISubTask, index: number) => (
                          <SubtaskInput
                            key={task.id}
                            index={index}
                            name={`subtasks.${index}.title`}
                            arrayHelpers={arrayHelpers}
                            placeholder="E.g  Add company logo"
                          />
                        ))}
                      <button
                        aria-label="Add Subtasks"
                        className="dark:bg-white bg-primary/50 mt-2 font-bold text-sm text-primary px-2 py-3 w-full rounded-full"
                        type="button"
                        onClick={() => {
                          arrayHelpers.push({
                            id: uuidv4(),
                            title: "",
                            isCompleted: false,
                          });
                        }}
                      >
                        + Add New Subtask
                      </button>

                      {values.subtasks.length >= 0 ? (
                        typeof errors.subtasks === "string" ? (
                          <div className="text-error text-xs">
                            {errors.subtasks}
                          </div>
                        ) : null
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="relative flex items-center my-6 gap-x-8 justify-between ">
                <div className="w-1/2">
                  <TextInput
                    label="Deadline"
                    name="deadline"
                    type="date"
                    placeholder="E.g Pending design task"
                  />
                </div>
                <div className="w-1/2">
                  <TextInput
                    label="Time"
                    name="time"
                    type="time"
                    placeholder="E.g Pending design task"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="text-sm font-bold">Column</label>
                {activeColumn ? (
                  <input
                    type="text"
                    disabled
                    value={activeColumn.name}
                    className="border-[1px] mt-2 rounded-lg block outline-none py-2 px-4 text-sm w-full"
                  />
                ) : (
                  <SelectBox
                    selectedColumn={selectedColumn}
                    setSelectedColumn={setSelectedColumn}
                  />
                )}
              </div>

              <div className="my-8">
                <button
                  aria-label="Create Task"
                  className="text-white bg-primary/70 hover:bg-primary px-2 py-3 w-full font-bold text-sm dark:hover:text-white rounded-full"
                  type="submit"
                >
                  {tasks ? "Update" : "Create"} Task
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
