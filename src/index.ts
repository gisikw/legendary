import { SVGTranspiler } from "./svgTranspiler.js";

export const Legendary = {
	convertToSvg: function (input: string): string {
		return new SVGTranspiler(input).transpile();
	},
};
