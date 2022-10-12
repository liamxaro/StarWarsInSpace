const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    /* This is what bruno had also */
    entry:{ 
        script: [path.resolve(__dirname, '../src/javascript/script.js')],
        spacebattle: [path.resolve(__dirname, '../src/javascript/spacebattlescript.js')]
    },
    output:
    {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: 'index.html',
            chunks: ['script'],
            minify: true
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/pages/spacebattle.html'),
            filename: 'spacebattle.html',
            chunks: ['spacebattle'],
            minify: true
        }),
        

        
        new MiniCSSExtractPlugin()
    ],
    module:
    {
        rules:
        [
            // HTML removed () around the html in test
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

        {
            test: /\.css$/, //THIS IS NEW FROM THE INTERNET AND WORKS FOR NOW
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                    importLoaders: 1,
                    modules: true,
                    },
                },
            ],
            include: /\.module\.css$/,
        },
        {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
        },

            // // CSS THIS IS THE ORIGINAL FROM BRUNO
            // {
            //     test: /\.css$/,
            //     use:
            //     [
            //         MiniCSSExtractPlugin.loader,
            //         'css-loader'
            //     ]
            // },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            },

            // Shaders
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                type: 'asset/source',
                generator:
                {
                    filename: 'assets/images/[hash][ext]'
                }
            }
        ]
    }
}
