import React, { useState } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    eventTimings: '',
    eventGMT: '',
    eventLocation: '',
    tickets: false,
    requireApproval: false,
    capacity: 1,
    visibility: 'public',
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const errors = {};

    if (!formData.eventName.trim()) {
      errors.eventName = 'Event Name is required';
    }
    if (!formData.eventDate.trim()) {
      errors.eventDate = 'Event Date is required';
    }
    if (!formData.startDate.trim()) {
      errors.startDate = 'Start Date is required';
    }
    if (!formData.endDate.trim()) {
      errors.endDate = 'End Date is required';
    } else if (new Date(formData.endDate + 'T' + formData.endTime) <= new Date(formData.startDate + 'T' + formData.startTime)) {
      errors.endDate = 'End Date and Time must be after Start Date and Time';
    }
    if (!formData.eventTimings.trim()) {
      errors.eventTimings = 'Event Timings are required';
    }
    if (!formData.eventGMT.trim()) {
      errors.eventGMT = 'Event GMT is required';
    }
    if (!formData.eventLocation.trim()) {
      errors.eventLocation = 'Event Location is required';
    }
    if (formData.tickets && isNaN(formData.capacity)) {
      errors.capacity = 'Capacity must be a number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const createEvent = () => {
    if (validateForm()) {
      const mockApiResponse = { ...formData };

      setEvents((prevEvents) => [...prevEvents, mockApiResponse]);

      setFormData({
        eventName: '',
        eventDate: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        eventTimings: '',
        eventGMT: '',
        eventLocation: '',
        tickets: false,
        requireApproval: false,
        capacity: 1,
        visibility: 'public',
      });

      setSuccessMessage('Event created successfully!');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setSuccessMessage('');
    }
  };

  function showUpcomingEvents() {
    const currentDate = new Date();
    const upcomingEvents = events.filter((event) => new Date(event.startDate + 'T' + event.startTime) > currentDate);

    console.log('Upcoming events:', upcomingEvents);
    // You can update the UI to display the upcoming events as needed
  }

  function showPastEvents() {
    const currentDate = new Date();
    const pastEvents = events.filter((event) => new Date(event.endDate + 'T' + event.endTime) < currentDate);

    console.log('Past events:', pastEvents);
    // You can update the UI to display the past events as needed
  }

  return (
    <div className="App">
      {/* Navbar */}
      <nav>
        <a href="#">Events</a>
        <a href="#">Calendars</a>
        <a href="#">Explore</a>
      </nav>

      {/* Step 1 - Event Creation Page */}
      <h1>Create an Event</h1>
      <form>
        <label htmlFor="eventName">Event Name:</label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          required
        />
        {formErrors.eventName && <p className="error">{formErrors.eventName}</p>}

        <label htmlFor="eventDate">Event Date:</label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          required
        />
        {formErrors.eventDate && <p className="error">{formErrors.eventDate}</p>}

        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
        {formErrors.startDate && <p className="error">{formErrors.startDate}</p>}

        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
        {formErrors.endDate && <p className="error">{formErrors.endDate}</p>}

        <label htmlFor="eventTimings">Event Timings:</label>
        <input
          type="text"
          id="eventTimings"
          name="eventTimings"
          value={formData.eventTimings}
          onChange={handleChange}
          placeholder="e.g., 10:00 AM - 5:00 PM"
          required
        />
        {formErrors.eventTimings && <p className="error">{formErrors.eventTimings}</p>}

        <label htmlFor="eventGMT">Event GMT:</label>
        <input
          type="text"
          id="eventGMT"
          name="eventGMT"
          value={formData.eventGMT}
          onChange={handleChange}
          placeholder="e.g., GMT+0"
          required
        />
        {formErrors.eventGMT && <p className="error">{formErrors.eventGMT}</p>}

        <label htmlFor="eventLocation">Event Location:</label>
        <input
          type="text"
          id="eventLocation"
          name="eventLocation"
          value={formData.eventLocation}
          onChange={handleChange}
          required
        />
        {formErrors.eventLocation && <p className="error">{formErrors.eventLocation}</p>}

        <div id="eventOptions">
          <label>
            <input
              type="checkbox"
              id="tickets"
              name="tickets"
              checked={formData.tickets}
              onChange={handleChange}
            />
            Tickets
          </label>
          <label>
            <input
              type="checkbox"
              id="requireApproval"
              name="requireApproval"
              checked={formData.requireApproval}
              onChange={handleChange}
            />
            Require Approval
          </label>
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            min="1"
            value={formData.capacity}
            onChange={handleChange}
          />
          {formErrors.capacity && <p className="error">{formErrors.capacity}</p>}
          <label htmlFor="visibility">Visibility:</label>
          <select
            id="visibility"
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

         {successMessage && <p className="success">{successMessage}</p>}

        <button type="button" onClick={createEvent}>
          Create Event
        </button>
      </form>

      {/* Step 2 - Listing Page */}
      <h1>Event Listing</h1>
      <nav>
        <a href="#" onClick={showUpcomingEvents}>
          Upcoming
        </a>
        <a href="#" onClick={showPastEvents}>
          Past
        </a>
      </nav>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.eventName} - {event.eventDate} - {event.startDate} - {event.endDate} - {event.eventTimings} - {event.eventGMT} - {event.eventLocation} - {event.tickets ? 'Tickets' : ''} - {event.requireApproval ? 'Approval Required' : ''} - {event.capacity} - {event.visibility}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;