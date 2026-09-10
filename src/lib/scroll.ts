// The page's actual scrolling element isn't <body> — see __root.tsx, which
// keeps the whole layout pinned via `fixed inset-0` and scrolls this inner
// container instead. Anything that needs to scroll the page (rather than a
// specific section into view) has to target this id.
export const PAGE_SCROLL_CONTAINER_ID = "page-scroll";

export const scrollPageToTop = () => {
    document.getElementById(PAGE_SCROLL_CONTAINER_ID)?.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};
