import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast as toaster, type ToastPosition } from "svelte-5-french-toast";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function toast(message: string, type: "success" | "error" | "warning" | "info" | "loading" ) {
	
	const position: ToastPosition = "top-center";
	
	if (type === "success") {
		toaster.success(message, {
			position
		});
	} else if (type === "error") {
		toaster.error(message, {
			position
		});
	} else if (type === "warning") {
		toaster(message, {
			position
		});
	} else if (type === "info") {
		toaster(message, {
			position
		});
	} else if (type === "loading") {
		toaster.loading(message, {
			position
		});
	}

	return toaster;
}

export function formatDate(date: Date|string|null) {
	if (!date) return '';
	return format(new Date(date), 'dd-MMM-yyyy');
}

export const isEmptyString = (str: string|undefined|null) => str === '' || str === null || str === undefined;

const toSentenceCase = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const slugToTitle = (str: string) => {
	 let title = str.replace(/-/g, ' ');
	 title = title.replace(/\b\w/g, c => c.toUpperCase());
	 return title;
}