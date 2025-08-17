import { create } from 'zustand';
import API from "../api/axios";

const useDiningStore = create((set, get) => ({
  // State
  dinings: [],
  dining: null, // Single dining item
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
  search: "",

  // Setters
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search }),

  // Actions
fetchDinings: async () => {
    set({ loading: true, error: null });
    try {
      const { page, limit, search } = get();
      const res = await API.get('/dinings', {
        params: { page, limit, search }
      });
      
      set({ 
        dinings: res.data.data || [], // Extract the data array
        total: res.data.pagination?.total || 0,
        loading: false
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch dining options',
        loading: false
      });
    }
  },

  fetchDiningById: async (id) => {
    set({ loading: true, error: null, dining: null });
    try {
      const res = await API.get(`/dinings/${id}`);
      set({ dining: res.data, loading: false });
    } catch (err) {
      console.error("fetchDiningById error:", err.response ?? err);
      set({
        error: err.response?.data?.message || err.message || "Failed to fetch dining details",
        loading: false,
      });
    }
  },

  createDining: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await API.post('/dinings', data);
      set(state => ({
        dinings: [res.data, ...state.dinings],
        loading: false
      }));
      return res.data;
    } catch (err) {
      console.error("createDining error:", err.response ?? err);
      set({
        error: err.response?.data?.message || err.message || "Failed to create dining option",
        loading: false,
      });
      throw err;
    }
  },

  updateDining: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await API.put(`/dinings/${id}`, data);
      set(state => ({
        dinings: state.dinings.map(d => 
          d.id === id ? res.data : d
        ),
        dining: state.dining?.id === id ? res.data : state.dining,
        loading: false
      }));
      return res.data;
    } catch (err) {
      console.error("updateDining error:", err.response ?? err);
      set({
        error: err.response?.data?.message || err.message || "Failed to update dining option",
        loading: false,
      });
      throw err;
    }
  },

  deleteDining: async (id) => {
    set({ loading: true, error: null });
    try {
      await API.delete(`/dinings/${id}`);
      set(state => ({
        dinings: state.dinings.filter(d => d.id !== id),
        dining: state.dining?.id === id ? null : state.dining,
        loading: false
      }));
    } catch (err) {
      console.error("deleteDining error:", err.response ?? err);
      set({
        error: err.response?.data?.message || err.message || "Failed to delete dining option",
        loading: false,
      });
      throw err;
    }
  }
}));

export default useDiningStore;