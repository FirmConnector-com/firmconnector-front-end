//Access Main route defined in route config
import MainRoute from "./route/MainRoute";
import AuthProvider from "../src/context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <MainRoute />
    </AuthProvider>
  );
};

export default App;
