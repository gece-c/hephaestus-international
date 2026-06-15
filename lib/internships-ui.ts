import type { Internship } from "@/lib/strapi";

const statusPriority: Record<string, number> = {
  Open: 0,
  "Closing Soon": 1,
  Pending: 2,
  Closed: 3,
  Filled: 3,
};

export type SafeInternship = Internship & { title: string; slug: string };

export function sortInternships(list: Internship[]): SafeInternship[] {
  return [...list]
    .filter((item): item is SafeInternship => Boolean(item.title?.trim() && item.slug?.trim()))
    .sort((a, b) => {
      const ap = statusPriority[a.status] ?? 99;
      const bp = statusPriority[b.status] ?? 99;
      if (ap !== bp) return ap - bp;
      return a.title.localeCompare(b.title);
    });
}

export function internshipStatusClass(status: string): string {
  if (status === "Open") {
    return "bg-brand-primary/15 text-brand-primary transition-[background-color,box-shadow] shadow-[0_0_10px_rgb(18_105_199/0.14)] dark:shadow-[0_0_12px_rgb(18_105_199/0.3)] group-hover:bg-brand-primary/20 group-hover:shadow-[0_0_14px_rgb(18_105_199/0.24)] dark:group-hover:bg-brand-primary/22 dark:group-hover:shadow-[0_0_16px_rgb(18_105_199/0.42)]";
  }
  if (status === "Closed" || status === "Filled") {
    return "bg-rose-500/15 text-rose-700 dark:text-rose-300";
  }
  return "bg-amber-500/15 text-amber-800 dark:text-amber-300";
}

export function formatInternshipLocation(location: string): string {
  if (location.trim().toLowerCase() === "remote") {
    return "On-Site / Remote";
  }
  return location;
}
