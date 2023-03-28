import type { FC } from "react";
import { api } from "~/utils/api";
import EditableTr from "./EditableTr";
import { useToastContext } from "../standard-components/Toast/toastContext";
import CategoryForm from "./CategoryForm";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import Icon from "../standard-components/Icon";
import Button from "../standard-components/Button";

const Table: FC = () => {
  const result = api.category.getAll.useQuery();
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
            >
              <EditButton
                editForm={
                  <CategoryForm
                    onSubmit={(newValues) =>
                      api.category.edit
                        .useMutation()
                        .mutateAsync({ id: category.id, ...newValues })
                    }
                    initialValues={{
                      name: category.name,
                      monthly_treshold: category.monthly_treshold,
                    }}
                  />
                }
                className={`${
                  index % 2 === 0
                    ? "rounded-xl bg-neutral-900 text-base text-neutral-100 outline-neutral-100 hover:bg-neutral-800 disabled:bg-neutral-300"
                    : "rounded-xl bg-neutral-800 text-neutral-100 outline-neutral-100 hover:bg-neutral-700 disabled:bg-neutral-300"
                }`}
              />
              <DeleteButton
                onDelete={async () => {
                  await api.category.delete
                    .useMutation()
                    .mutateAsync({ id: category.id })
                    .then(() =>
                      addToast({
                        title: "Category deleted successfully.",
                        type: "success",
                      })
                    )
                    .catch(() =>
                      addToast({
                        title: "Couldn't delete category.",
                        type: "error",
                      })
                    );
                }}
                deleteModalContent={
                  <h1>
                    Are you sure you want to delete &quot;{category.name}
                    &quot; category?
                  </h1>
                }
                className={`${
                  index % 2 === 0
                    ? "rounded-xl bg-neutral-900 text-base text-neutral-100 outline-neutral-100 hover:bg-neutral-800 disabled:bg-neutral-300"
                    : "rounded-xl bg-neutral-800 text-neutral-100 outline-neutral-100 hover:bg-neutral-700 disabled:bg-neutral-300"
                }`}
              />
            </EditableTr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
