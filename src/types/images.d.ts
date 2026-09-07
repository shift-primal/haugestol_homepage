// vite-imagetools doesn't ship types for its query-directive imports, so we
// declare the two output shapes we use. Keep `as=img`/`as=picture` last in
// the query string so these patterns keep matching.
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
