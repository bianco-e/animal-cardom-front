import { BrowserRouter } from "react-router-dom"
import Router from "./Router"
import { Provider } from "react-redux"
import { ThemeProvider } from "styled-components"
import theme, { GlobalStyle } from "./styles"
import { HandsContext } from "./context/HandsContext"
import AuthProvider from "./0auth/Provider"
import store from "./redux"

export default function Main() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider>
          <HandsContext>
            <>
              <GlobalStyle />
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </>
          </HandsContext>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  )
}
