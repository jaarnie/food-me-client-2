const apiVersion = 'v2.1'
const serverApiVersion = 'v1'

const roots = {
  search: `https://developers.zomato.com/api/${apiVersion}`,
  headers: {
    "Content-Type": "application/json",
    "user-key": "87be592b7c816cd2e00737b271776b7f"
  },
  server: `http://localhost:7000/api/${serverApiVersion}`,
  serverHeaders: {
    "Content-Type": "application/json"
  }
}


export const searchRoot = roots.search
export const headersRoot = roots.headers
export const serverRoot = roots.server
export const serverHeaders = roots.serverHeaders
