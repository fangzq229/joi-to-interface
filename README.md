# joi-to-interface

根据 joi 生成 interface

joi 地址 [https://www.npmjs.com/package/joi](https://www.npmjs.com/package/joi)

## 安装

```
npm install joi-to-interface --save --dev

yarn add joi-to-interface --dev
```

## 使用
```
import * as joi from 'joi';
import { joiToInterface } from 'joi-to-interface';

const IdIn = joi.object().keys({
  id: joi.number().required().description('id'),
});

const idInterface = await joiToInterface({ IdIn });
console.log(idInterface)
```

### 输出 
```
export interface IdIn {
  /**
   * id
   */
  id: number;
}
```

## CLI
### package.json 添加
```
"scripts": {
	"j2i": "joi-to-interface" // 添加这行
}
```

###使用
```
yarn j2i [filePath] [outPath]  // filePath 文件路径 outPath 输出目录（ 项目目录相对路径） 

// 例如 项目目录下  src/scheams/user.ts  joi文件   输出 src/interface/ 下
yarn j2i   src/scheams/user.ts src/interface/
```