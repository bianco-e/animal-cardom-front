import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import router from "./Router"
import { Provider } from "react-redux"
import { ThemeProvider } from "styled-components"
import theme, { GlobalStyle } from "./styles"
import AuthProvider from "./0auth/Provider"
import { RouterProvider } from "react-router-dom"
import store from "./redux"

const root = createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider>
          <>
            <GlobalStyle />
            <RouterProvider router={router} />
          </>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
