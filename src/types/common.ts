export type StoredSchedule = {
  "updated-at": string;
  "bot-message": string;
  "parsed-schedule": { "day-type": string; "departs-from": string; "departs-at": string[]; }[];
}[]