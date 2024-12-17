import { ChangeEvent, InputHTMLAttributes, useRef } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons';
import { IoMdAlert } from 'react-icons/io';

interface TextInputProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  icon: IconType,
  handleSub?: (data: T) => void,
  title?: string,
  name: string,
  mask?: (value: string) => string,
  OnChange?: (e: string) => void,
  className?: string,
  offset?: number,
  yellow?: boolean,
  pSize?: 'small' | 'medium',
  titleTheme?: 'dark' | 'light',
  focusEffect?: boolean,
}

export default function TextInputIcon<T extends FieldValues>({
  name,
  title = '',
  icon: Icon,
  placeholder,
  mask = (value: string) => value,
  OnChange = (value: string) => value,
  disabled,
  className = '',
  offset = undefined,
  yellow = false,
  pSize = 'medium',
  titleTheme = 'dark',
  focusEffect = false,
  handleSub = undefined,
  ...props
}: TextInputProps<T>) {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  const { trigger, handleSubmit } = useFormContext<T>();

  const valueRef = useRef<string>(watch(name) as string);

  const handleBlur = async () => {
    if (handleSub) {
      const isValid = await trigger();
      if (isValid) {
        if (handleSub && valueRef.current !== watch(name) as string) {
          // eslint-disable-next-line no-void
          void handleSubmit(handleSub)();
        }
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (mask) setValue(name, mask(e.target.value));
    if (OnChange) {
      OnChange(e.target.value);
    }

    if (offset) {
      const inputElement = document.getElementById(name) as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
        const currentState = watch(name) as string;
        inputElement.setSelectionRange(currentState.length - offset, currentState.length - offset);
      }
    }
  };

  return (
    <div className="w-full min-h-5">
      <label
        htmlFor={name}
        className={`flex gap-1.5 items-center text-left text-sm font-medium ${titleTheme === 'dark' ? 'text-gray-900' : 'text-gray-500'} mb-1`}
      >
        {title}
        {
          yellow
            && <div className="h-2 w-2 rounded-full bg-yellow-500" />
        }
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <Icon className={`${pSize === 'small' ? 'w-4 h-4' : 'h-5 w-5'}`} />
        </div>
        <input
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => {
            valueRef.current = watch(name) as string;
          }}
          {...props}
          {...register(name, {
            onChange: handleChange,
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onBlur: handleBlur,
          })}
          id={name}
          className={`outline-0 bg-gray-50 border border-gray-300 text-gray-900 
                    text-sm rounded-lg block w-full ps-10 ${pSize === 'small' ? 'px-2 py-2' : 'p-2.5'} placeholder:font-light 
                    ${disabled === true && 'opacity-60 cursor-not-allowed'}
                    ${className} ${focusEffect && 'focus:bg-sky-100/70'}
                    `}
        />
      </div>
      <span className="flex text-red-500 text-left text-sm">
        {errors[name] ? (
          <div className="flex items-center gap-x-1">
            <IoMdAlert />
            {' '}
            <p>
              {errors[name]?.message as string}
            </p>
          </div>
        ) : ''}
      </span>
    </div>
  );
}
