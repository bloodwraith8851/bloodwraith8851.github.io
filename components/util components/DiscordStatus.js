'use client';
import React, { useEffect, useRef, useState } from 'react';

const LANYARD_WS = 'wss://api.lanyard.rest/socket';
const USER_ID = '829301078687612938';

const statusColor = {
  online: 'bg-green-500',
  idle: 'bg-yellow-500',
  dnd: 'bg-red-500',
  offline: 'bg-gray-500',
};

const deviceIcons = {
  desktop: '🖥️',
  mobile: '📱',
  web: '🌐',
};

function timeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function DiscordStatus() {
  const [status, setStatus] = useState('offline');
  const [spotify, setSpotify] = useState(null);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState(null);
  const [devices, setDevices] = useState([]);
  const [lastSeen, setLastSeen] = useState(null);
  const [open, setOpen] = useState(false);

  const ws = useRef(null);
  const heartbeatRef = useRef(null);
  const dropdownRef = useRef(null);

  // Load lastSeen from localStorage only in browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lastSeenTimestamp');
      if (saved) {
        setLastSeen(parseInt(saved));
      }
    }
  }, []);

  // Handle dropdown click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const connectWebSocket = () => {
      ws.current = new WebSocket(LANYARD_WS);

      ws.current.onopen = () => {
        ws.current.send(JSON.stringify({ op: 2, d: { subscribe_to_id: USER_ID } }));
      };

      ws.current.onmessage = (event) => {
        const payload = JSON.parse(event.data);

        if (payload.op === 1) {
          heartbeatRef.current = setInterval(() => {
            ws.current?.send(JSON.stringify({ op: 3 }));
          }, payload.d.heartbeat_interval);
        }

        if (payload.t === 'INIT_STATE' || payload.t === 'PRESENCE_UPDATE') {
          const d = payload.d;

          setUser(d.discord_user);
          setSpotify(d.listening_to_spotify ? d.spotify : null);
          setActivities(d.activities || []);

          const onlineDevices = [];
          if (d.active_on_discord_desktop) onlineDevices.push('desktop');
          if (d.active_on_discord_mobile) onlineDevices.push('mobile');
          if (d.active_on_discord_web) onlineDevices.push('web');
          setDevices(onlineDevices);

          // Handle last seen logic
          if (d.discord_status === 'offline' && status !== 'offline') {
            const now = Date.now();
            if (typeof window !== 'undefined') {
              localStorage.setItem('lastSeenTimestamp', now.toString());
            }
            setLastSeen(now);
          } else if (d.discord_status !== 'offline') {
            setLastSeen(null);
            if (typeof window !== 'undefined') {
              localStorage.removeItem('lastSeenTimestamp');
            }
          }

          setStatus(d.discord_status || 'offline');
        }
      };

      ws.current.onclose = () => {
        clearInterval(heartbeatRef.current);
        setTimeout(connectWebSocket, 3000); // retry
      };
    };

    connectWebSocket();

    return () => {
      ws.current?.close();
      clearInterval(heartbeatRef.current);
    };
  }, [status]);

  const mainActivity = activities.find(a => a.type === 0 && a.name !== 'Spotify');
  const customStatus = activities.find(a => a.type === 4);

  const avatarUrl = user?.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-medium px-4 py-1.5 text-white rounded hover:bg-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
      >
        Discord ▾
      </button>

      <div
        className={`absolute left-0 mt-2 w-80 transform transition-all duration-300 origin-top z-50 ${
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-[#2c2c2c] text-white rounded-md shadow-xl border border-[#4f4f4f] p-4 space-y-4">
          {user && (
            <div className="flex items-center space-x-3">
              <img src={avatarUrl} alt="User avatar" className="w-12 h-12 rounded-full border border-gray-600" />
              <div>
                <p className="font-semibold text-base">{user.username}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 capitalize">
                  <span className={`w-2 h-2 rounded-full ${statusColor[status]}`} />
                  <span>{status}</span>
                </div>
                {lastSeen && (
                  <p className="text-xs text-gray-400 italic">Last seen: {timeAgo(lastSeen)}</p>
                )}
              </div>
            </div>
          )}

          {devices.length > 0 && (
            <div className="text-xs text-gray-400 flex gap-2 items-center">
              <span className="font-semibold">Active on:</span>
              {devices.map(device => (
                <span key={device}>{deviceIcons[device]}</span>
              ))}
            </div>
          )}

          {customStatus && (
            <div className="bg-[#3a3a3a] px-3 py-2 rounded flex items-center space-x-2 text-sm italic text-gray-300">
              {customStatus.emoji && <span className="text-lg">{customStatus.emoji.name}</span>}
              <p>{customStatus.state}</p>
            </div>
          )}

          {mainActivity ? (
            <div>
              <p className="text-sm font-semibold flex items-center">
                🎮 {mainActivity.name}
                {mainActivity.timestamps?.start && (
                  <span className="ml-2 text-xs text-gray-400">
                    ({timeAgo(mainActivity.timestamps.start)})
                  </span>
                )}
              </p>
              {mainActivity.details && (
                <p className="text-xs text-gray-400">→ {mainActivity.details}</p>
              )}
              {mainActivity.state && (
                <p className="text-xs text-gray-400">→ {mainActivity.state}</p>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-400">No active game</p>
          )}

          {spotify ? (
            <div className="flex items-start space-x-3 bg-[#3a3a3a] px-3 py-2 rounded">
              <img src={spotify.album_art_url} alt="Album Art" className="w-12 h-12 rounded" />
              <div>
                <p className="text-sm font-medium">{spotify.song}</p>
                <p className="text-xs text-gray-400">{spotify.artist}</p>
                <a
                  href={`https://open.spotify.com/track/${spotify.track_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-400 underline hover:text-green-300"
                >
                  Listen on Spotify
                </a>
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-400">Not listening to Spotify</p>
          )}
        </div>
      </div>
    </div>
  );
}
