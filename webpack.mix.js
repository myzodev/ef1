const mix = require('laravel-mix')

mix.setPublicPath('dist')
	.js('./src/js/app.js', 'js')
	.postCss('./src/css/app.css', 'css', [require('tailwindcss')])

mix.copy('src/images', 'dist/images').copy('src/fonts', 'dist/fonts')

mix.options({
	processCssUrls: false,
	terser: { extractComments: false },
})

if (!mix.inProduction()) {
	mix.sourceMaps().webpackConfig({ devtool: 'source-map' })
}
