import { InputHTMLAttributes } from 'react';

interface SliderInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string,
  name: string,
}

export default function SliderInput({ name, title = '', ...props }:SliderInputProps) {
  return (
    <div className="w-full min-h-4">
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
        {title}
      </label>
      <input
        id={name}
        {...props}
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <p className="text-red text-center text-sm">Aumente ou diminua o zoom da sua imagem!</p>
    </div>
  );
}
