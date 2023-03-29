import { SVGTranspiler } from "./svgTranspiler";

export const Legendary = {
	convertToSvg: function (input: string): string {
		return new SVGTranspiler(input).transpile();
	},
};
