module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:import/recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb',
		'airbnb-typescript',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['import', 'react', 'react-hooks', '@typescript-eslint', 'prettier'],
	rules: {
		'react/react-in-jsx-scope': 0,
		'react/prefer-stateless-function': 0,
		'react/jsx-filename-extension': 0,
		'react/jsx-one-expression-per-line': 0,
		'no-nested-ternary': 0,
	},
};
