import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast as toaster, type ToastPosition } from "svelte-5-french-toast";

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
