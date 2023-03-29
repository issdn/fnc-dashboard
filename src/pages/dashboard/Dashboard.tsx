import type { FC } from "react";
import CategoryForm from "./CategoryForm";
import Table from "./Table";
import { api } from "~/utils/api";
import Icon from "../standard-components/Icon";
import { useToastContext } from "../standard-components/Toast/toastContext";
import type { TRPCError } from "@trpc/server";

const Dashboard: FC = () => {
  const { addToast } = useToastContext();
  const ctx = api.useContext();
  const { mutateAsync } = api.category.add.useMutation({
    onSuccess: async () => {
      await ctx.category.invalidate();
    },
  });
  return (
    <div className="flex w-full flex-row items-center justify-center overflow-y-auto px-8">
      <div className="flex w-full flex-col gap-y-4">
        <div className="rounded-2xl border-2 border-neutral-900 p-4 md:p-8">
          <CategoryForm
            onSubmit={(values) =>
              mutateAsync(values).catch((reason: TRPCError) => {
                addToast({ title: reason.message, type: "error" });
              })
            }
            initialValues={{ name: "", monthly_treshold: 0 }}
            submitButtonContent={<Icon icon="add" className="text-3xl" />}
          />
        </div>
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
