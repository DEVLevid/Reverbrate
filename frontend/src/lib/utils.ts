export function formatMillisecondsToMMSS(milliseconds: number): string {
  if (
    typeof milliseconds !== "number" ||
    isNaN(milliseconds) ||
    milliseconds < 0
  ) {
    return "00:00";
  }

  const totalSeconds = Math.floor(milliseconds / 1000);

  const minutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const formatter = new Intl.RelativeTimeFormat('pt-BR', {
    numeric: 'auto'
  });

  const DIVISIONS = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' }
  ];

  const now = new Date();
  let duration = (dateObj.getTime() - now.getTime()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name as Intl.RelativeTimeFormatUnit);
    }
    duration /= division.amount;
  }

  return formatter.format(Math.round(duration), 'years');
}
