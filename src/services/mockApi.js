/**
 * NexusHack 2026 - Mock API Service Layer
 * Path: src/services/mockApi.js
 */

import { ApiService } from './apiService';

export const mockApi = {
  async fetchSeatCounts() {
    return ApiService.fetchSeatCounts();
  },

  async handleRegistration(formData) {
    return ApiService.handleRegistration(formData);
  },

  async checkDuplicateEmail(email) {
    return ApiService.checkEmailRegistered(email);
  },

  async fetchEventInfo() {
    return ApiService.fetchEventDetails();
  }
};

export const fetchSeatCounts = mockApi.fetchSeatCounts;
export const handleRegistration = mockApi.handleRegistration;
export const checkDuplicateEmail = mockApi.checkDuplicateEmail;

export default mockApi;
