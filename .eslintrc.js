require('@rushstack/eslint-patch/modern-module-resolution')
module.exports = {
  extends: ['@rushstack/eslint-config/profile/node'],
  ignorePatterns: ['examples'],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
