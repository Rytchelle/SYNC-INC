import { useState } from 'react';

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
}

interface UseFormReturn<T> {
  values: T;
  updateValue: (key: keyof T, value: any) => void;
  handleSubmit: () => void;
  resetForm: () => void;
  setValues: (newValues: T) => void;
}

export const useForm = <T extends Record<string, any>>({ 
  initialValues, 
  onSubmit 
}: UseFormProps<T>): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);

  const updateValue = (key: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    updateValue,
    handleSubmit,
    resetForm,
    setValues
  };
};
