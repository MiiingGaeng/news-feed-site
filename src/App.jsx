import AuthProvider from "./contexts/AuthContext";
import FeedProvider from "./contexts/FeedContext";
import Router from "./shared/Router";
import { GlobalWrapper } from "./styles/styledComponents";

const App = () => {
  return (
    <>
      <GlobalWrapper />
      <AuthProvider>
        <FeedProvider>
          <Router />
        </FeedProvider>
      </AuthProvider>
    </>
  );
};

export default App;
