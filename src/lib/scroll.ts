export const PAGE_SCROLL_CONTAINER_ID = "page-scroll";

// smooth scrolling is motion: respect the visitor's reduced-motion setting
export const scrollBehavior = (): ScrollBehavior =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";

export const scrollPageToTop = () => {
    document.getElementById(PAGE_SCROLL_CONTAINER_ID)?.scrollTo({
        top: 0,
        behavior: scrollBehavior(),
    });
};
