import { HexGeometry } from "../hexGeometry";

test("generate HexGeometry from coordinate", () => {
	const h = HexGeometry.fromCoord("0201");
	expect(h.primitives.col).toBe(2);
	expect(h.primitives.row).toBe(1);
	expect(h.primitives.q).toBe(2);
	expect(h.primitives.r).toBe(0);
});
