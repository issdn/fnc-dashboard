import type { ZodObject, ZodRawShape } from "zod";

export class CsvError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CsvError";
  }
}

export const readCsvFile = <TCsvDataObject extends ZodObject<ZodRawShape>>(
  fileToParse: string,
  schema: TCsvDataObject
) => {
  const lines = fileToParse.split("\n");
  if (lines.length <= 1) {
    throw new CsvError("CSV file empty.");
  }

  const headers = Object.keys(schema.shape);

  if (!lines[0])
    throw new CsvError("CSV file must contain headers at the first line.");
  const fileHeaders = lines[0].split(",");
  const fileHeadersNormalized = fileHeaders.map((header) =>
    header.toLowerCase().trim()
  );

  fileHeadersNormalized.forEach((header) => {
    if (!headers.find((h) => h === header)) {
      throw new CsvError(
        `CSV file headers do not match expected headers. Expected: ${headers.toString()}, got: ${fileHeadersNormalized.toString()}`
      );
    }
  });

  const result = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) {
      continue;
    }
    const obj: Record<string, string> = {};
    const currentline = (lines[i] as string).split(",");
    for (let j = 0; j < fileHeadersNormalized.length; j++) {
      //@ts-expect-error: It will be validated by zod later.
      obj[fileHeadersNormalized[j]] = currentline[j]?.trim();
    }
    try {
      const parsed = schema.parse(obj);
      result.push(parsed);
    } catch (e) {
      throw new CsvError(
        `Error parsing CSV file. Invalid type of a column in line: ${i}`
      );
    }
  }

  return result;
};
