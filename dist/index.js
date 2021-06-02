"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiToInterface = void 0;
require('babel-register')({
    presets: ['env']
});
var joi_to_interface_1 = require("./lib/joi-to-interface");
Object.defineProperty(exports, "joiToInterface", { enumerable: true, get: function () { return joi_to_interface_1.joiToInterface; } });
