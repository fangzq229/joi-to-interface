require('babel-register') ({
    presets: [ 'env' ]
})
import { joiToInterface } from "./lib/joi-to-interface";
export {
  joiToInterface
}