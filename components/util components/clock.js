import React, { useState, useEffect, useRef } from "react";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Available themes
const themes = {
  dark: {
    background: "bg-gray-800",
    text: "text-white",
    secondary: "text-gray-300",
    accent: "bg-orange-600 hover:bg-orange-700",
    border: "border-gray-600"
  },
  light: {
    background: "bg-white",
    text: "text-gray-900",
    secondary: "text-gray-600",
    accent: "bg-blue-600 hover:bg-blue-700",
    border: "border-gray-300"
  }
};

// Time zones
const timeZones = [
  { label: "IST (India)", value: "Asia/Kolkata" },
  { label: "EST (New York)", value: "America/New_York" },
  { label: "PST (Los Angeles)", value: "America/Los_Angeles" },
  { label: "GMT (London)", value: "Europe/London" },
  { label: "JST (Tokyo)", value: "Asia/Tokyo" },
  { label: "AEST (Sydney)", value: "Australia/Sydney" }
];

// Countries for holidays
const countries = [
  { label: "India", value: "IN" },
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "GB" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Germany", value: "DE" }
];

// View modes
const VIEW_MODES = {
  MONTH: 'month',
  WEEK: 'week',
  YEAR: 'year'
};

// Event categories
const EVENT_CATEGORIES = {
  WORK: { label: "Work", color: "bg-blue-600", textColor: "text-blue-100" },
  PERSONAL: { label: "Personal", color: "bg-green-600", textColor: "text-green-100" },
  HOLIDAY: { label: "Holiday", color: "bg-red-600", textColor: "text-red-100" },
  BIRTHDAY: { label: "Birthday", color: "bg-purple-600", textColor: "text-purple-100" },
  REMINDER: { label: "Reminder", color: "bg-yellow-600", textColor: "text-yellow-100" }
};

export default function EnhancedCalendarDropdown() {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => new Date());
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [hoveredDate, setHoveredDate] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  
  // Settings
  const [theme, setTheme] = useState('dark');
  const [timeZone, setTimeZone] = useState('Asia/Kolkata');
  const [country, setCountry] = useState('IN');
  const [viewMode, setViewMode] = useState(VIEW_MODES.MONTH);
  const [showSettings, setShowSettings] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  
  // Event form
  const [eventForm, setEventForm] = useState({
    id: null,
    title: '',
    date: '',
    time: '',
    category: 'PERSONAL',
    notes: '',
    recurring: 'none'
  });

  // Notes
  const [dateNotes, setDateNotes] = useState({});
  const [showNotes, setShowNotes] = useState(false);
  const [currentNote, setCurrentNote] = useState('');

  const dropdownRef = useRef(null);
  const API_KEY = "IR8uThsneNHa67uuPcwdQpg32eU323pV";

  const currentTheme = themes[theme];

  // Update currentDate based on timezone
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDate(now);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;
      
      switch (e.key) {
        case 'Escape':
          setOpen(false);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (selectedDate) {
            const newDate = new Date(selectedDate);
            newDate.setDate(newDate.getDate() - 1);
            setSelectedDate(newDate);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (selectedDate) {
            const newDate = new Date(selectedDate);
            newDate.setDate(newDate.getDate() + 1);
            setSelectedDate(newDate);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (selectedDate) {
            const newDate = new Date(selectedDate);
            newDate.setDate(newDate.getDate() - 7);
            setSelectedDate(newDate);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (selectedDate) {
            const newDate = new Date(selectedDate);
            newDate.setDate(newDate.getDate() + 7);
            setSelectedDate(newDate);
          }
          break;
        case 'Enter':
          if (hoveredDate) {
            setSelectedDate(hoveredDate);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, selectedDate, hoveredDate]);

  // Load data from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendar_events');
    const savedNotes = localStorage.getItem('calendar_notes');
    const savedSettings = localStorage.getItem('calendar_settings');
    
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (e) {
        console.error('Failed to load events:', e);
      }
    }
    
    if (savedNotes) {
      try {
        setDateNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to load notes:', e);
      }
    }
    
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setTheme(settings.theme || 'dark');
        setTimeZone(settings.timeZone || 'Asia/Kolkata');
        setCountry(settings.country || 'IN');
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    }
  }, []);

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem('calendar_events', JSON.stringify(events));
  }, [events]);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('calendar_notes', JSON.stringify(dateNotes));
  }, [dateNotes]);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('calendar_settings', JSON.stringify({
      theme,
      timeZone,
      country
    }));
  }, [theme, timeZone, country]);

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // Fetch holidays
  useEffect(() => {
    const year = viewDate.getFullYear();
    setLoading(true);
    setErrorMsg(null);

    async function fetchHolidays(year) {
      try {
        const res = await fetch(
          `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${year}`
        );
        if (!res.ok) throw new Error(`API responded with status ${res.status}`);
        const data = await res.json();

        const filtered = data?.response?.holidays?.map(h => ({
          date: h.date.iso,
          name: h.name,
        })) || [];

        setHolidays(filtered);
      } catch (err) {
        console.error("Failed to fetch holidays:", err);
        setErrorMsg("Failed to load holidays.");
        setHolidays([]);
      } finally {
        setLoading(false);
      }
    }

    fetchHolidays(year);
  }, [viewDate, country]);

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setSelectedDate(null);
        setHoveredDate(null);
        setShowEventForm(false);
        setShowSettings(false);
        setShowSearch(false);
        setShowNotes(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setSelectedDate(null);
    setHoveredDate(null);
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate(null);
    setHoveredDate(null);
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const prevYear = () => {
    setViewDate(prev => new Date(prev.getFullYear() - 1, prev.getMonth(), 1));
  };

  const nextYear = () => {
    setViewDate(prev => new Date(prev.getFullYear() + 1, prev.getMonth(), 1));
  };

  const goToToday = () => {
    const today = new Date();
    setViewDate(today);
    setSelectedDate(today);
  };

  const formatDate = (date) => date.toISOString().split("T")[0];

  const getHoliday = (date) =>
    holidays.find(h => {
      const hDate = new Date(h.date);
      return isSameDay(hDate, date);
    });

  const getEvents = (date) =>
    events.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    });

  const getNotes = (date) => dateNotes[formatDate(date)] || '';

  const isSunday = (date) => date.getDay() === 0;

  const formatTime = (date) => {
    const options = {
      timeZone: timeZone,
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return date.toLocaleTimeString('en-US', options);
  };

  const formatDateInTimezone = (date) => {
    const options = {
      timeZone: timeZone,
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Event handlers
  const handleDateClick = (date) => {
    if (selectedDateRange) {
      if (!dateRange.start || (dateRange.start && dateRange.end)) {
        setDateRange({ start: date, end: null });
      } else if (dateRange.start && !dateRange.end) {
        if (date >= dateRange.start) {
          setDateRange({ ...dateRange, end: date });
        } else {
          setDateRange({ start: date, end: dateRange.start });
        }
      }
    } else {
      setSelectedDate(date);
    }
  };

  const handleDateMouseDown = (date) => {
    if (selectedDateRange) {
      setDragStart(date);
    }
  };

  const handleDateMouseEnter = (date) => {
    setHoveredDate(date);
    if (selectedDateRange && dragStart) {
      if (date >= dragStart) {
        setDateRange({ start: dragStart, end: date });
      } else {
        setDateRange({ start: date, end: dragStart });
      }
    }
  };

  const handleDateMouseUp = () => {
    setDragStart(null);
  };

  // Event management
  const addEvent = () => {
    if (!eventForm.title || !eventForm.date) return;
    
    const newEvent = {
      id: eventForm.id || Date.now(),
      ...eventForm
    };

    if (eventForm.id) {
      setEvents(prev => prev.map(e => e.id === eventForm.id ? newEvent : e));
    } else {
      setEvents(prev => [...prev, newEvent]);
    }

    setEventForm({
      id: null,
      title: '',
      date: '',
      time: '',
      category: 'PERSONAL',
      notes: '',
      recurring: 'none'
    });
    setShowEventForm(false);
  };

  const editEvent = (event) => {
    setEventForm(event);
    setShowEventForm(true);
  };

  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const saveNote = (date) => {
    if (currentNote.trim()) {
      setDateNotes(prev => ({
        ...prev,
        [formatDate(date)]: currentNote
      }));
    } else {
      setDateNotes(prev => {
        const newNotes = { ...prev };
        delete newNotes[formatDate(date)];
        return newNotes;
      });
    }
    setShowNotes(false);
    setCurrentNote('');
  };

  // Search functionality
  const searchResults = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Export functionality
  const exportCalendar = () => {
    const data = {
      events,
      notes: dateNotes,
      settings: { theme, timeZone, country }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calendar-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importCalendar = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.events) setEvents(data.events);
        if (data.notes) setDateNotes(data.notes);
        if (data.settings) {
          setTheme(data.settings.theme || 'dark');
          setTimeZone(data.settings.timeZone || 'Asia/Kolkata');
          setCountry(data.settings.country || 'IN');
        }
      } catch (err) {
        alert('Failed to import calendar data');
      }
    };
    reader.readAsText(file);
  };

  // Render calendar based on view mode
  const renderCalendar = () => {
    if (viewMode === VIEW_MODES.YEAR) {
      return renderYearView();
    } else if (viewMode === VIEW_MODES.WEEK) {
      return renderWeekView();
    } else {
      return renderMonthView();
    }
  };

  const renderMonthView = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysCount = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);

    const blanks = Array.from({ length: firstDay }, () => null);
    const dates = Array.from({ length: daysCount }, (_, i) => new Date(year, month, i + 1));
    const allDays = [...blanks, ...dates];

    const weeks = [];
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7));
    }

    return (
      <table className="w-full border-collapse select-none">
        <thead>
          <tr>
            {dayNames.map((d) => (
              <th key={d} className={`text-xs ${currentTheme.secondary} p-1 text-center`}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((date, idx) => {
                if (!date) return <td key={idx} className="p-1 text-center" />;

                const isToday = isSameDay(date, currentDate);
                const holiday = getHoliday(date);
                const dayEvents = getEvents(date);
                const hasNotes = getNotes(date);
                const isSelected = selectedDate && isSameDay(date, selectedDate);
                const isHovered = hoveredDate && isSameDay(date, hoveredDate);
                const sunday = isSunday(date);
                const inRange = dateRange.start && dateRange.end && 
                  date >= dateRange.start && date <= dateRange.end;

                let classes = "cursor-pointer rounded w-8 h-8 flex items-center justify-center transition-all mx-auto relative ";
                
                if (isSelected) {
                  classes += "bg-orange-600 text-white font-semibold shadow-lg ";
                } else if (inRange) {
                  classes += "bg-orange-300 text-gray-800 ";
                } else if (holiday) {
                  classes += "bg-red-700 text-white font-semibold ";
                } else if (dayEvents.length > 0) {
                  const event = dayEvents[0];
                  const category = EVENT_CATEGORIES[event.category];
                  classes += `${category.color} ${category.textColor} font-semibold `;
                } else if (sunday) {
                  classes += "text-red-400 ";
                } else if (isToday) {
                  classes += "border border-blue-600 font-semibold text-blue-500 ";
                } else if (isHovered) {
                  classes += `${currentTheme.background === 'bg-gray-800' ? 'bg-gray-600' : 'bg-gray-200'} rounded `;
                }

                return (
                  <td key={idx} className="p-1 text-center">
                    <div
                      onClick={() => handleDateClick(date)}
                      onMouseDown={() => handleDateMouseDown(date)}
                      onMouseEnter={() => handleDateMouseEnter(date)}
                      onMouseUp={handleDateMouseUp}
                      onMouseLeave={() => setHoveredDate(null)}
                      title={holiday ? holiday.name : sunday ? "Sunday" : dayEvents.length > 0 ? dayEvents[0].title : ""}
                      className={classes}
                      role="button"
                      tabIndex={0}
                    >
                      {date.getDate()}
                      {dayEvents.length > 1 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full text-xs flex items-center justify-center text-black font-bold">
                          {dayEvents.length}
                        </div>
                      )}
                      {hasNotes && (
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(selectedDate || currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });

    return (
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, idx) => {
          const isToday = isSameDay(date, currentDate);
          const dayEvents = getEvents(date);
          const holiday = getHoliday(date);
          
          return (
            <div key={idx} className={`p-2 border rounded ${currentTheme.border} min-h-24`}>
              <div className={`text-sm font-semibold ${isToday ? 'text-blue-500' : currentTheme.text}`}>
                {dayNames[date.getDay()]} {date.getDate()}
              </div>
              {holiday && (
                <div className="text-xs text-red-400 mt-1">{holiday.name}</div>
              )}
              {dayEvents.map(event => (
                <div key={event.id} className={`text-xs p-1 mt-1 rounded ${EVENT_CATEGORIES[event.category].color} ${EVENT_CATEGORIES[event.category].textColor}`}>
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  const renderYearView = () => {
    const year = viewDate.getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => i);

    return (
      <div className="grid grid-cols-3 gap-4">
        {months.map(month => (
          <div key={month} className="text-center">
            <div className={`text-sm font-semibold mb-2 ${currentTheme.text}`}>
              {monthNames[month]}
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {dayNames.map(day => (
                <div key={day} className={`${currentTheme.secondary} text-center`}>
                  {day[0]}
                </div>
              ))}
              {renderMiniMonth(year, month)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMiniMonth = (year, month) => {
    const daysCount = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const blanks = Array.from({ length: firstDay }, (_, i) => (
      <div key={`blank-${i}`} className="w-4 h-4"></div>
    ));
    
    const dates = Array.from({ length: daysCount }, (_, i) => {
      const date = new Date(year, month, i + 1);
      const isToday = isSameDay(date, currentDate);
      const hasEvents = getEvents(date).length > 0;
      
      return (
        <div
          key={i + 1}
          onClick={() => {
            setViewDate(date);
            setViewMode(VIEW_MODES.MONTH);
          }}
          className={`w-4 h-4 text-center cursor-pointer rounded text-xs flex items-center justify-center
            ${isToday ? 'bg-blue-600 text-white' : hasEvents ? 'bg-orange-600 text-white' : currentTheme.text}
          `}
        >
          {i + 1}
        </div>
      );
    });

    return [...blanks, ...dates];
  };

  const getCurrentMonthHolidays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    return holidays
      .filter(h => {
        const d = new Date(h.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const formatDatePretty = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  };

  const renderDetails = () => {
    const dateToShow = hoveredDate || selectedDate;

    if (!dateToShow) {
      return (
        <div className={`${currentTheme.secondary} text-sm text-center mt-20 select-none`}>
          Hover or click a date to see details here
        </div>
      );
    }

    const dateStr = formatDate(dateToShow);
    const holiday = holidays.find(h => h.date === dateStr);
    const dayEvents = getEvents(dateToShow);
    const notes = getNotes(dateToShow);
    const isSundayDate = isSunday(dateToShow);

    return (
      <div>
        <h3 className={`${currentTheme.text} text-lg font-semibold mb-2 select-none`}>
          {dateToShow.getDate()} {monthNames[dateToShow.getMonth()]} {dateToShow.getFullYear()}
        </h3>
        <p className={`${currentTheme.secondary} mb-1 select-none`}>Day: {dayNames[dateToShow.getDay()]}</p>
        
        {holiday && <p className="text-red-400 font-semibold mb-1 select-none">Holiday: {holiday.name}</p>}
        {isSundayDate && !holiday && <p className="text-red-400 font-semibold mb-1 select-none">Sunday</p>}
        
        {dayEvents.length > 0 && (
          <div className="mb-2">
            <p className={`${currentTheme.text} font-semibold mb-1`}>Events:</p>
            {dayEvents.map(event => (
              <div key={event.id} className={`text-xs p-2 mb-1 rounded ${EVENT_CATEGORIES[event.category].color} ${EVENT_CATEGORIES[event.category].textColor} flex justify-between items-center`}>
                <div>
                  <div className="font-semibold">{event.title}</div>
                  {event.time && <div>{event.time}</div>}
                </div>
                <div className="flex space-x-1">
                  <button onClick={() => editEvent(event)} className="text-white hover:text-gray-300">✏️</button>
                  <button onClick={() => deleteEvent(event.id)} className="text-white hover:text-gray-300">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {notes && (
          <div className="mb-2">
            <p className={`${currentTheme.text} font-semibold mb-1`}>Notes:</p>
            <p className={`text-xs ${currentTheme.secondary} p-2 bg-gray-700 rounded`}>{notes}</p>
          </div>
        )}

        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => {
              setEventForm({ ...eventForm, date: formatDate(dateToShow) });
              setShowEventForm(true);
            }}
            className="text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-white"
          >
            Add Event
          </button>
          <button
            onClick={() => {
              setCurrentNote(notes);
              setShowNotes(true);
            }}
            className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-white"
          >
            Add Note
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`${currentTheme.text} px-4 py-2 rounded flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
      >
        <span>{formatDateInTimezone(currentDate)}</span>
        <span className="ml-2 font-mono text-xs select-none">{formatTime(currentDate)}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className={`absolute top-full left-0 mt-2 w-[800px] rounded-lg ${currentTheme.background} shadow-lg p-5 z-50`}>
          {/* Top toolbar */}
          <div className={`flex justify-between items-center mb-4 border-b ${currentTheme.border} pb-3`}>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode(VIEW_MODES.MONTH)}
                className={`px-3 py-1 rounded text-xs ${viewMode === VIEW_MODES.MONTH ? currentTheme.accent : `${currentTheme.secondary} hover:${currentTheme.text}`}`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode(VIEW_MODES.WEEK)}
                className={`px-3 py-1 rounded text-xs ${viewMode === VIEW_MODES.WEEK ? currentTheme.accent : `${currentTheme.secondary} hover:${currentTheme.text}`}`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode(VIEW_MODES.YEAR)}
                className={`px-3 py-1 rounded text-xs ${viewMode === VIEW_MODES.YEAR ? currentTheme.accent : `${currentTheme.secondary} hover:${currentTheme.text}`}`}
              >
                Year
              </button>
              <button
                onClick={goToToday}
                className={`px-3 py-1 rounded text-xs bg-blue-600 hover:bg-blue-700 text-white`}
              >
                Today
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedDateRange(!selectedDateRange)}
                className={`px-3 py-1 rounded text-xs ${selectedDateRange ? 'bg-purple-600 text-white' : `${currentTheme.secondary} hover:${currentTheme.text}`}`}
              >
                {selectedDateRange ? 'Exit Range' : 'Date Range'}
              </button>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`px-3 py-1 rounded text-xs ${currentTheme.secondary} hover:${currentTheme.text}`}
              >
                🔍
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`px-3 py-1 rounded text-xs ${currentTheme.secondary} hover:${currentTheme.text}`}
              >
                ⚙️
              </button>
            </div>
          </div>

          {/* Search panel */}
          {showSearch && (
            <div className={`mb-4 p-3 border rounded ${currentTheme.border} ${currentTheme.background}`}>
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full p-2 rounded border ${currentTheme.border} bg-gray-700 text-white text-sm`}
              />
              {searchQuery && (
                <div className="mt-2 max-h-32 overflow-y-auto">
                  {searchResults.map(event => (
                    <div key={event.id} className={`p-2 mb-1 rounded text-xs ${EVENT_CATEGORIES[event.category].color} ${EVENT_CATEGORIES[event.category].textColor}`}>
                      <div className="font-semibold">{event.title}</div>
                      <div>{formatDatePretty(event.date)} {event.time}</div>
                    </div>
                  ))}
                  {searchResults.length === 0 && (
                    <div className={`text-xs ${currentTheme.secondary} text-center py-2`}>No events found</div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Settings panel */}
          {showSettings && (
            <div className={`mb-4 p-3 border rounded ${currentTheme.border} ${currentTheme.background}`}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs ${currentTheme.text} mb-1`}>Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full p-1 rounded border bg-gray-700 text-white text-xs"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-xs ${currentTheme.text} mb-1`}>Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-1 rounded border bg-gray-700 text-white text-xs"
                  >
                    {countries.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-xs ${currentTheme.text} mb-1`}>Time Zone</label>
                  <select
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full p-1 rounded border bg-gray-700 text-white text-xs"
                  >
                    {timeZones.map(tz => (
                      <option key={tz.value} value={tz.value}>{tz.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-2 items-end">
                  <button
                    onClick={exportCalendar}
                    className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded"
                  >
                    Export
                  </button>
                  <label className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded cursor-pointer">
                    Import
                    <input type="file" accept=".json" onChange={importCalendar} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Event form */}
          {showEventForm && (
            <div className={`mb-4 p-3 border rounded ${currentTheme.border} ${currentTheme.background}`}>
              <h4 className={`${currentTheme.text} font-semibold mb-2`}>
                {eventForm.id ? 'Edit Event' : 'Add Event'}
              </h4>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Event title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                  className="p-2 rounded border bg-gray-700 text-white text-xs"
                />
                <input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                  className="p-2 rounded border bg-gray-700 text-white text-xs"
                />
                <input
                  type="time"
                  value={eventForm.time}
                  onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                  className="p-2 rounded border bg-gray-700 text-white text-xs"
                />
                <select
                  value={eventForm.category}
                  onChange={(e) => setEventForm({...eventForm, category: e.target.value})}
                  className="p-2 rounded border bg-gray-700 text-white text-xs"
                >
                  {Object.entries(EVENT_CATEGORIES).map(([key, cat]) => (
                    <option key={key} value={key}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Notes (optional)"
                value={eventForm.notes}
                onChange={(e) => setEventForm({...eventForm, notes: e.target.value})}
                className="w-full p-2 rounded border bg-gray-700 text-white text-xs mb-2"
                rows="2"
              />
              <div className="flex space-x-2">
                <button
                  onClick={addEvent}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded"
                >
                  {eventForm.id ? 'Update' : 'Add'}
                </button>
                <button
                  onClick={() => {
                    setShowEventForm(false);
                    setEventForm({
                      id: null,
                      title: '',
                      date: '',
                      time: '',
                      category: 'PERSONAL',
                      notes: '',
                      recurring: 'none'
                    });
                  }}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Notes form */}
          {showNotes && (
            <div className={`mb-4 p-3 border rounded ${currentTheme.border} ${currentTheme.background}`}>
              <h4 className={`${currentTheme.text} font-semibold mb-2`}>Add Note</h4>
              <textarea
                placeholder="Enter your note..."
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                className="w-full p-2 rounded border bg-gray-700 text-white text-xs mb-2"
                rows="3"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => saveNote(selectedDate || hoveredDate)}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowNotes(false);
                    setCurrentNote('');
                  }}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Date range display */}
          {selectedDateRange && dateRange.start && dateRange.end && (
            <div className={`mb-4 p-2 border rounded ${currentTheme.border} ${currentTheme.background} text-center`}>
              <span className={`text-xs ${currentTheme.text}`}>
                Selected Range: {formatDatePretty(formatDate(dateRange.start))} - {formatDatePretty(formatDate(dateRange.end))}
              </span>
              <button
                onClick={() => setDateRange({ start: null, end: null })}
                className="ml-2 text-xs text-red-400 hover:text-red-300"
              >
                Clear
              </button>
            </div>
          )}

          {/* Main content */}
          <div className="grid grid-cols-[280px_1fr] gap-6">
            {/* Left panel */}
            <div className="flex flex-col">
              {renderDetails()}

              {/* Navigation controls */}
              <div className="mt-auto flex justify-between items-center space-x-4 select-none">
                {viewMode === VIEW_MODES.YEAR ? (
                  <>
                    <button
                      onClick={prevYear}
                      className={`${currentTheme.accent} px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    >
                      ‹‹
                    </button>
                    <div className={`${currentTheme.text} font-semibold`}>
                      {viewDate.getFullYear()}
                    </div>
                    <button
                      onClick={nextYear}
                      className={`${currentTheme.accent} px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    >
                      ››
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={prevMonth}
                      className={`${currentTheme.accent} px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    >
                      ‹
                    </button>
                    <div className={`${currentTheme.text} font-semibold select-none`}>
                      {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
                    </div>
                    <button
                      onClick={nextMonth}
                      className={`${currentTheme.accent} px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* Holidays list */}
              <div className={`mt-6 text-xs ${currentTheme.secondary} select-none max-h-32 overflow-y-auto`}>
                <div className={`font-semibold ${currentTheme.text} mb-1`}>Holidays this month:</div>
                {loading ? (
                  <p>Loading...</p>
                ) : errorMsg ? (
                  <p className="text-red-500">{errorMsg}</p>
                ) : (
                  <>
                    {getCurrentMonthHolidays().length === 0 ? (
                      <p>No holidays in this month.</p>
                    ) : (
                      getCurrentMonthHolidays().map(h => (
                        <div
                          key={h.date}
                          className="mb-0.5 cursor-default"
                          title={`${h.name} (${formatDatePretty(h.date)})`}
                        >
                          • {h.name} ({new Date(h.date).getDate()})
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>

              {/* Event categories legend */}
              <div className={`mt-4 text-xs ${currentTheme.secondary} select-none`}>
                <div className={`font-semibold ${currentTheme.text} mb-1`}>Event Categories:</div>
                {Object.entries(EVENT_CATEGORIES).map(([key, cat]) => (
                  <div key={key} className="flex items-center mb-1">
                    <div className={`w-3 h-3 rounded mr-2 ${cat.color}`}></div>
                    <span>{cat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel: Calendar */}
            <div className="overflow-auto max-h-[400px]">
              {renderCalendar()}
            </div>
          </div>

          {/* Footer with keyboard shortcuts */}
          <div className={`mt-4 pt-3 border-t ${currentTheme.border} text-xs ${currentTheme.secondary} text-center`}>
            <div>Keyboard: Arrow keys to navigate • Enter to select • Esc to close • Space for today</div>
          </div>
        </div>
      )}
    </div>
  );
}