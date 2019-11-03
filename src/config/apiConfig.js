const apiVersion = 'v2.1'
const roots = {
  search: `https://developers.zomato.com/api/${apiVersion}`,
  headers: {
    "Content-Type": "application/json",
    "user-key": "87be592b7c816cd2e00737b271776b7f"
  }
}

export const searchRoot = roots.search
export const headersRoot = roots.headers
