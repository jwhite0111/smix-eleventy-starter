// Gulp tasks
import { series, parallel } from "gulp";
import { css, cssPurgeMin, cssWatcher } from "./gulp_tasks/css.babel";
import { js } from "./gulp_tasks/js.babel";
import { img, imgWatcher } from "./gulp_tasks/img.babel";
import { font, fontWatcher } from "./gulp_tasks/font.babel";
import { html } from "./gulp_tasks/html.babel";
import { eleventyBuild, eleventyWatch } from "./gulp_tasks/eleventy.babel";

// Public Tasks
const production = series(
	eleventyBuild,
	parallel(css, js, img, font),
	cssPurgeMin,
	html
);

const develop = series(
	parallel(
		series(
			parallel(css, js, img, font),
			parallel(cssWatcher, imgWatcher, fontWatcher, eleventyWatch)
		)
	)
);

export { production, develop };
