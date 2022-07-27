import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Route, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AuthUser } from "../interfaces"

interface IProps {
  children: JSX.Element
}

export default function PrivateRoute({ children }: IProps) {
  const { user, isAuthenticated, isLoading } = useAuth0<AuthUser>()
  const dispatch = useDispatch()
  const { push } = useHistory()
  const [showSpinner, setShowSpiiner] = useState<boolean>(false)

  useEffect(() => {
    if (!isAuthenticated || !user) return
    if (!user.sub) return
  }, [isAuthenticated, user])

  return <Route>{children}</Route>
}
