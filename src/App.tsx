import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Onboarding } from './pages/Onboarding';
import { AILoading } from './pages/AILoading';
import { Dashboard } from './pages/Dashboard';
import { Grants } from './pages/Grants';
import { Investors } from './pages/Investors';
import { Roadmap } from './pages/Roadmap';
import { Profile } from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/ai-loading" element={<AILoading />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/grants" element={<Grants />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
