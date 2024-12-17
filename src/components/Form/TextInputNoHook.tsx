import {
  ChangeEvent, Dispatch, forwardRef, InputHTMLAttributes, SetStateAction,
} from 'react';
import { IconType } from 'react-icons';
import { IoMdAlert } from 'react-icons/io';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: IconType,
  title?: string,
  name: string,
  mask?: (value: string) => string,
  className?: string,
  disabled?: boolean,
  placeholder?: string,
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  error?:boolean,
  min?: number,
  max?: number,
  msg?: string,
  defaultValue?:string,
  paddingSize?: 'pSmall' | 'pNormal' | 'pLarge'
  txtSize?: 'txtSmall' | 'txtBase' | 'txtLarge'
  txtWeight?: 'txtLight' | 'txtNormal' | 'txtMedium'
}
const TextInputNoHook = forwardRef<HTMLInputElement, TextInputProps>(({
  icon: Icon = undefined, name, title, mask, placeholder, defaultValue = '',
  value, setValue, className, disabled, error, min = 0, max = 9999, msg,
  paddingSize = 'pNormal', txtWeight = 'txtNormal', txtSize = 'txtSmall', ...props
}:TextInputProps, ref) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (mask) {
      setValue(mask(e.target.value));
    } else {
      setValue(e.target.value);
    }
  };

  const options = {
    pSmall: 'px-2 py-[5px]',
    pNormal: 'px-2.5 py-2',
    pLarge: 'px-2.5 py-2.5',
    txtSmall: 'text-sm',
    txtBase: 'text-base',
    txtLarge: 'text-lg',
    txtLight: 'font-light',
    txtNormal: 'font-normal',
    txtMedium: 'font-medium',
  };

  return (
    <div className="w-full min-h-5">
      {
        title && (
        <label htmlFor={name} className="block text-left text-sm font-medium text-gray-900 mb-1">
          {title}
        </label>
        )
      }
      <div className="relative w-full">
        {
          Icon && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <Icon className="h-5 w-5" />
          </div>
          )
        }
        <input
          placeholder={placeholder}
          disabled={disabled}
          ref={ref}
          {...props}
          id={name}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={`outline-0 bg-gray-50 border border-gray-300 text-gray-900 
                    ${txtSize && options[txtSize]} ${txtWeight && options[txtWeight]} rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full ${Icon && 'ps-10'} ${paddingSize && options[paddingSize]} placeholder:font-light 
                    ${disabled === true && 'opacity-60 cursor-not-allowed'}
                    ${className}
                    `}
        />
      </div>
      <span className="flex text-red-500 text-left text-sm">
        {error && (value.length < min || value.length > max) ? (
          <div className="flex items-center gap-x-1">
            <IoMdAlert />
            {' '}
            <p>
              {msg}
            </p>
          </div>
        ) : ''}
      </span>
    </div>
  );
});

export default TextInputNoHook;
