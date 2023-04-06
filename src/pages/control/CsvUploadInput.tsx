import { useState, type FC, useRef, type ChangeEvent } from "react";
import Button from "../StandardComponents/Button";
import Icon from "../StandardComponents/Icon";
import { parseCsvFile } from "./csvUploadManager";

type CsvUploadInputProps = {
  label?: string;
  onFileUpload?: (file: File) => unknown;
};

const CsvUploadInput: FC<CsvUploadInputProps> = ({
  label = "Upload file.",
  onFileUpload,
}) => {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

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

  const handleParseFile = () => {
    const selectedFile = fileInputRef.current?.files?.[0];
    if (selectedFile) {
      //   onFileUpload?.(selectedFile);
      parseCsvFile(selectedFile.toString());
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
          <Button onClick={handleFileUpload} type="accent-dark">
            <Icon className="py-1 " icon="file_upload" />
          </Button>
          <Button
            attributes={{ disabled: !fileName }}
            onClick={handleFileInputClear}
            type="accent-dark"
          >
            <Icon className="py-1 " icon="close" />
          </Button>
          <Button
            attributes={{ disabled: !fileName }}
            onClick={handleParseFile}
            type="accent-dark"
          >
            <Icon className="py-1 " icon="check" />
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
