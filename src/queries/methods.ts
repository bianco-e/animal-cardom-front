const getToken = () => sessionStorage.getItem("ac-token")

export const postMethod = (body: any) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  },
  body: JSON.stringify(body),
})
