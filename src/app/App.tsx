import { Suspense } from "react";
import AppRouter from "./providers/router/ui/AppRouter";
import { useTheme } from "./providers/ThemeProvider";
import { classNames } from "shared/lib/classNames/classNames";
import { Loader } from "shared/ui/Loader/Loader";

function App() {
  const { theme } = useTheme()
  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<Loader />}>
        <div className="content-page">
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
