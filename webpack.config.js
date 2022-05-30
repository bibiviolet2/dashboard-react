const path = require('path');

module.exports = {
    mode: 'production',
    entry: ['./src/index.tsx', './src/global-styles/styles.scss'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js',
    },
    resolve: {
        extensions: [
            '.ts',
            '.js',
            '.tsx',
            '.jsx',
            '.json',
            'scss',
            'css',
            'less',
            '...',
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    // `.swcrc` in the root can be used to configure swc
                    loader: 'swc-loader',
                },
            },
            {
                test: /\.module\.s(a|c)ss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                exportLocalsConvention: 'camelCase',
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                        },
                    },
                    {
                        loader: 'extract-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
};
