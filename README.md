# Legendary

[![build](https://img.shields.io/github/checks-status/gisikw/legendary/main)](https://github.com/gisikw/legendary/actions)
[![codecov](https://codecov.io/gh/gisikw/legendary/branch/main/graph/badge.svg?token=GR5O02004D)](https://codecov.io/gh/gisikw/legendary)

---

Legendary text-to-hexmap tool inspired by
[TextMapper](https://campaignwiki.org/text-mapper). It takes a description of a
map and generates an abstract syntax tree that be transformed into an SVG
visualization of the map..

## LegendML

Maps are defined using a domain-specific language called "Legendary Markup
Language", so named because the text provided can be seen as being the legend
of the map. An example output and its source input can be viewed below:

<p align="center">
<img src="https://github.com/gisikw/legendary/blob/main/example.svg" alt="Example Map" />
</p>

```lml
orientation: flat-top
map title: The Legendarium

0000 mountains
0001 mountains
0002 mountains
0003 mountains
0004 ocean

0100 mountains
0101 mountains
0102 desert
0103 water
0104 ocean

0200 mountains
0201 plains
0202 plains
0203 desert
0204 water

0300 hills
0301 plains castle "Keep Coding"
0302 plains
0303 desert
0304 ocean

0400 hills
0401 plains
0402 forest "The Arboreal Forest"
0403 water
0404 ocean

0500 swamp
0501 swamp
0502 forest
0503 desert
0504 ocean

0100-0302-0403 river
0102-0201-0301-0500 road "The Legendary Trail"
```

## SVG Rendering

While all syntax can be parsed, not all of the description is rendered. This
project remains a work-in-progress.

## Special Thanks
- [Red Blob Games on Hexagonal Grids](https://www.redblobgames.com/grids/hexagons/)
