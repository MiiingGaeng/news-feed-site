import FeedProvider from './contexts/FeedContext';
import Router from './shared/Router';
import { GlobalWrapper } from './styles/styledComponents';

const App = () => {
  return (
    <>
      <GlobalWrapper />
      <FeedProvider>
        <Router />
      </FeedProvider>
    </>
  );
};

export default App;
