import { BrowserRouter } from "react-router-dom"
import Router from "./Router"
import { Provider } from "react-redux"
import { ThemeProvider } from "styled-components"
import theme, { GlobalStyle } from "./styles"
import AuthProvider from "./0auth/Provider"
import store from "./redux"

export default function Main() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider>
          <>
            <GlobalStyle />
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  )
}
