import type { FC } from "react";
import CategoryForm from "./CategoryForm";
import Table from "./Table";
import { api } from "~/utils/api";

const Dashboard: FC = () => {
  const { mutate } = api.database.addCategory.useMutation();
  return (
    <div className="flex flex-col gap-y-4">
      <div className="rounded-2xl border-2 border-neutral-900 p-4 md:p-8">
        <CategoryForm
          onSubmit={mutate}
          initialValues={{ name: "Pizza nights", monthly_treshold: 1 }}
        />
      </div>
      <Table />
    </div>
  );
};

export default Dashboard;
