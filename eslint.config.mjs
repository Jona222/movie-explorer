// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    {
        files: ['**/*.{ts,vue}'],
        rules: {
            'no-console': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            'vue/multi-word-component-names': 'off'
        },
    }
)
