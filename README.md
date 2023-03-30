# Legendary

[![codecov](https://codecov.io/gh/gisikw/legendary/branch/main/graph/badge.svg?token=GR5O02004D)](https://codecov.io/gh/gisikw/legendary)

---

Legendary text-to-hexmap tool inspired by
[TextMapper](https://campaignwiki.org/text-mapper). It takes a description of a
map and generates an abstract syntax tree that be transformed into an SVG
visualization of the map..

## LegendML

Maps are defined using a domain-specific language called "Legendary Markup
Language", so named because the text provided can be seen as being the legend
of the map. Example input looks like:

```lml
orientation: flat-top
map title : The greatest map ever

0000 [[Link to a Water File]] water
0001 forest "The Woods"
0100 water

0101 grass     castle-icon "The Keep"
0102 [[The Fields]] grass "The Fields"

0103 [[Pyramid's Panic]]  desert   pyramid
0104 [[Endgame: The end is near]] desert temple "The - Evil: Temple"

0203

0001-0101-0102 road
0102-0100 river "The River Label"
```

## SVG Rendering

While all syntax can be parsed, not all of the description is rendered. Below
you can find the latest visualization from the prior snippet:

<p align="center">
<img src="https://github.com/gisikw/legendary/blob/main/example.svg" alt="Example Map" />
</p>

## Special Thanks
- [Red Blob Games on Hexagonal Grids](https://www.redblobgames.com/grids/hexagons/)
