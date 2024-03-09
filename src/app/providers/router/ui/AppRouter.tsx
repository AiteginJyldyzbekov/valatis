import { MainRouteConfig } from "shared/config/routeConfig/mainRoutes/MainRoutes"
import Page from "./Page"

const AppRouter = () => {
    return <Page routes={MainRouteConfig} />
}

export default AppRouter