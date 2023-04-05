import type { FC } from "react";
type FieldsetProps = {
  legend: string;
  children?: React.ReactNode | React.ReactNode[];
};

const Fieldset: FC<FieldsetProps> = ({ children, legend }) => {
  return (
    <fieldset className="h-full w-full flex-1 rounded-2xl border-2 border-neutral-900 p-4 md:p-6">
      <legend className="mx-2 px-2 text-xl">{legend}</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
