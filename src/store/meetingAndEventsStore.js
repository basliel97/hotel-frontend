import { create } from 'zustand';
import API from "../api/axios";

const useMeetingsEventsStore = create((set, get) => ({
  // State
  meetingsAndEvents: [],
  meetingsAndEventsLoading: false,
  meetingsAndEventsError: null,
  total: 0,
  page: 1,
  limit: 10,
  search: "",

  // Setters
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setSearch: (search) => set({ search }),

  // Actions
  fetchMeetingsAndEvents: async () => {
    set({ meetingsAndEventsLoading: true, meetingsAndEventsError: null });
    try {
      const { page, limit, search } = get();
      const response = await API.get('/meetings-and-events', {
        params: { page, limit, search }
      });
      
      set({ 
        meetingsAndEvents: response.data.data || [],
        total: response.data.pagination?.total || 0,
        meetingsAndEventsLoading: false 
      });
    } catch (error) {
      set({ 
        meetingsAndEventsError: error.response?.data?.error || 'Failed to fetch meetings and events',
        meetingsAndEventsLoading: false 
      });
    }
  },

  createMeetingsAndEvents: async (eventData) => {
    set({ meetingsAndEventsLoading: true, meetingsAndEventsError: null });
    try {
      const response = await API.post('/meetings-and-events', {
        name: eventData.name,
        description: eventData.description,
        capacity: eventData.capacity,
        eventType: eventData.eventType,
        images: eventData.images || []
      });

      set(state => ({
        meetingsAndEvents: [response.data.data, ...state.meetingsAndEvents],
        meetingsAndEventsLoading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        meetingsAndEventsError: error.response?.data?.error || 'Failed to create event',
        meetingsAndEventsLoading: false 
      });
      throw error;
    }
  },

  updateMeetingsAndEvents: async (id, eventData) => {
    set({ meetingsAndEventsLoading: true, meetingsAndEventsError: null });
    try {
      const response = await API.put(`/meetings-and-events/${id}`, {
        name: eventData.name,
        description: eventData.description,
        capacity: eventData.capacity,
        eventType: eventData.eventType,
        images: eventData.images || []
      });

      set(state => ({
        meetingsAndEvents: state.meetingsAndEvents.map(e => 
          e.id === id ? response.data.data : e
        ),
        meetingsAndEventsLoading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        meetingsAndEventsError: error.response?.data?.error || 'Failed to update event',
        meetingsAndEventsLoading: false 
      });
      throw error;
    }
  },

  deleteMeetingsAndEvents: async (id) => {
    set({ meetingsAndEventsLoading: true, meetingsAndEventsError: null });
    try {
      await API.delete(`/meetings-and-events/${id}`);
      set(state => ({
        meetingsAndEvents: state.meetingsAndEvents.filter(e => e.id !== id),
        meetingsAndEventsLoading: false
      }));
    } catch (error) {
      set({ 
        meetingsAndEventsError: error.response?.data?.error || 'Failed to delete event',
        meetingsAndEventsLoading: false 
      });
    }
  }
}));

export default useMeetingsEventsStore;