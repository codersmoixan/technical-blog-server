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
      fieldProps: {},
      fieldState: { error: undefined }
    };
  }

  const {
    field: { ref: fieldRef, ...fieldProps },
    fieldState
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useController({
    name,
    rules,
    defaultValue,
    ...(isNull(formContext) ? {} : { control: formContext.control }),
  });

  return {
    ref: fieldRef,
    fieldProps,
    fieldState,
    ...formContext,
  };
};

export default useFormController;
