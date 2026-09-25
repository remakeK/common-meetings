import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage';
import CreateEventPage from './pages/CreateEventPage';
import EventPage from './pages/EventPage';
import EventChatPage from './pages/EventChatPage';
import MyEventsPage from './pages/MyEventsPage';
import Header from "./components/Header"

function App() {
    return (
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/create" element={<CreateEventPage />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/events/:id/chat" element={<EventChatPage/>} />
        <Route path="/events/joined" element={<MyEventsPage/>} />
      </Routes>
      </BrowserRouter>
      )
}

export default App