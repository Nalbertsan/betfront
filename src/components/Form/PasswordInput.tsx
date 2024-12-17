import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlinePassword } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Form from '.';

interface PasswordInputProps {
  name:string,
  title?: string,
  icon?: 'icon1' | 'icon2',
  placeholder?: string,
  mask?: (value: string) => string,
  disabledError?: boolean,
  onFocus?: () => void,
  onBlur?: () => void,
}

export default function PasswordInput({
  name,
  title = '',
  icon = 'icon1',
  placeholder = '',
  disabledError,
  mask = (value: string) => value,
  onFocus = () => {},
  onBlur = () => {},
}:PasswordInputProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <Form.TextInputXIcon
      mask={mask}
      placeholder={placeholder}
      type={visible ? 'text' : 'password'}
      iconleft={icon === 'icon1' ? RiLockPasswordLine : MdOutlinePassword}
      iconright={visible ? FaEye : FaEyeSlash}
      name={name}
      title={title}
      iconClick={handleVisible}
      disabledError={disabledError}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
