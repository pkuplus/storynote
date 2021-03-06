
let config = {
    remote: {
        API_SERVER: 'http://localhost:9000',
        REQUEST_TIMEOUT: 3000,
        ERR_TIMEOUT: -254,
        ERR_REUQEST_FAIL: -253,
    },
    qiniu: {
        server: 'http://upload.qiniu.com/',
        host: '',
        suffix: ''
    },
    title: 'fy 的摸鱼之地',
}


try {
    let pri = require("../private.js")
    config.remote.API_SERVER = pri.default.remote.API_SERVER || config.remote.API_SERVER;
    config.title = pri.default.title || config.title;
    config.qiniu = pri.default.qiniu || config.qiniu;
} catch (e) {}

export default config;
