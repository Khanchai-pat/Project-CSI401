import dayjs from "dayjs";

export function getDiffAsText(startDate: string | Date, endDate: string | Date): string {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  let years = end.year() - start.year();
  let months = end.month() - start.month();
  let days = end.date() - start.date();

  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = end.subtract(1, 'month').daysInMonth();
    days += daysInPrevMonth;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ปี`);
  if (months > 0) parts.push(`${months} เดือน`);
  if (days > 0) parts.push(`${days} วัน`);

  // ถ้าทุกอย่างเป็น 0 หมด
  if (parts.length === 0) return "วันนี้";

  return parts.join(" ");
}

export function getTrainingDuration(startDate: string): string {
    const start = dayjs(startDate);
    const now = dayjs();
  
    const diffYears = now.diff(start, "year");
    const diffMonths = now.diff(start.subtract(diffYears, "year"), "month");
    const diffDays = now.diff(start.subtract(diffYears, "year").subtract(diffMonths, "month"), "day");
  
    const parts: string[] = [];
    if (diffYears > 0) parts.push(`${diffYears} ปี`);
    if (diffMonths > 0) parts.push(`${diffMonths} เดือน`);
    if (diffDays > 0) parts.push(`${diffDays} วัน`);
  
    return parts.length > 0 ? parts.join(" ") : "วันนี้";
  }