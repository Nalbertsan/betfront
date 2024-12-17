/* eslint-disable jsx-a11y/label-has-associated-control */
import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface SimpleCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name:string,
  title:string,
  handleChange: () => void,
  yellow?: boolean,
}

function SimpleCheckbox({
  name, title, handleChange, yellow = false, ...props
}: SimpleCheckboxProps) {
  const {
    register,
  } = useFormContext();

  return (
    <div className="flex gap-2 items-center">
      <input
        {...props}
        type="checkbox"
        {...register(name, {
          onChange: () => handleChange(),
        })}
        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 transition duration-150 ease-in-out cursor-pointer"
      />
      <label
        htmlFor={name}
        className="flex gap-2 items-center text-sm md:text-base"
      >
        {title}
        {
          yellow
            && <div className="h-2.5 w-2.5 bg-yellow-500 rounded-full" />
        }
      </label>
    </div>
  );
}
export default SimpleCheckbox;
