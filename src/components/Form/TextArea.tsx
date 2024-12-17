import { TextareaHTMLAttributes, useRef } from 'react';
import { IoMdAlert } from 'react-icons/io';
import { FieldValues, useFormContext } from 'react-hook-form';

interface TextAreaProps<T> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string,
  title: string,
  height?: string,
  handleSub?: (data: T) => void,
}

export default function TextArea<T extends FieldValues>({
  name, title, height, handleSub, ...props
}: TextAreaProps<T>) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const { trigger, handleSubmit } = useFormContext<T>();

  const valueRef = useRef<string>(watch(name) as string);

  const handleBlur = async () => {
    const isValid = await trigger();
    if (isValid) {
      if (handleSub && valueRef.current !== watch(name) as string) {
        // eslint-disable-next-line no-void
        void handleSubmit(handleSub)();
      }
    }
  };

  return (
    <div className="w-full min-h-30">
      <label htmlFor={name} className="block text-sm font-medium mb-1 text-gray-900">
        {title}
      </label>
      <textarea
        onFocus={() => {
          valueRef.current = watch(name) as string;
        }}
        {...props}
        {...register(name, {
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onBlur: handleBlur,
        })}
        id={name}
        className={`rounded-md w-full ${height || 'h-30'} px-2 text-sm text-gray-900 bg-white border border-gray-300 focus:ring-2 outline-0 resize-none`}
      />
      {errors[name] ? (
        <div className="flex text-red-500 items-center gap-x-1 text-xs sm:text-sm">
          <IoMdAlert />
          {' '}
          {errors[name]?.message as string}
        </div>
      ) : ''}
    </div>
  );
}
