#!/usr/bin/env node

const convert = require('joi-to-json');
import { compile } from 'json-schema-to-typescript';
const fs = require('fs');
import * as path from 'path';

// cli check param
const _checkParam = () => {
  const filePath = process.argv[process.argv.length - 2];
  const outPath = process.argv[process.argv.length - 1];
  const basePath = path.join(__dirname, '../../../../');
  const fPath = path.join(basePath, filePath);
  const oPath = path.join(basePath, outPath);
  if (process.argv.length < 4) {
    throw new Error('参数 [filePath] 或 [outPath] 不存在');
  }
  try {
    fs.statSync(fPath).isFile() && fs.statSync(oPath).isDirectory();
  } catch (error) {
    throw new Error('参数 [filePath] joi文件 并且 [outPath] 为输出目录');
  }
  return { fPath, oPath };
};

// interface content create
const _createInterface = async (file: string | Object): Promise<string> => {
  let intCon: string = '';
  if (file && typeof file === 'string') {
    await import(file).then(async res => {
      for (const k in res) {
        const j = convert(res[k]);
        intCon += await compile(j, k, { bannerComment: '' });
      }
    });
  } else if(file && typeof file === 'object') {
    for (const k in file) {
      const j = convert(file[k]);
      intCon += await compile(j, k, { bannerComment: '' });
    }
  } 
  return intCon;
};

// write file
const _writeFile = async (
  outFile: string,
  interfaceCon: string
): Promise<void> => {
  fs.writeFile(outFile, interfaceCon, 'utf8', function (err: any) {
    if (err) {
      throw new Error('写入文件失败');
    }
    console.log('success');
  });
};

export const joiToInterface = async (joiObj:any = '') => {
  if (joiObj && typeof joiObj === 'object') {
    const interfaceCon = await _createInterface(joiObj);
    return interfaceCon;
  };
  const param = _checkParam();
  const interfaceCon = await _createInterface(param.fPath);
  const file = path.parse(param.fPath);
  const oPath = path.join(param.oPath, file?.base || `all.ts`);
  await _writeFile(oPath, interfaceCon);
};
