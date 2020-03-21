const apiVersion = 'v2.1'
const serverApiVersion = 'v1'

const roots = {
  search: `https://developers.zomato.com/api/${apiVersion}`,
  headers: {
    'Content-Type': 'application/json',
    'user-key': process.env.REACT_APP_ZOMATO_API_KEY,
  },
  server: `http://localhost:7000/api/${serverApiVersion}`,
  serverHeaders: {
    'Content-Type': 'application/json',
  },
  postcode: `https://api.postcodes.io/postcodes`,
}

export const postcodeAPI = roots.postcode
export const searchRoot = roots.search
export const headersRoot = roots.headers
export const serverRoot = roots.server
export const { serverHeaders } = roots
