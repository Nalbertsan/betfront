/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import { Select } from 'antd';
import { z } from 'zod';
import { useFormContext } from 'react-hook-form';
import { IoMdAlert } from 'react-icons/io';

const { Option } = Select;

const emailValidate = z.string().email();
interface TextInputProps {
  title?: string,
  name: string,
  placeholder: string,
}

function EmailListInput({
  name, title, placeholder, ...props
}: TextInputProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const valEmail = (email:string) => {
    if (!emailValidate.safeParse(email).success) {
      return false;
    }
    return true;
  };

  const handleChange = (value: string[]) => {
    setEmails(value);
  };

  return (
    <Select
      mode="tags"
      size="large"
      autoClearSearchValue
      style={{ width: '100%' }}
      placeholder={placeholder}
      {...register(name)}
      {...props}
      onChange={(data: string[]) => {
        const filtered = data.filter(valEmail);
        handleChange(filtered);
        setValue(
          name,
          filtered,
        );
      }}
      id={name}
      value={watch(name)}
    >
      {errors[name] ? (
        <div className="flex items-center gap-x-1 text-red-600">
          <IoMdAlert />
          {' '}
          <p>
            {errors[name]?.message as string}
          </p>
        </div>
      ) : ''}
      {emails.map((email) => (
        <Option key={email} value={email}>
          {email}
        </Option>
      ))}
    </Select>
  );
}

export default EmailListInput;
