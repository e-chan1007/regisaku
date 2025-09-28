const { format } = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "medium",
  timeStyle: "medium",
  timeZone: "Asia/Tokyo",
});

export function formatDate(date: Date) {
  if (!date) return "";
  return format(date);
}
