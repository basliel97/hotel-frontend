
import { create } from "zustand";
import API from "../api/axios";

const useRoomStore = create((set, get) => ({
  rooms: [],
  room: null, // New state for a single room
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 5,
  search: "",
  availabilityCalendar: {},
  calendarLoading: false,
  calendarError: null,

  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search }),

  fetchRooms: async () => {
    set({ loading: true, error: null });
    try {
      const { page, limit, search } = get();
      const res = await API.get("/rooms", {
        params: { page, limit, search },
      });
      set({ rooms: res.data.roomTypes, total: res.data.total, loading: false });
    } catch (err) {
      console.error("fetchRooms error:", err.response ?? err);
      set({
        error: err.response?.data?.message || err.message || "Failed to fetch rooms",
        loading: false,
      });
    }
  },
fetchRoomById: async (id) => {
  set({ loading: true, error: null, room: null });
  try {
    const res = await API.get(`/rooms/${id}`); // Ensure this matches your backend route
    set({ room: res.data, loading: false });
  } catch (err) {
    console.error("fetchRoomById error:", err.response ?? err);
    set({
      error: err.response?.data?.message || err.message || "Failed to fetch room details",
      loading: false,
    });
  }
},

  createRoom: async (data) => {
    try {
      const res = await API.post("/rooms", data);
      set((state) => ({ rooms: [...state.rooms, res.data.room] }));
      return res.data;
    } catch (err) {
      console.error("createRoom error:", err.response ?? err);
      throw err;
    }
  },

  updateRoom: async (id, data) => {
    try {
      const res = await API.patch(`/rooms/${id}`, data);
      set((state) => ({
        rooms: state.rooms.map((r) => (r.id === id ? res.data.updated : r)),
        room: state.room && state.room.id === id ? res.data.updated : state.room,
      }));
      return res.data;
    } catch (err) {
      console.error("updateRoom error:", err.response ?? err);
      throw err;
    }
  },

  deleteRoom: async (id) => {
    try {
      await API.delete(`/rooms/${id}`);
      set((state) => ({
        rooms: state.rooms.filter((r) => r.id !== id),
        room: state.room && state.room.id === id ? null : state.room,
      }));
    } catch (err) {
      console.error("deleteRoom error:", err.response ?? err);
      throw err;
    }
  },

  fetchAvailabilityCalendar: async (startDate, endDate) => {
    set({ calendarLoading: true, calendarError: null });
    try {
      const res = await API.get("/rooms/availability-calendar", {
        params: { startDate, endDate },
      });
      set({ availabilityCalendar: res.data, calendarLoading: false });
    } catch (err) {
      set({
        calendarError: err.response?.data?.message || "Failed to fetch calendar",
        calendarLoading: false,
      });
    }
  },
}));

export default useRoomStore;
