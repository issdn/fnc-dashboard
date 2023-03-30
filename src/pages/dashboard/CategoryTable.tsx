import { FC, useEffect, useState } from "react";
import { api } from "~/utils/api";
import EditableTr, { useSelectTr } from "./EditableTr";
import { useToastContext } from "../StandardComponents/Toast/toastContext";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import CategoryForm from "./CategoryForm";
import Icon from "../StandardComponents/Icon";
import type { TRPCError } from "@trpc/server";
import type { Category } from "@prisma/client";
import { filterObjectsArray } from "./table_functions";

type TableProps<T> = {
  selectedTr: ReturnType<typeof useSelectTr<T>>["selectedTr"];
  selectTr: ReturnType<typeof useSelectTr<T>>["selectTr"];
};

const CategoryTable = ({ selectTr, selectedTr }: TableProps<Category>) => {
  const { addToast } = useToastContext();
  const [data, setData] = useState<Category[]>([]);

  const ctx = api.useContext();
  const result = api.category.getAll.useQuery();
  const { mutateAsync: deleteCategory } = api.category.delete.useMutation({
    onSuccess: async () => await ctx.category.invalidate(),
  });
  const { mutateAsync: editCategory } = api.category.edit.useMutation({
    onSuccess: async () => await ctx.category.invalidate(),
  });

  useEffect(() => {
    if (result.data) {
      setData(result.data);
    }
  }, [result.data]);

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

  return (
    <div className="flex h-full w-full flex-col">
      <div className="rounded-tr-2xl rounded-tl-2xl bg-neutral-900 px-8 py-4">
        <input
          onChange={(e) => {
            filterObjectsArray(e.target.value, result.data, "name")
              .then((newData) => setData(newData))
              .catch(() => setData(result.data));
          }}
          className="input-util w-full rounded-xl bg-neutral-900 py-1 px-4 text-neutral-200"
          placeholder="Search..."
        />
      </div>
      <div className="h-full w-full overflow-auto rounded-br-2xl rounded-bl-2xl bg-neutral-900 pb-4 text-xs text-neutral-100 sm:text-sm md:pb-8 md:text-xl">
        <table
          summary="Categories table with monthly tresholds."
          className="w-full text-center "
        >
          <thead className="whitespace-nowrap text-center">
            <tr>
              <th className="px-2 py-4">Category</th>
              <th className="px-2 py-4">Monthly Treshold</th>
              <th className="px-2 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="font-bolder w-full">
            {data?.map((category, index) => (
              <EditableTr
                category={{
                  name: category.name,
                  monthly_treshold: category.monthly_treshold,
                }}
                index={index}
                key={category.id}
                onClick={() => {
                  selectTr(category);
                }}
                className={`group cursor-pointer ${
                  selectedTr?.id === category.id
                    ? "bg-slate-700 disabled:bg-slate-300 [&>button]:bg-slate-700"
                    : "disabled:bg-neutral-300 [&:nth-child(2n)>button]:bg-neutral-800 [&:nth-child(2n)]:bg-neutral-800 "
                }`}
              >
                <EditButton
                  className="rounded-xl text-base text-neutral-100 outline-neutral-100 hover:bg-white/10"
                  editForm={
                    <CategoryForm
                      submitButtonContent={
                        <Icon icon="edit" className="text-3xl" />
                      }
                      onSubmit={(newValues) =>
                        editCategory({
                          id: category.id,
                          ...(newValues as {
                            name: string;
                            monthly_treshold: number;
                          }),
                        })
                          .then(() => {
                            addToast({
                              title: "Category updated successfully.",
                              type: "success",
                            });
                          })
                          .catch((res: TRPCError) => {
                            addToast({
                              title: res.message,
                              type: "error",
                            });
                          })
                      }
                      initialValues={{
                        name: category.name,
                        monthly_treshold: category.monthly_treshold,
                      }}
                    />
                  }
                />
                <DeleteButton
                  className="rounded-xl text-base text-neutral-100 outline-neutral-100 hover:bg-white/10"
                  onDelete={async () => {
                    await deleteCategory({ id: category.id })
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
                    <h1 className="text-center">
                      Are you sure you want to delete <br />
                      <strong>{category.name}</strong> category?
                    </h1>
                  }
                />
              </EditableTr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;
