import { Switch, FormControlLabel } from '@mui/material';
import { InputHTMLAttributes } from 'react';
import { FieldValues, useFormContext, UseFormSetValue } from 'react-hook-form';

interface SwitchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name:string,
  title?: string,
  handleChange?: () => void,
  customOnChange?: (setVal: UseFormSetValue<FieldValues>, value: boolean) => void,
  yellow?: boolean,
  defaultChecked?: boolean,
  disabled?: boolean,
}

export default function SwitchInput({
  name,
  title = '',
  handleChange = () => {},
  yellow = false,
  defaultChecked = false,
  customOnChange,
  disabled,
}:SwitchInputProps) {
  const {
    watch, setValue,
  } = useFormContext();

  const checked = watch(name, defaultChecked) as boolean;
  console.log('check', checked);

  return (
    <div className="flex items-center gap-2">
      <FormControlLabel
        control={(
          <Switch
            name={name}
            size="small"
            disabled={disabled}
            checked={checked}
            onChange={(e) => {
              setValue(name, e.target.checked);
              if (handleChange) handleChange();
              if (customOnChange) customOnChange(setValue, e.target.checked);
            }}
            id={name}
          />
        )}
        label={title}
        sx={{
          '& .MuiFormControlLabel-label': {
            fontSize: '14px',
          },
        }}
      />
      {yellow && <div className="h-2 w-2 rounded-full bg-yellow-500" />}
    </div>
  );
}
