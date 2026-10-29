export const isNotEmpty = (v: string): boolean => v.trim().length > 0;

export const minLen = (v: string, n: number): boolean => v.trim().length >= n;

export const maxLen = (v: string, n: number): boolean => v.trim().length <= n;

export const isPositiveInt = (v: string, min = 1): boolean => {
  const n = Number(v);
  return Number.isInteger(n) && n >= min;
};

export const isFutureDate = (iso: string): boolean => {
  if (!iso) return false;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() > Date.now();
};

export const isEmail = (v: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());