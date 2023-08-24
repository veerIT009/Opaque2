const mix = require("laravel-mix");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.extract();
mix.options({
    postCss: [require("autoprefixer")],
});

mix.setPublicPath("public");

mix.webpackConfig({
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "@": __dirname + "resources",
        },
    },
    output: {
        chunkFilename: "js/chunks/[name].js",
    },
    stats: {
        children: true,
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new CompressionPlugin({
            algorithm: "gzip",
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
});

// mix.js("resources/js/app.js", "public/js").postCss(
//     "resources/css/app.css",
//     "public/css/app.css",
//     [require("tailwindcss")]
// );
// mix.js("resources/pos/src/admin/index.js", "public/js/app.js").version();
// mix.css("resources/css/app.css", "public/css/app.css");

mix.js("resources/pos/src/index.js", "public/js/app.js")
    .postCss("resources/css/app.css", "public/css/app.css", [])
    .sourceMaps()
    .react()
    .version();
mix.copyDirectory("resources/images", "public/images");
