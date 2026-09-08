import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { ApiService } from '../services/apiService';
import { EVENT_CONFIG } from '../data/eventConfig';

const EventContext = createContext(null);

export const EventProvider = ({ children }) => {
  const [eventDetails, setEventDetails] = useState(EVENT_CONFIG);
  const [tracks, setTracks] = useState([]);
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filter & UI States
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Active Ticket
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);
  const [lastIssuedTicket, setLastIssuedTicket] = useState(null);

  // Toast Notification System
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Fetch Initial Data
  const loadSeatData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ApiService.fetchSeatCounts();
      setTracks(data.tracks);
      setTotalCapacity(data.totalCapacity);
      setTotalRemaining(data.totalRemaining);
    } catch (err) {
      console.error('Error loading seats:', err);
      addToast('Failed to load track seats. Please refresh.', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadSeatData();
  }, [loadSeatData]);

  // Derived Filtered Tracks List
  const filteredTracks = useMemo(() => {
    let result = [...tracks];

    if (activeFilter === 'available') {
      result = result.filter(t => t.seatsLeft > 0);
    } else if (activeFilter === 'filling-fast') {
      result = result.filter(t => (t.seatsLeft / t.totalSeats) <= 0.35 && t.seatsLeft > 0);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [tracks, activeFilter, searchQuery]);

  // Action: Register User
  const registerUser = async (payload) => {
    try {
      const res = await ApiService.handleRegistration(payload);
      
      const updatedSeatData = await ApiService.fetchSeatCounts();
      setTracks(updatedSeatData.tracks);
      setTotalCapacity(updatedSeatData.totalCapacity);
      setTotalRemaining(updatedSeatData.totalRemaining);

      setLastIssuedTicket(res.ticket);
      setIsTicketModalOpen(true);
      addToast(`RSVP Confirmed! Issued Ticket #${res.ticket.ticketId}`, 'success');
      return res.ticket;
    } catch (err) {
      addToast(err.message || 'Registration failed.', 'error');
      throw err;
    }
  };

  // Action: Reset State
  const resetDemoData = async () => {
    try {
      await ApiService.resetMockState();
      await loadSeatData();
      setSelectedTrackId(null);
      addToast('Demo state reset to initial seed values.', 'info');
    } catch (err) {
      addToast('Failed to reset demo state.', 'error');
    }
  };

  const value = {
    eventDetails,
    tracks,
    totalCapacity,
    totalRemaining,
    loading,
    selectedTrackId,
    setSelectedTrackId,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    filteredTracks,
    isTicketModalOpen,
    setIsTicketModalOpen,
    isLookupModalOpen,
    setIsLookupModalOpen,
    lastIssuedTicket,
    setLastIssuedTicket,
    toasts,
    addToast,
    removeToast,
    registerUser,
    resetDemoData
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const ctx = useContext(EventContext);
  if (!ctx) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return ctx;
};
