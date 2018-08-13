// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parser: 'babel-eslint',
    parserOptions: {
		sourceType: "module",
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
		'standard',
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		"no-cond-assign":0,//禁止在条件表达式中使用赋值语句
		"no-undef": 0,//不能有未定义的变量
		"prefer-promise-reject-errors":0
    },
    globals: {
        App: true,
        Page: true,
        getApp: true,
        getCurrentPages: true,
        wx: true,
        location: true,
        WebSocket: true,
        window: true,
        alert: true,
        Location: true,
        my: true,
        Image: true
    },
}
