import mix from 'laravel-mix'
import tailwindcss from 'tailwindcss'

mix.setPublicPath('public')
    .js('./src/js/app.js', 'js')
    .postCss('./src/css/app.css', 'css', [tailwindcss])

mix.copy('src/images', 'public/images').copy('src/fonts', 'public/fonts')

mix.options({
    processCssUrls: false,
    terser: { extractComments: false },
})

if (!mix.inProduction()) {
    mix.sourceMaps().webpackConfig({ devtool: 'source-map' })
}
