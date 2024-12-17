import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

type CardRatioItem = {
  value: string,
  title: string,
  description: string,
};

interface CardRatioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  items: CardRatioItem[],
  groupName: string,
  handleChange?: () => void,
  defaultCheck?: string;
  title: string,
}

function CardRadioInput({
  items,
  groupName,
  handleChange = () => {},
  defaultCheck = '',
  title,
  ...props
}: CardRatioInputProps) {
  const {
    register,
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
      <ul className=" text-sm bg-white">
        {items.map((item, idx) => (
          <li key={item.value} className={`w-full ${idx !== items.length - 1 && 'border-b'} border-gray-200 rounded-t-lg py-4`}>
            <div className="flex flex-row gap-x-3 items-start">
              <input
                {...props}
                {...register(groupName, { onChange: handleChange })}
                id={item.value}
                type="radio"
                value={item.value}
                defaultChecked={item.value === defaultCheck}
                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 mt-1.5 cursor-pointer"
              />
              <label htmlFor={item.value} className="flex flex-col gap-1 cursor-pointer">
                <h4 className="text-gray-600">{item.title}</h4>
                <p className="text-xs font-normal text-gray-400">{item.description}</p>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardRadioInput;
