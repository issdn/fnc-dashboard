import type { ZodObject, ZodRawShape } from "zod";

export const parseCsvFile = <T extends ZodRawShape>(
  fileToParse: string,
  validator: ZodObject<T>
) => {
  const lines = fileToParse.split("\n");
  if (lines.length <= 1) {
    throw new Error("CSV file empty.");
  }

  const headers = Object.keys(validator.shape);

  if (!lines[0])
    throw new Error("CSV file must contain headers at the first line.");
  const fileHeaders = lines[0].split(",");
  const fileHeadersNormalized = fileHeaders.map((header) =>
    header.toLowerCase()
  );
  fileHeadersNormalized.forEach((header, index) => {
    if (header !== headers[index]) {
      throw new Error(
        `CSV file headers do not match expected headers. Expected: ${headers.toString()}, got: ${fileHeadersNormalized.toString()}`
      );
    }
  });

  const result: ZodRawShape[] = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) {
      continue;
    }
    const obj: Record<string, string> = {};
    const currentline = (lines[i] as string).split(",");
    for (let j = 0; j < fileHeadersNormalized.length; j++) {
      obj[fileHeadersNormalized[j]] = currentline[j]?.trim();
    }
    try {
      const parsed = validator.parse(obj);
      result.push(parsed);
    } catch (e) {
      throw new Error(
        `Error parsing CSV file. Invalid type of a column in line: ${i}`
      );
    }
  }

  return result;
};
