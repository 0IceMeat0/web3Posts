export interface PostFormProps {
  initialTitle?: string;
  initialBody?: string;
  onSubmit: (data: { title: string; body: string }) => Promise<void>;
  submitLabel: string;
  isPending: boolean;
}
