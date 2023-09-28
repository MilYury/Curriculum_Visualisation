/* eslint-disable @typescript-eslint/no-explicit-any */
export const csvJSON = (csv: any): any => {
  const lines = csv.split('\n');

  const result = [];

  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '') {
      continue;
    }

    const obj: any = {};
    const currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      const propertyName = headers[j].replaceAll(/"/g, '').trim();
      const propertyValue = currentline[j]?.replaceAll(/\r/g, '');
      obj[propertyName] = propertyValue;
    }

    result.push(obj);
  }

  return JSON.stringify(result);
};

export const fetchCsv = async (name: string): Promise<any> => {
  const baseUrl = process.env.PUBLIC_URL ?? '';
  const fullPath = `${baseUrl}/${name}`;

  const response = await fetch(fullPath);
  const reader = response?.body?.getReader();
  const result = await reader?.read();
  const decoder = new TextDecoder('utf-8');
  const csv = decoder.decode(result?.value);
  return csv;
};
