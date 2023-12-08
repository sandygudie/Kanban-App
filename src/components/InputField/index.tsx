import {
  useField,
  FieldHookConfig,
  FieldArrayRenderProps,
  Field,
} from "formik";
import { MdClose } from "react-icons/md";

interface LabelProps {
  label: string;
}
interface OtherProps {
  index: number;
  arrayHelpers: FieldArrayRenderProps;
}

export const TextInput = ({
  label,
  ...props
}: LabelProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="text-sm font-bold" htmlFor={props.id || props.name}>
        {label}
      </label>
      <Field
        {...field}
        placeholder={props.placeholder}
        className="p-2 w-full mt-2 rounded-md outline-none text-sm placeholder:text-xs"
      />
      {meta.touched || meta.error ? (
        <div className="text-error text-xs">{meta.error}</div>
      ) : null}
    </>
  );
};

export const TextArea = (props: LabelProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="text-sm font-bold" htmlFor={props.id || props.name}>
        {props.label}
      </label>
      <textarea
        className="p-2 w-full mt-2 rounded-md outline-none text-sm h-20 placeholder:text-xs"
        placeholder={props.placeholder}
        {...field}
      />
      {meta.touched || meta.error ? (
        <div className="text-error text-xs">{meta.error}</div>
      ) : null}
    </>
  );
};

export const SubtaskInput = ({
  index,
  arrayHelpers,
  ...props
}: OtherProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="flex gap-2 mt-2 items-center">
        <Field
          {...field}
          placeholder={props.placeholder}
          className="p-2 w-full text-sm placeholder:text-xs rounded-md outline-none"
        />
        <button onClick={() => arrayHelpers.remove(index)}>
          <MdClose className="text-lg hover:text-primary font-bold" />
        </button>
      </div>
      {meta.touched || meta.error ? (
        <div className="text-error text-xs">{meta.error}</div>
      ) : null}
    </>
  );
};
