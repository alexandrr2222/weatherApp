import { parse, format } from "date-fns";
export function timeConverter(times, timeText) {
  if (timeText.textContent === "12h") {
    timeText.textContent = "24h";
    Array.from(times).forEach((time) => {
      const currentTime = time.textContent;
      const parsed = parse(currentTime, "HH:mm", new Date());
      if (time.classList.contains("timeHour"))
        time.textContent = format(parsed, "h a");
      else time.textContent = format(parsed, "h:mm a");
    });
  } else if (timeText.textContent === "24h") {
    timeText.textContent = "12h";
    Array.from(times).forEach((time) => {
      let parsed;
      const currentTime = time.textContent;
      if (time.classList.contains("timeHour"))
        parsed = parse(currentTime, "hh a", new Date());
      else parsed = parse(currentTime, "hh:mm a", new Date());
      time.textContent = format(parsed, "HH:mm");
    });
  }
}
