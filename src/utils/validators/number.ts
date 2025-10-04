export const isValidNumber = (value: string): boolean => {
  const parsed = Number.parseFloat(value);
  return value !== "" && Number.isFinite(parsed) && !Number.isNaN(parsed);
};
