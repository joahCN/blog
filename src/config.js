/**
 * Created by mac on 17/12/28.
 */

let isDevMode = process.env.NODE_ENV == 'development';
export default {
  serverUrl: isDevMode ? 'http://127.0.0.1:7001' : '',
  imageServerUrl: isDevMode ? 'http://127.0.0.1:7001' : ''
}
