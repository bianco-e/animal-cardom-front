import { Redirect, Route } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useAppSelector } from "../hooks/redux-hooks"
import useLogin from "../hooks/useLogin"

interface IProps {
  exact?: boolean
  path: string
  render: () => JSX.Element
}

export default function PrivateRoute({ exact, path, render }: IProps) {
  useLogin()
  const { error, isLoading, isLogged } = useAppSelector(({ auth }) => auth)
  return isLoading ? (
    <Spinner />
  ) : error ? (
    <Redirect to="/error" />
  ) : isLogged ? (
    <Route exact={exact} path={path} render={render} />
  ) : (
    <Redirect to="/" />
  )
}
