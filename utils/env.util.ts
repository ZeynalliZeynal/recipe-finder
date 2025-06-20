export function getEnv(key: string, defaultValue?: string | number): string {
  const value = process.env[key] || defaultValue?.toString();
  if (value === undefined)
    throw new Error(`Environment variable ${key} not found`);

  return value;
}

export const api_key = getEnv("NEXT_SERVER_API_KEY");
