import isString from 'lodash/isString';
import { useForm as useHookForm, SetValueConfig, UseFormProps } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import { EmptyObject } from "src/tb.types"

const useForm = ({ mode = 'onSubmit', ...formOptions }: UseFormProps = {}) => {
  const observer = useHookForm({ ...formOptions, mode });
  const { setValue: setFormValue, ...other } = observer;

  const setValue = <T = EmptyObject<string>>(option: string | T, value: string, options: SetValueConfig) => {
    if (!option) return;
    const setValueFunction = setFormValue;

    if (isString(option)) {
      return setValueFunction(option, value, options);
    }

    Object.keys(option).forEach(key => {
      setValueFunction(key, option[key as keyof T], options);
    });
  };

  const clearValues = (option: string | string[]) => {
    if (isEmpty(option)) return observer.reset();

    const setValueFunction = setFormValue;

    if (isArray(option)) {
      return option.forEach(key => {
        setValueFunction?.(key, '');
      });
    }

    return setValueFunction?.(option, '');
  };

  return {
    ...other,
    observer,
    setValue,
    clearValues,
  };
};

export default useForm;
