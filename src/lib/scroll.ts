export const PAGE_SCROLL_CONTAINER_ID = "page-scroll";

export const scrollPageToTop = () => {
    document.getElementById(PAGE_SCROLL_CONTAINER_ID)?.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};
