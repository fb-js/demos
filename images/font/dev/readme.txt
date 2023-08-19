
  BMP-JS Documentation / Development / Fonts

------------------------------------------------------------------------

  Author: Nurudin Imsirovic <github.com/oxou>

  Created: 2023-08-19 05:36 AM
  Updated: 2023-08-19 05:55 AM

  Changelog:
    2023-08-19:
      - First revision

------------------------------------------------------------------------

  I N T R O D U C T I O N
  -----------------------

  To build your own font take a look at the example and grid files.

  Grid that's given here is for monospaced font, meaning each glyph or
  character has equal width and height.

  That fact alone is crucial in the way that BMP-JS loads font atlases
  and calculates their dimensions.  By not following these rules we'll
  get incorrect results.

  If you want to get into more technical explanations and the actual
  implementation then take a look at the bmp_plot_text() function in
  the src/bmp-plot.js file of the bmp-js repository.

------------------------------------------------------------------------

  V A R I A B L E   F O N T S
  ---------------------------

  There is work being done to support variable fonts by means of
  loading atlases with huge glyphs and then using nearest-neighbor
  interpolation to scale down the glyphs to their specified units.

  Such implementation could also benefit from bilinear filtering and
  thus we would have anti-aliased fonts, but such implementation would
  by its nature introduce huge performance hits, so it will stay
  experimental for a foreseeable future.

  These types of fonts would need to ship extra information such as
  position and dimensions for each glyph on the atlas.

  Actual images should be mono-chrome (black and white) with no anti
  aliasing present on the edges of fonts, as BMP-JS will only draw
  fonts that have white (255, 255, 255) and black (0, 0, 0) color
  ranges.

  Yes, it is possible to implement alpha support for such atlases,
  we already have the support for Alpha channels and this could
  also be implemeted without the use of an Alpha channel but having
  those extra steps for setting up your own font is tedious and
  counter-productive, why have the need of setting up a dedicated
  Alpha channel if the rendering function already does it by only
  rendering white pixels.
