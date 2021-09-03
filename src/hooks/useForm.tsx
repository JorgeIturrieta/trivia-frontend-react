import { useState } from 'react';

export const useForm = <T extends Object>(form: T) => {
  const [state, setstate] = useState(form);
  const onChange = (field: keyof T, value: string) => {
    setstate({
      ...state,
      [field]: value,
    });
  };

  return {
    ...state,
    onChange,
  };
};
