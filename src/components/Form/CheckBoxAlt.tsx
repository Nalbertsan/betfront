/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface CheckboxAltProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
  handleChange: () => void;
  disableCheck?: boolean;
}

function CheckboxAlt({
  name, title, handleChange, disableCheck = false, ...props
}: CheckboxAltProps) {
  const { register } = useFormContext();

  const handleDivClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const checkbox = document.getElementById(name) as HTMLInputElement;
    if (checkbox && event.target !== checkbox) {
      checkbox.click();
    }
  };

  return (
    <div
      className="text-xs md:text-sm flex justify-between items-center transition-color duration-300 w-full bg-gray-50 hover:border-gray-400 border border-gray-300 text-gray-900 rounded-lg px-2.5 py-2 gap-2 cursor-pointer"
      onClick={handleDivClick}
    >
      <span className={`${disableCheck ? 'text-gray-500' : ''}`}>{title}</span>
      {!disableCheck && (
        <input
          type="checkbox"
          className="cursor-pointer"
          id={name}
          {...props}
          {...register(name, {
            onChange: () => handleChange(),
          })}
        />
      )}
    </div>
  );
}

export default CheckboxAlt;
