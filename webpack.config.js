const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const SOURCES_PATH = "frontend";

module.exports = {
    mode: "development",
    entry: {
        index: `./${SOURCES_PATH}/index.tsx`,
        account: `./${SOURCES_PATH}/account/index.tsx`,
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    { loader: "postcss-loader" }
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
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
        })
    ],
};