import { ChangeEvent, InputHTMLAttributes } from 'react';
import { FieldValues, useFormContext, UseFormSetValue } from 'react-hook-form';
import { IoMdAlert } from 'react-icons/io';

interface DateInputprops extends InputHTMLAttributes<HTMLInputElement> {
  title?: string,
  name: string,
  OnChange?: (e: string, setValue: UseFormSetValue<FieldValues>) => void,
  optional?: boolean
  padding?: 'small' | 'medium'
  theme?: 'dark' | 'gray'
  fontWeight?: 'thin' | 'bold'
}

export default function DateInput({
  name, title = '', OnChange = () => {}, optional, padding = 'medium',
  theme = 'dark', fontWeight = 'bold', ...props
}: DateInputprops) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (OnChange) {
      OnChange(e.target.value, setValue);
    }
  };

  const options = {
    small: 'px-2.5 py-2',
    medium: 'p-2.5',
    dark: 'text-gray-900',
    gray: 'text-gray-500/80',
    thin: 'font-normal',
    bold: 'font-medium',
  };

  return (
    <div className="w-full min-h-4">
      <label htmlFor={name} className={`${options[fontWeight]} block mb-1 text-sm ${optional ? 'text-red-500' : options[theme]}`}>
        {title}
      </label>
      <input
        min="1000-01-01"
        max="9999-12-31"
        type="date"
        {...props}
        {...register(name, { onChange: handleChange })}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${padding && options[padding]} outline-0`}
      />
      {errors[name] ? (
        <div className="flex items-center gap-x-1 text-red-600 text-sm">
          <IoMdAlert className="w-5 h-5" />
          {' '}
          <p>
            {errors[name]?.message !== 'Invalid date' ? errors[name]?.message as string : 'Digite uma data válida!'}
          </p>
        </div>
      ) : ''}
    </div>
  );
}
