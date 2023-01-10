import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

// new routes
//member
export const fetchMember = (id) => API.get(`api/members/${id}`);
export const fetchMembers = (page) => API.get(`/members?page=${page}`);
export const createMember = (newMember) => API.post('/members', newMember);
export const updateMember = (id, updatedMember) => API.patch(`/members/${id}`, updatedMember);
export const deleteMember = (id) => API.delete(`/members/${id}`);

//payment
export const fetchPayments = (page) => API.get(`/payments?page=${page}`);
export const createPayment = (newPayment) => API.post('/payments', newPayment);
export const updatePayment = (id, updatedPayment) => API.patch(`/payments/${id}`, updatedPayment);

//dashboard
export const fetchDashboard = (page) => API.get(`/dashboard?page=${page}`);
