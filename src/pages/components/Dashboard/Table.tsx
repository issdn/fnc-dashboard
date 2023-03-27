import type { FC } from "react";
import { api } from "~/utils/api";
import { useToastContext } from "./Toast/toastContext";
import EditableTr from "./EditableTr";

const Table: FC = () => {
  const result = api.category.getAllCategories.useQuery();
  const { addToast } = useToastContext();

  if (result.isError) {
    addToast({
      title: "Couldn't load data.",
      message: "Our server couldn't load the data from database.",
      type: "error",
    });
    return <p>❌ Couldn&#39;t load data.</p>;
  }

  if (result.isLoading) {
    return <p>Loading...</p>;
  }

  const data = result.data;

  return (
    <div className="h-full w-full overflow-x-auto rounded-2xl bg-neutral-900 pb-4 text-xs text-neutral-100 sm:text-sm md:pb-8 md:text-xl">
      <table
        summary="Categories table with monthly tresholds."
        className="w-full table-auto text-center "
      >
        <thead className="whitespace-nowrap text-center">
          <tr>
            <th className="px-2 py-4">Category</th>
            <th className="px-2 py-4">Monthly Treshold</th>
            <th className="px-2 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="font-bolder l w-full">
          {data?.map((category, index) => (
            <EditableTr
              id={category.id}
              category={{
                name: category.name,
                monthly_treshold: category.monthly_treshold,
              }}
              index={index}
              key={category.id}
              className="
              last:rounded-br-xl
              [&:nth-child(2n)>button]:bg-neutral-800 
              [&:nth-child(2n)]:bg-neutral-800 
              [&>td:first-child]:px-1
              [&>td:first-child]:sm:px-2
              [&>td:first-child]:xl:px-16
              [&>td:last-child]:px-1
              [&>td:last-child]:sm:px-2
              [&>td:last-child]:xl:px-16
              "
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
