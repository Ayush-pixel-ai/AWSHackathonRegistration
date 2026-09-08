import { useState, useEffect } from 'react';
import { ApiService } from '../services/apiService';

export const useDuplicateCheck = (email, delayMs = 350) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [existingAttendee, setExistingAttendee] = useState(null);

  useEffect(() => {
    const cleanEmail = email ? email.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setIsRegistered(false);
      setExistingAttendee(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsChecking(true);
        const res = await ApiService.checkEmailRegistered(cleanEmail);
        setIsRegistered(res.isRegistered);
        setExistingAttendee(res.existingAttendee);
      } catch (err) {
        console.error('Error checking duplicate email:', err);
      } finally {
        setIsChecking(false);
      }
    }, delayMs);

    return () => clearTimeout(timer);
  }, [email, delayMs]);

  return { isChecking, isRegistered, existingAttendee };
};
