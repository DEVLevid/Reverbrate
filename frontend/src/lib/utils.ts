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
