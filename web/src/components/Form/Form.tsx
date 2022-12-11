import { forwardRef, useRef, useImperativeHandle } from 'react';
import { FormProvider } from 'react-hook-form';
import type { FieldValues } from "react-hook-form/dist/types/fields";
import type { SubmitErrorHandler, UseFormReturn, SubmitHandler } from "react-hook-form/dist/types/form";
import type { FormProviderProps } from "react-hook-form/dist/types";

interface FormProps {
  children?: JSX.Element;
  onFinish?: SubmitHandler<FieldValues>;
  onError?: SubmitErrorHandler<FieldValues>;
  observer?: UseFormReturn
}

export default forwardRef(function Form(props: FormProps, ref) {
  const { children, onFinish, onError, observer, ...other } = props

  const formRef = useRef(null);

  useImperativeHandle(ref, () => ({
    form: formRef.current,
  }));

  const { handleSubmit } = observer ?? {};

  const onSubmit = () => onFinish && handleSubmit?.(onFinish, onError)

  return (
    <FormProvider {...(observer as FormProviderProps)}>
      <form onSubmit={onSubmit()} {...other} ref={formRef}>
        {children}
      </form>
    </FormProvider>
  );
});
