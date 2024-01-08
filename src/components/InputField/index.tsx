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
    <div className="relative py-1">
      <label className="font-bold" htmlFor={props.id || props.name}>
        {label}
      </label>
      <Field
        {...field}
        {...props}
        className={`${
          meta.error ? "border-error/70 border-solid" : null
        } px-2 py-3 w-full border-[1px] mt-2 rounded-md outline-none text-sm placeholder:text-xs`}
      />
      {meta.touched || meta.error ? (
        <div className="absolute -bottom-3 text-error/70 text-xs">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export const TextArea = (
  props: (LabelProps & FieldHookConfig<string>) | any
) => {
  const [field, meta] = useField(props);
  return (
    <div className="relative py-1">
      <label className="font-bold" htmlFor={props.id || props.name}>
        {props.label}
      </label>
      <textarea
        className="p-2 w-full mt-2 rounded-md outline-none text-sm h-32 placeholder:text-xs"
        placeholder={props.placeholder}
        {...field}
      />
      {meta.touched || meta.error ? (
        <div className="absolute -bottom-3 text-error/70 text-xs">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export const SubtaskInput = ({
  index,
  arrayHelpers,
  ...props
}: OtherProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <div className="relative">
      <div className="flex gap-2 my-2 items-center">
        <Field
          {...field}
          {...props}
          className={`${
            meta.error ? " border-error/70 border-solid" : null
          } px-2 py-2.5 w-full text-sm placeholder:text-xs border-[1px] rounded-md outline-none`}
        />
        <button onClick={() => arrayHelpers.remove(index)}>
          <MdClose className="text-lg hover:text-primary font-bold" />
        </button>
      </div>
    </div>
  );
};
