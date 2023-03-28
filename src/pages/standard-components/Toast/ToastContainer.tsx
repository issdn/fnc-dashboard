import Toast from "./Toast";
import { ToastColorType } from "./hooks";

export type ToastType = {
  title: string;
  message?: string;
  id?: string;
  type: ToastColorType;
  timeout?: number;
};

export default function ToastContainer({
  toasts,
  deleteToast,
}: {
  toasts: ToastType[];
  deleteToast: (id: string) => void;
}) {
  return (
    <div className="pointer-events-none fixed top-0 left-0 h-screen w-screen">
      <div className="flex h-full w-full flex-col items-center justify-end gap-y-2 py-8">
        {toasts.map((t) => (
          <Toast key={t.id} info={t} deleteToast={deleteToast} />
        ))}
      </div>
    </div>
  );
}
