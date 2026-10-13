export const STRING_NUMBER_TRANSFORMER = {
  to: (value: number) => value,
  from: (value: string | null) => (value === null ? null : Number(value)),
};
