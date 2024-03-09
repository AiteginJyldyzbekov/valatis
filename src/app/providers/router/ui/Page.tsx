import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RouteConfigType } from "shared/config/routeConfig/types"
import { Loader } from "shared/ui/Loader/Loader";
import { Header } from "widgets/Header";

export interface PageProps {
    routes: RouteConfigType;
}

const Page: React.FC<PageProps> = ({ routes }) => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {Object.values(routes).map(({ element, path }) => (
                    <Route
                        key={path}
                        element={(
                            <div className="page-wrapper">
                                <Header />
                                {element}
                            </div>
                        )}
                        path={path}
                    />
                ))}
            </Routes>
        </Suspense>
    )
}

export default Page