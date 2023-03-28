import { useEffect } from "react";
import type { ToastType } from "./ToastContainer";
import { useTimeout } from "../timeout";
import Icon from "../Icon";
import Button from "../Button";

const toastStyleTypes = {
  success: {
    icon: "done",
    color: "text-green-600",
    border: "border-green-600",
  },
  error: { icon: "close", color: "text-rose-600", border: "border-rose-600" },
};

type ToastProps = {
  info: ToastType;
  deleteToast: (id: string) => void;
};

const Toast: React.FC<ToastProps> = ({ info, deleteToast }) => {
  const timeout = useTimeout(() => {
    deleteToast(info.id as string);
  }, info.timeout as number);

  useEffect(() => timeout(), []);

  return (
    <div
      className={`pointer-events-auto flex w-full flex-row items-center justify-center gap-x-4 rounded-xl border border-gray-100 bg-white py-[0.8rem] pr-4 pl-6 text-neutral-800 drop-shadow-2xl md:w-[30rem]`}
    >
      <div
        className={`border-2 ${
          toastStyleTypes[info.type].border
        } flex flex-col items-center justify-center rounded-full p-0.5`}
      >
        <Icon
          className={`${toastStyleTypes[info.type].color}`}
          icon={toastStyleTypes[info.type].icon}
        />
      </div>

      <div
        className={`flex w-full flex-col ${
          info.message ? "gap-y-2" : ""
        } h-full justify-center`}
      >
        <p className="align-middle text-lg font-semibold">{info.title}</p>
        <p key={info.id} className="align-middle text-base">
          {info.message}
        </p>
      </div>
      <div className="flex h-full flex-col justify-center">
        <div
          className={` cursor-pointer rounded-xl px-1 text-3xl leading-3 text-neutral-300`}
        >
          <Button
            icon="close"
            type="clear"
            className="text-3xl"
            onClick={() => {
              deleteToast(info.id as string);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;
