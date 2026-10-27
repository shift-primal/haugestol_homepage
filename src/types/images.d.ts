declare module "*&as=img" {
    const out: import("vite-imagetools").Img;
    export default out;
}
declare module "*&as=img&*" {
    const out: import("vite-imagetools").Img;
    export default out;
}

declare module "*&as=picture" {
    const out: import("vite-imagetools").Picture;
    export default out;
}
declare module "*&as=picture&*" {
    const out: import("vite-imagetools").Picture;
    export default out;
}

declare module "*&format=jpg" {
    const src: string;
    export default src;
}
