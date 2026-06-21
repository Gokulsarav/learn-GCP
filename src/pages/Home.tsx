import { useState, useEffect } from 'react';
import { LogOut, Truck, Navigation2, Gauge, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RouteAnimation } from '../components/RouteAnimation';
import { StatCard } from '../components/StatCard';

export default function HomePage() {
  const [now, setNow] = useState(new Date());
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Admin';

  useEffect(() => {
    // Basic auth check
    if (localStorage.getItem('authed') !== 'true') {
      navigate('/login');
    }

    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authed');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="ftl-home">
      <header className="ftl-home-header">
        <div>
          <span className="ftl-eyebrow ftl-eyebrow-light">
            <span className="ftl-online-dot" /> LIVE CONSOLE
          </span>
          <h1>{greeting}, {username}.</h1>
          <p className="ftl-muted">{now.toDateString()} &middot; {timeStr}</p>
        </div>
        <button className="ftl-logout" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </header>

      <section className="ftl-stats">
        <StatCard icon={<Truck size={20} />} label="Vehicles online" value={42} delay={0} accent="#34D399" />
        <StatCard icon={<Navigation2 size={20} />} label="Active routes" value={17} delay={120} accent="#22D3EE" />
        <StatCard icon={<Gauge size={20} />} label="Km covered today" value={1280} delay={240} accent="#FBBF24" />
        <StatCard icon={<Bell size={20} />} label="Open alerts" value={3} delay={360} accent="#F87171" />
      </section>

      <section className="ftl-map-panel">
        <div className="ftl-map-panel-head">
          <h3>Today's route flow</h3>
          <span className="ftl-muted">depot → checkpoints → live position</span>
        </div>
        <RouteAnimation variant="horizontal" />
      </section>
    </div>
  );
}
