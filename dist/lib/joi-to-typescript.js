#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiToInterface = void 0;
var convert = require('joi-to-json');
var json_schema_to_typescript_1 = require("json-schema-to-typescript");
var fs = require('fs');
var path = require("path");
// cli check param
var _checkParam = function () {
    var filePath = process.argv[process.argv.length - 2];
    var outPath = process.argv[process.argv.length - 1];
    var basePath = path.join(__dirname, '../../../../');
    var fPath = path.join(basePath, filePath);
    var oPath = path.join(basePath, outPath);
    if (process.argv.length < 4) {
        throw new Error('参数 [filePath] 或 [outPath] 不存在');
    }
    try {
        fs.statSync(fPath).isFile() && fs.statSync(oPath).isDirectory();
    }
    catch (error) {
        throw new Error('参数 [filePath] joi文件 并且 [outPath] 为输出目录');
    }
    return { fPath: fPath, oPath: oPath };
};
// interface content create
var _createInterface = function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
    var intCon;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                intCon = '';
                return [4 /*yield*/, Promise.resolve().then(function () { return require(filePath); }).then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b, _i, k, j, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _a = [];
                                    for (_b in res)
                                        _a.push(_b);
                                    _i = 0;
                                    _d.label = 1;
                                case 1:
                                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                                    k = _a[_i];
                                    j = convert(res[k]);
                                    _c = intCon;
                                    return [4 /*yield*/, json_schema_to_typescript_1.compile(j, k, { bannerComment: '' })];
                                case 2:
                                    intCon = _c + _d.sent();
                                    _d.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/, intCon];
        }
    });
}); };
// write file
var _writeFile = function (outFile, interfaceCon) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        fs.writeFile(outFile, interfaceCon, 'utf8', function (err) {
            if (err) {
                throw new Error('写入文件失败');
            }
            console.log('success');
        });
        return [2 /*return*/];
    });
}); };
var joiToInterface = function () { return __awaiter(void 0, void 0, void 0, function () {
    var param, interfaceCon, file, outPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                param = _checkParam();
                return [4 /*yield*/, _createInterface(param.fPath)];
            case 1:
                interfaceCon = _a.sent();
                file = path.parse(param.fPath);
                outPath = path.join(param.oPath, (file === null || file === void 0 ? void 0 : file.base) || "all.ts");
                return [4 /*yield*/, _writeFile(outPath, interfaceCon)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.joiToInterface = joiToInterface;
