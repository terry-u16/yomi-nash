export const togglePayoffSign = (value: string): string => {
  if (value.startsWith("-")) return value.slice(1);
  return `-${value.startsWith("+") ? value.slice(1) : value}`;
};
