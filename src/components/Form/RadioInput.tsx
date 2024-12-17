import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface RatioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  listNames: string[],
  groupName: string,
  handleChange?: () => void,
  defaultCheck?: string;
}

export default function RatioInput({
  listNames,
  groupName,
  handleChange = () => {},
  defaultCheck = '',
  ...props
}: RatioInputProps) {
  const {
    register,
  } = useFormContext();

  return (
    <ul className=" text-sm font-medium bg-white">
      {listNames.map((name) => (
        <li key={name} className="w-full border-b border-gray-200 rounded-t-lg py-1">
          <div className="flex flex-row items-center gap-x-2">
            <input
              {...props}
              {...register(groupName, { onChange: handleChange })}
              id={name}
              type="radio"
              value={name}
              defaultChecked={name === defaultCheck}
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />
            <label htmlFor={name} className="block text-base font-semibold">
              {name}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}
