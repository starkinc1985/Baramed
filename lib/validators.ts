export function requiredString(value: unknown, field: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid ${field}`);
  }
  return value.trim();
}

export function optionalString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

export function requiredInt(value: unknown, field: string) {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(n)) throw new Error(`Invalid ${field}`);
  return n;
}

