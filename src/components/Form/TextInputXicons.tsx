/* eslint-disable react/jsx-curly-brace-presence */
import { ChangeEvent, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons';
import { IoMdAlert } from 'react-icons/io';

interface TextInputXIconsProps extends InputHTMLAttributes<HTMLInputElement> {
  iconleft: IconType,
  iconright: IconType,
  title?: string,
  name: string,
  mask?: (value: string) => string
  iconClick: () => void
  disabledError?: boolean
  onFocus?: () => void,
  onBlur?: () => void,
}

export default function TextInputXIcon({
  name, title = '', iconleft: IconLeft, iconright: IconRight, disabledError, onFocus, onBlur = () => {},
  iconClick, placeholder, mask = (value: string) => value, ...props
}: TextInputXIconsProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (mask) setValue(name, mask(e.target.value));
  };

  return (
    <div className=" w-full min-h-5">
      <label htmlFor={name} className="block text-left text-sm font-medium text-gray-900 mb-1">
        {title}
      </label>
      <div className="flex relative">
        <div className="w-full flex" onBlur={onBlur}>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <IconLeft className="h-5 w-5 text-gray-400" />
          </div>
          <input
            onFocus={onFocus}
            placeholder={placeholder}
            {...props}
            {...register(name, {
              onChange: handleChange,
            })}
            id={name}
            className="outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 block w-full pl-10 pr-8 py-2.5"
          />
          <button
            onClick={iconClick}
            className="absolute outline-0 inset-y-0 right-0 flex items-center pr-3.5"
            type="button"
          >
            {''}
            <IconRight className="h-6 w-5 text-gray-900 duration-300 ease-in-out hover:text-blue-600" />
          </button>
        </div>
      </div>
      <span className="flex text-red-500 text-left text-sm">
        {errors[name] && !disabledError ? (
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
