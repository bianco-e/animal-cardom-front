const getToken = () => sessionStorage.getItem("ac-token")

export const postMethod = (body: any) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  },
  body: JSON.stringify(body),
})

export const putMethod = (body: any) => ({
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  },
  body: JSON.stringify(body),
})

export const deleteMethod = (body: any) => ({
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  },
  body: JSON.stringify(body),
})