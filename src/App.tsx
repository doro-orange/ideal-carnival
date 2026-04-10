import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';
import Result from './pages/Result';

function App() {
  return (
    <Router basename="/ideal-carnival/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;