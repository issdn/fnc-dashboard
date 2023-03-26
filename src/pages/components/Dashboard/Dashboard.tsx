import type { FC } from "react";
import CategoryForm from "./CategoryForm";
import Table from "./Table";
import { api } from "~/utils/api";
import Datepicker from "./Datepicker/Datepicker";
import { useCalendar } from "./Datepicker/hooks";

const Dashboard: FC = () => {
  const { mutate } = api.category.addCategory.useMutation();
  const calendar = useCalendar({});
  return (
    <div className="flex flex-col gap-y-4">
      <div className="rounded-2xl border-2 border-neutral-900 p-4 md:p-8">
        <CategoryForm
          onSubmit={mutate}
          initialValues={{ name: "", monthly_treshold: 0 }}
        />
      </div>
      <Table />
      <Datepicker calendar={calendar} />
    </div>
  );
};

export default Dashboard;
