export function formatDateDDMMYYYY(dateString?: string | null): string {
  if (!dateString) return "—";

  // Try YYYY-MM-DD string parsing directly to avoid timezone offset skew
  const cleanStr = dateString.split("T")[0].trim();
  const parts = cleanStr.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    if (year.length === 4 && month.length === 2 && day.length === 2) {
      return `${day}/${month}/${year}`;
    }
  }

  // Fallback to Date object parsing
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return dateString;
}
