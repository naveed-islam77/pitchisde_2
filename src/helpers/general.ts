import { format } from "date-fns";

export const formatCurrencyShort = (amount: number | string) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(num)) return amount;

  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return num.toString();
  }
};


export function formatDate(isoString: string): string {
  if (!isoString) return "";
  try {
    return format(new Date(isoString), "d MMM yyyy HH:mm");
  } catch (error) {
    console.error("Invalid date:", isoString, error);
    return isoString;
  }
}