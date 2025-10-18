export const toCSV = (data: (string | number)[][]): string => {
  const escapeValue = (value: string | number): string => {
    let cell = String(value).replaceAll(/"/g, '""');
    if (cell.includes(",") || cell.includes("\n")) {
      cell = `"${cell}"`;
    }
    return cell;
  };

  return data.map((row) => row.map(escapeValue).join(",")).join("\n");
};
