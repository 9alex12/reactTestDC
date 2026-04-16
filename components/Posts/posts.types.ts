export interface PostFormValues {
  title: string;
  body: string;
}

export interface PostFormProps {
  defaultValues?: PostFormValues;
  onSubmit?: (values: PostFormValues) => void;
  onCancel?: () => void;
}