// Lets a button anywhere on the site (e.g. "Be om demo" on /projects) hand a
// starting message to the contact form, which may not be mounted yet. The
// text goes through sessionStorage, so it survives the route change and never
// ends up in the URL.
const STORAGE_KEY = "contact-prefill";
export const CONTACT_PREFILL_EVENT = "contact-prefill";

export const requestContactPrefill = (message: string) => {
    try {
        sessionStorage.setItem(STORAGE_KEY, message);
    } catch {
        // storage unavailable (private browsing): the form just starts empty
    }
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
