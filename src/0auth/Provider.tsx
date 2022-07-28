import { Auth0Provider } from "@auth0/auth0-react"

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const REACT_APP_0AUTH_DOMAIN = process.env.REACT_APP_0AUTH_DOMAIN
  const REACT_APP_0AUTH_CLIENT_ID = process.env.REACT_APP_0AUTH_CLIENT_ID
  const REDIRECT_URI = `${window.location.origin}/menu`
  return (
    <Auth0Provider
      domain={REACT_APP_0AUTH_DOMAIN!}
      clientId={REACT_APP_0AUTH_CLIENT_ID!}
      redirectUri={REDIRECT_URI!}
      useRefreshTokens={true}
      cacheLocation="localstorage">
      {children}
    </Auth0Provider>
  )
}
