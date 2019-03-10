module.exports = { 
    "extends": [
        "airbnb-base", 
        "plugin:security/recommended"
    ],
    "rules": {
    "quotes": [2, "double", "avoidEscape"],
    "mocha/no-exclusive-tests": "error"
    },
    "plugins": [
        "security",
        "mocha"
    ]
};