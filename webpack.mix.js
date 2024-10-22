const mix = require('laravel-mix')

mix.setPublicPath('assets')
	.js('./src/js/app.js', 'js')
	.postCss('./src/css/app.css', 'css', [require('tailwindcss')])

mix.copy('src/images', 'assets/images').copy('src/fonts', 'assets/fonts')

mix.options({
	processCssUrls: false,
	terser: { extractComments: false },
})

if (!mix.inProduction()) {
	mix.sourceMaps().webpackConfig({ devtool: 'source-map' })
}
