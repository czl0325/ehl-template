export const PRODUCT_URL = "http://192.168.9.231:7070"
export const DEVELOP_URL = "http://192.168.9.231:7070"
export const API_URL = process.env.NODE_ENV === 'production' ? PRODUCT_URL : "/api"
