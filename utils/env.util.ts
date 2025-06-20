export function getEnv(key: string, defaultValue?: string | number): string {
  const value = process.env[key] || defaultValue?.toString();
  if (value === undefined)
    throw new Error(`Environment variable ${key} not found`);

  return value;
}

export const spoonacular_key = getEnv("NEXT_SERVER_SPOONACULAR_API_KEY");
