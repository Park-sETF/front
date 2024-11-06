import axios from 'axios';
const BASE_URL = '/api';

export async function fetchSignUp(email, password) {
  try {
    const res = await axios.post(`${BASE_URL}/users/signup`, {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
