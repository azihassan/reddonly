export function timeAgo(unixTimestamp: number): string {
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const ranges: Record<string, number> = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = unixTimestamp - Date.now() / 1000;

  for (const unit in ranges) {
    if (ranges[unit] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[unit];
      return formatter.format(
        Math.round(delta),
        unit as Intl.RelativeTimeFormatUnit
      );
    }
  }
  return formatter.format(secondsElapsed, "day");
}
