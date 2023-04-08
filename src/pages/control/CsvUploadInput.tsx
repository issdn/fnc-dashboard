import { useState, useRef, type ChangeEvent } from "react";
import Button from "../StandardComponents/Button";
import Icon from "../StandardComponents/Icon";
import { type CsvError, readCsvFile } from "./csvReader";
import type { ZodObject, ZodRawShape, z } from "zod";
import { useToastContext } from "../StandardComponents/Toast/toastContext";
import Spinner from "../StandardComponents/Spinner";

type CsvUploadInputProps<TCsvDataObject extends ZodObject<ZodRawShape>> = {
  label?: string;
  onFileUpload: (data: z.infer<TCsvDataObject>[]) => void;
  schema: TCsvDataObject;
};

const CsvUploadInput = <TCsvDataObject extends ZodObject<ZodRawShape>>({
  label = "Upload file.",
  onFileUpload,
  schema,
}: CsvUploadInputProps<TCsvDataObject>) => {
  const { addToast } = useToastContext();
  const [fileName, setFileName] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
    }
  };

  const handleFileInputClear = () => {
    if (fileInputRef.current) {
      if (fileInputRef.current.value) {
        fileInputRef.current.value = "";
        setFileName("");
      }
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleParseFile = () => {
    const selectedFile = fileInputRef.current?.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onloadstart = () => setIsParsing(true);
      reader.onloadend = () => setIsParsing(false);
      reader.onload = () => {
        if (typeof reader.result !== "string") return;
        try {
          const parsed = readCsvFile(reader.result, schema);
          onFileUpload(parsed);
          handleFileInputClear();
        } catch (error: CsvError | unknown) {
          addToast({
            title: (error as CsvError).message || "Couldn't parse csv file.",
            type: "error",
          });
        }
      };
    }
  };

  return (
    <div className="flex flex-col gap-y-1">
      <label className="ml-2" htmlFor="file">
        {label}
      </label>
      <div className="flex w-80 flex-row items-center gap-x-2 rounded-2xl border-2 border-neutral-900 pr-4">
        <input
          name="file"
          onChange={handleFileInputChange}
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept=".csv,.txt,.bin"
        />
        <div className="flex flex-row rounded-tl-xl rounded-bl-xl bg-neutral-900 px-1">
          <Button
            attributes={{ disabled: isParsing }}
            onClick={handleFileUpload}
            type="accent-dark"
          >
            <Icon className="py-1 " icon="file_upload" />
          </Button>
          <Button
            attributes={{ disabled: !fileName || isParsing }}
            onClick={handleFileInputClear}
            type="accent-dark"
          >
            <Icon className="py-1 " icon="close" />
          </Button>
          <Button
            attributes={{ disabled: !fileName || isParsing }}
            onClick={handleParseFile}
            type="accent-dark"
          >
            {isParsing ? (
              <Spinner size="base" />
            ) : (
              <Icon className="py-1 " icon={"check"} />
            )}
          </Button>
        </div>
        <p className="overflow-hidden text-ellipsis font-bold">
          {fileName || "Upload files."}
        </p>
      </div>
    </div>
  );
};

export default CsvUploadInput;
