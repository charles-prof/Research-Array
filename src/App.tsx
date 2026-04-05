import './styles/layout.css';
import { LibraryPane } from './components/LibraryPane';
import { ActiveLens } from './components/ActiveLens';
import { StrategicSidebar } from './components/StrategicSidebar';

function App() {
  return (
    <div className="app-layout">
      <LibraryPane />
      <ActiveLens />
      <StrategicSidebar />
    </div>
  );
}

export default App;
