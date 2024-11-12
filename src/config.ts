/** 域名 */
export const baseUrl = import.meta.env.VITE_SERVER_BASEURL
/** H5域名 */
export const baseUrlH5 = import.meta.env.VITE_H5_BASEURL

/** 平台 常规接口域名 */
export const host = baseUrl + '/ksr-api'
/** saas 常规接口域名 */
// export const saasHost = baseUrl + '/ksr-saas'
/** 本地联调的必要参数 */
export const version = import.meta.env.VITE_WEB_VERSION
