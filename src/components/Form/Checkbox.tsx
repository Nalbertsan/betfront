import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string,
  name: string,
}

export default function Checkbox({
  name, text, ...props
}: CheckboxProps) {
  const {
    register,
    setValue,
    watch,
  } = useFormContext();
  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="text-xs md:text-sm flex items-center cursor-pointer transition-color duration-300 w-fit bg-gray-50 hover:border-gray-400 border border-gray-300 text-gray-900 rounded-lg px-2.5 py-2 gap-2"
      onClick={() => setValue(name, !watch(name))}
    >
      <span>{text}</span>
      <input
        type="checkbox"
        className="cursor-pointer"
        id={name}
        {...props}
        {...register(name, {})}
      />
    </div>
  );
}
