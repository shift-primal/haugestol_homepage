const STORAGE_KEY = "contact-prefill";
export const CONTACT_PREFILL_EVENT = "contact-prefill";

export const requestContactPrefill = (message: string) => {
    try {
        sessionStorage.setItem(STORAGE_KEY, message);
    } catch {}
    window.dispatchEvent(new Event(CONTACT_PREFILL_EVENT));
};

export const takeContactPrefill = () => {
    try {
        const message = sessionStorage.getItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
        return message;
    } catch {
        return null;
    }
};
