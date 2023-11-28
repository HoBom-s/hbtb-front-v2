import { useState, useCallback, useMemo, ChangeEvent } from "react";

export interface Form {
  [key: string]: {
    type: "email" | "text" | "password";

    value: string;

    placeholder?: string;

    errorMessage?: string;

    isRequired: boolean;

    validate: (v: string) => boolean;
  };
}

interface UserForm {
  formValue: Form;

  isValidForm: boolean;

  handleFormValueChange: (e: ChangeEvent<HTMLInputElement>) => void;

  resetFormValue: () => void;
}

/**
 * User Form Hook
 *      Form Element를 잘 컨트롤 하기 위한 hook
 *
 * @example
 *      const { formValue, isValidForm, handleFormValueChange, resetFormValue } = useForm({
 *          "username": {
 *              type: "text",
 *              value: "",
 *              placeholder: "사용자 이름을 입력하세요.",
 *              errorMessage: "사용자 이름이 올바르지 않습니다.",
 *              isRequired: true,
 *              validate: (username) => username.length >= 2
 *          },
 *      });
 *
 * @param {Form} initialValue
 * @returns {UserForm}
 */
export const useForm = (initialValue: Form): UserForm => {
  const [formValue, setFormValue] = useState<Form>(initialValue);

  const isValidForm = useMemo(
    () =>
      Object.keys(formValue).every((key: string) =>
        formValue[key].validate(formValue[key].value),
      ),
    [formValue],
  );

  const handleFormValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (formValue[name].validate(value)) {
        setFormValue((prevFormValue: Form) => {
          return {
            ...prevFormValue,
            [name]: {
              ...prevFormValue[name],
              value: value,
              isValid: true,
            },
          };
        });
      } else {
        setFormValue((prevFormValue: Form) => {
          return {
            ...prevFormValue,
            [name]: {
              ...prevFormValue[name],
              value: value,
              isValid: false,
            },
          };
        });
      }
    },
    [formValue],
  );

  const resetFormValue = useCallback(() => {
    setFormValue(initialValue);
  }, [initialValue]);

  return {
    formValue,
    isValidForm,
    handleFormValueChange,
    resetFormValue,
  };
};
