import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function transformSession(session: any) {
  return {
    id: session.id,
    session_type: session.session_type,
    subject: session.subject,
    session_charge: session.session_charge,
    mode: session.mode,
    join_link: session.join_link,
    available_slots_time_and_date: session.available_slots_time_and_date.map((iso: string) => {
      const date = new Date(iso);
      // extract yyyy-mm-dd
      const datePart = date.toISOString().split("T")[0];
      // extract hh:mm (in local time)
      const timePart = date
        .toISOString()
        .split("T")[1]
        .substring(0, 5);
      return { date: datePart, time: timePart };
    }),
  };
}
