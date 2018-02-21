const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const cleanPaths = [
    './scripts/dist',
    './styles/dist'
]

module.exports = {
    entry: {
        app: './scripts/app.js',
        userApp: './scripts/pageScripts/UserInfo.js',
        globalStyle: './styles/sass/init.scss'
        //bootstrap4: './styles/sass/bootstrap/bootstrap-grid.scss'
    },
    output: {
        path: path.resolve(__dirname, './scripts/dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            /* {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader']
                })
            }, */
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                      js: 'babel-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader!autoprefixer-loader!sass-loader',
                    fallback: 'style-loader'
                })
            }
        ],
    },
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '../../styles/dist/[name].bundle.css',
            allChunks: true
        }),
        new CleanWebpackPlugin(cleanPaths)
    ],
    devServer: {
        contentBase: '.',
        historyApiFallback: true,
        inline: true,
        open: true
    }
}