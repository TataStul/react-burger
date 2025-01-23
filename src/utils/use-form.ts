import { ChangeEvent, useState } from "react";

export function useForm<T extends { [key: string]: string }>(baseForm: T) {
  type UseFormType = [
    T,
    (e: ChangeEvent<HTMLInputElement>) => void,
    (controlName: string, value: unknown) => void
  ];

  const [form, setForm] = useState<T>(baseForm);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const element = e.target;
    setForm((pastForm) => ({ ...pastForm, [element.name]: element.value }));
  }

  function setCertainValue(controlName: string, value: unknown) {
    setForm((pastForm) => ({ ...pastForm, [controlName]: value }));
  }

  return [form, handleChange, setCertainValue] as unknown as UseFormType;
}
