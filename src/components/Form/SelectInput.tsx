/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChangeEvent, forwardRef, InputHTMLAttributes, useEffect,
} from 'react';
import { FieldValues, useFormContext, UseFormSetValue } from 'react-hook-form';
import { IconType } from 'react-icons';
import { IoMdAlert } from 'react-icons/io';
import Form from '.';

type Option = {
  value: string | number;
  label: string;
};

interface SelectInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  iconleft?: IconType,
  iconright?: IconType,
  title?: string,
  name: string,
  buttonOn?: boolean,
  iconClick?: () => void,
  listOptions: Option[],
  handleChange?: (
    e: ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<FieldValues>
  ) => void,
  className?: string,
  switchBoolean?: boolean,
  onChangeBoolean?: boolean,
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(({
  name,
  title = '',
  iconleft: IconLeft = undefined,
  iconright: IconRight = undefined,
  iconClick = () => { },
  buttonOn = false,
  listOptions,
  handleChange = () => { },
  disabled,
  className = '',
  switchBoolean,
  defaultValue = '',
}, props) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const OnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (handleChange) {
      handleChange(e, setValue);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }

    const clearInput = () => {
      if (switchBoolean) {
        setValue(name, '');
      }
    };
    clearInput();
  }, [defaultValue, switchBoolean]);

  if (switchBoolean) {
    return (
      <Form.TextInput
        name={name}
        title={title}
      />
    );
  }

  return (
    <div className="w-full min-h-5">
      <label htmlFor={name} className="block text-left text-sm font-medium text-gray-900 mb-1">
        {title}
      </label>
      <div className="flex relative">
        <div className="w-full flex">
          {IconLeft && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <IconLeft className="h-6 w-5 text-gray-400" />
            </div>
          )}
          <select
            disabled={disabled}
            {...props}
            {...register(name, {
              onChange: OnChange,
            })}
            id={name}
            className={`
              outline-0 border h-full min-h-10.5 border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 bg-gray-50 block w-full 
              ${IconLeft ? 'pl-10 pr-8' : 'pl-2 '} py-2.5 
              ${disabled ? 'cursor-not-allowed opacity-60' : ''} 
              ${className}
            `}
          >
            {listOptions.map((option) => (
              <option
                className="font-medium"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={iconClick}
            className={`${buttonOn ? 'block' : 'hidden'} absolute outline-0 inset-y-0 right-0 flex items-center pr-3.5`}
          >
            {IconRight && (<IconRight className="h-6 w-5 text-gray-900 duration-300 ease-in-out hover:text-blue-600" />)}
          </button>
        </div>
      </div>
      <span className={`flex text-red-500 text-left text-sm ${errors[name] ? 'block' : 'hidden'}`}>
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
});

export default SelectInput;
