import { useState, type FC } from "react";
import { useToastContext } from "../StandardComponents/Toast/toastContext";
import type { Category } from "@prisma/client";
import { api } from "~/utils/api";
import Icon from "../StandardComponents/Icon";
import FilteredTable, {
  useFilteredTableData,
} from "../StandardComponents/FilteredTable";
import EditButton from "../StandardComponents/EditButton";
import CategoryForm from "./CategoryForm";
import DeleteButton from "../StandardComponents/DeleteButton";
import Tbody from "../StandardComponents/Tbody";
import Thead from "../StandardComponents/Thead";
import Tr, { type useSelectTr } from "../StandardComponents/Tr";
import Modal, { useModal } from "../StandardComponents/Modal/Modal";

type CategoryTableProps = {
  categories: Category[] | [];
  selectedCategory: ReturnType<typeof useSelectTr<Category>>["selectedTr"];
  selectCategory: ReturnType<typeof useSelectTr<Category>>["setSelectedTr"];
};

const CategoryTable: FC<CategoryTableProps> = ({
  categories,
  selectCategory,
  selectedCategory,
}) => {
  const { addToast } = useToastContext();
  const ctx = api.useContext();

  const { data, setData } = useFilteredTableData(categories);

  const [categoryToEdit, setCategoryToEdit] = useState<Category | undefined>(
    data[0]
  );
  const { isOpen, onOpen, onClose } = useModal();

  const { mutateAsync: deleteCategory } = api.category.delete.useMutation({
    onSuccess: async () => {
      await ctx.category.getAll.invalidate();
      await ctx.expense.getAll.invalidate();
      addToast({
        title: "Category deleted successfully",
        type: "success",
      });
    },
    onError: (error) => {
      addToast({ title: error.message, type: "error" });
    },
  });

  const { mutateAsync: editCategory } = api.category.edit.useMutation({
    onSuccess: async () => {
      onClose();
      await ctx.category.getAll.invalidate();
      addToast({
        title: "Category edited successfully",
        type: "success",
      });
    },
    onError: (error) => {
      addToast({ title: error.message, type: "error" });
    },
  });

  return (
    <>
      <FilteredTable<Category>
        title="Categories"
        filterKey="name"
        data={data}
        setData={setData}
      >
        <Thead>
          <th>Category</th>
          <th>Monthly Treshold</th>
          <th>Actions</th>
        </Thead>
        <Tbody>
          {data.map((category, index) => (
            <Tr
              row={{
                name: category.name,
                monthly_treshold: category.monthly_treshold,
              }}
              index={index}
              key={category.id}
              onClick={() => {
                selectCategory(category);
              }}
              selected={selectedCategory?.id === category.id}
              className="cursor-pointer"
            >
              <EditButton
                onClick={() => {
                  setCategoryToEdit(category);
                  onOpen();
                }}
              />
              <DeleteButton
                onDelete={async () => await deleteCategory(category.id)}
                deleteModalContent={
                  <div className="flex flex-col gap-y-8">
                    <h1 className="text-center">
                      Are you sure you want to delete <br />
                      <strong>{category.name}</strong> category?
                    </h1>
                  </div>
                }
              />
            </Tr>
          ))}
        </Tbody>
      </FilteredTable>
      <Modal isOpen={isOpen} onClose={onClose}>
        {categoryToEdit ? (
          <CategoryForm
            submitButtonContent={<Icon icon="edit" className="text-3xl" />}
            onSubmit={(newValues) =>
              editCategory({
                id: categoryToEdit.id,
                ...newValues,
              })
            }
            initialValues={{
              name: categoryToEdit.name,
              monthly_treshold: categoryToEdit.monthly_treshold,
            }}
          />
        ) : (
          <p>There&apos;s no category to edit.</p>
        )}
      </Modal>
    </>
  );
};

export default CategoryTable;
