import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useHistory } from "react-router"
import { AuthUser } from "../interfaces"
import { loginUser } from "../redux/actions/auth"
import { useAppDispatch } from "./redux-hooks"

export default function useLogin() {
  const { user, isAuthenticated, isLoading } = useAuth0<AuthUser>()
  const dispatch = useAppDispatch()
  const { push } = useHistory()

  useEffect(() => {
    if (isLoading) return
    if (!isLoading && (!isAuthenticated || !user)) return push("/")
    //@ts-ignore
    dispatch(loginUser(user!))
  }, [isLoading, isAuthenticated, user]) //eslint-disable-line

  return null
}
