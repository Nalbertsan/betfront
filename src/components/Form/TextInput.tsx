import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { IoMdAlert } from 'react-icons/io';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string,
  handleChange?: () => void,
  name: string,
}

export default function TextInput({
  name, title, placeholder, handleChange = () => {}, ...props
}: TextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full min-h-4">
      {
        title
          && (
          <label htmlFor={name} className="block text-sm font-medium text-gray-900 mb-1">
            {title}
          </label>
          )
      }
      <input
        placeholder={placeholder}
        id={name}
        {...props}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-0"
        {...register(name, {
          onChange: handleChange,
        })}
      />
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
