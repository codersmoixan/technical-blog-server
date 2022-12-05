import { useController, useFormContext, UseControllerProps} from 'react-hook-form';
import isNull from 'lodash/isNull';
import isUndefined from "lodash/isUndefined";

interface UseFormControllerProps extends Omit<UseControllerProps, 'name'> {
  name?: string;
}

const useFormController = ({ name, rules, defaultValue }: UseFormControllerProps) => {
  const formContext = useFormContext();

  if (isNull(formContext) || isUndefined(name)) {
    return {
      ref: null,
      fieldProps: { value: '' },
      fieldState: { error: undefined },
      ...formContext
    };
  }

  const {
    field,
    fieldState
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useController({
    name,
    rules,
    defaultValue,
    ...(isNull(formContext) ? {} : { control: formContext.control }),
  });

  return {
    ref: field.ref,
    fieldProps: field,
    fieldState,
    ...formContext,
  };
};

export default useFormController;
