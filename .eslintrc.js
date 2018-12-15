module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jquery": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2015
    },
    "globals": {
        "_": true 
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "new-cap": 0,
        "no-caller": 2,
        "no-undef": 2,
        "no-unused-vars": ["error", { "args": "none" }],
        "no-empty": ["error", { "allowEmptyCatch": true }],
        "no-console": "off"
    }
};