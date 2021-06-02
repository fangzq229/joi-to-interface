"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('babel-register')({
    presets: ['env']
});
var joi_to_interface_1 = require("./lib/joi-to-interface");
joi_to_interface_1.joiToInterface();
