
// useReviewStore.js
import { create } from 'zustand';
import API from '../api/axios';

const useReviewStore = create((set, get) => ({
  reviews: [],
  publicReviews: [], // <-- Added new state for public reviews
  loading: false,
  error: null,
  filters: {
    rating: '',
    roomTypeId: '',
    isVisible: '',
    search: '',
  },

  fetchReviews: async () => {
    const { filters } = get();
    set({ loading: true, error: null });

    const queryParams = new URLSearchParams(
      Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
      )
    ).toString();
    console.log('Fetching reviews with query params:', queryParams);

    try {
      const response = await API.get(`/reviews/admin/all?${queryParams}`);
      
      const normalizedReviews = response.data.map(review => ({
        ...review,
        userName: review.user?.name || 'Unknown',
        roomTypeName: review.roomType?.type || 'Unknown',
        roomTypeId: review.roomType?.id || null
      }));
      
      set({ reviews: normalizedReviews, loading: false });
    } catch (err) {
      console.error('Fetch error:', err);
      set({ 
        error: err.response?.data?.message || 'Failed to fetch reviews',
        loading: false,
        reviews: []
      });
    }
  },

 createReview: async (reviewData) => {
    set({ loading: true, error: null });
    try {
      const response = await API.post('/reviews', reviewData);
      return response.data;
    } catch (err) {
      set({ 
        error: err.response?.data?.message || 'Failed to create review'
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // New function to fetch all public reviews
  fetchPublicReviews: async () => {
    set({ loading: true, error: null });
    try {
      const response = await API.get('/reviews/public');
      const normalizedReviews = response.data.map(review => ({
        ...review,
        userName: review.user?.name || 'Unknown',
        roomTypeName: review.roomType?.type || 'Unknown',
        roomTypeId: review.roomType?.id || null
      }));
      set({ publicReviews: normalizedReviews, loading: false });
    } catch (err) {
      console.error('Fetch public reviews error:', err);
      set({
        error: err.response?.data?.message || 'Failed to fetch public reviews',
        loading: false,
        publicReviews: []
      });
    }
  },

  // Delete a review
  deleteReview: async (reviewId) => {
    try {
      await API.delete(`/reviews/${reviewId}`);
      set((state) => ({
        reviews: state.reviews.filter(review => review.id !== reviewId)
      }));
      return true;
    } catch (err) {
      set({ 
        error: err.response?.data?.message || 'Failed to delete review'
      });
      return false;
    }
  },

  // Toggle review visibility
  toggleReviewVisibility: async (reviewId) => {
    try {
      const review = get().reviews.find(r => r.id === reviewId);
      if (!review) return false;

      const updatedReviewResponse = await API.patch(`/reviews/${reviewId}/visibility`, {
        isVisible: !review.isVisible
      });

      set((state) => ({
        reviews: state.reviews.map(r => 
          r.id === reviewId ? { ...r, isVisible: updatedReviewResponse.data.review.isVisible } : r
        )
      }));
      return true;
    } catch (err) {
      set({ 
        error: err.response?.data?.message || 'Failed to update review visibility'
      });
      return false;
    }
  },

  // Set filters and immediately fetch new data
  setFilters: (newFilters) => {
    const { fetchReviews } = get();
    set((state) => ({ 
      filters: { ...state.filters, ...newFilters } 
    }));
    fetchReviews();
  },

  // Clear filters and fetch new data
  clearFilters: () => {
    const { fetchReviews } = get();
    set({ 
      filters: {
        rating: '',
        roomTypeId: '',
        isVisible: '',
        search: '',
      }
    });
    fetchReviews();
  },

  
  fetchReviewsByRoomId: async (roomTypeId) => {
    set({ loading: true, error: null });
    try {
      const response = await API.get(`/reviews/public?roomTypeId=${roomTypeId}`);
      const normalizedReviews = response.data.map(review => ({
        ...review,
        userName: review.user?.name || 'Unknown',
        roomTypeName: review.roomType?.type || 'Unknown',
        roomTypeId: review.roomType?.id || null
      }));
      set({ reviews: normalizedReviews, loading: false });
    } catch (err) {
      console.error('Fetch public reviews error:', err);
      set({
        error: err.response?.data?.message || 'Failed to fetch public reviews',
        loading: false,
        reviews: []
      });
    }
  },
}));

export default useReviewStore;
