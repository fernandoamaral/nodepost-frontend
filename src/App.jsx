import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PostCreate from './pages/PostCreate';
import PostEdit from './pages/PostEdit';
import PostDetail from './pages/PostDetail';
import Error404 from './pages/Error404';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/posts/create" element={<ProtectedRoute><PostCreate /></ProtectedRoute>} />
          <Route path="/posts/:id/edit" element={<ProtectedRoute><PostEdit /></ProtectedRoute>} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="*" element={<Error404/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
