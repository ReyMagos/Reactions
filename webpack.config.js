const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const SOURCES_PATH = "frontend";

module.exports = {
    mode: "development",
    entry: {
        index: `./${SOURCES_PATH}/index.tsx`,
    },
    devtool: "inline-source-map",
    devServer: {
        port: 4200,
        static: "./dist",
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/i,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.ttf$/i,
                type: "asset/resource",
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: "@svgr/webpack",
                        options: {
                            typescript: true,
                        }
                    }
                ],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            Core: path.resolve(__dirname, `${SOURCES_PATH}/core`),
        }
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    test(module) {
                        const common_modules = [
                            path.join("node_modules", "react"),
                            path.join("node_modules", "react"),
                            path.join("node_modules", "scheduler"),
                            path.join(SOURCES_PATH, "core"),
                        ]

                        for (let md of common_modules) {
                            if (module.resource.includes(md)) {
                                return true;
                            }
                        }

                        return false;
                    },
                    name: "common",
                    chunks: "all"
                }
            }
        },
        runtimeChunk: "single"
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ["index"]
        }),
    ],
};