import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import {
  FieldValues, useForm, FormProvider, DefaultValues,
  FieldErrors,
} from 'react-hook-form';
import { ZodSchema } from 'zod';

interface FormContainerProps<T extends FieldValues> {
  schema: ZodSchema<T>,
  onSubmit: (data: T) => void,
  onError?: (errors: FieldErrors<T>) => void;
  defaultValues?: DefaultValues<T>,
  children: ReactNode,
  classname: string,
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all'
}

function Container<T extends FieldValues>({
  schema,
  onSubmit,
  onError,
  children,
  classname,
  defaultValues = undefined,
  mode = 'onSubmit',
}: FormContainerProps<T>) {
  const { ...methods } = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
    mode,
  });

  return (
    <FormProvider {...methods}>
      <form
        className={classname}
        onSubmit={methods.handleSubmit(onSubmit, onError)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Container;
