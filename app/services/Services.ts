import Cookies from 'js-cookie';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.fastparty.co/api';
console.log('API_BASE_URL:', API_BASE_URL); // Debugging line

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export interface Event {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  capacity: number;
  price: number;
  location: string;
  isExclusive: boolean;
  discount: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface UserLoginData {
  token: string;
}

export interface UserRegisterData {
  token: string;
}

export interface Ticket {
  _id: string;
  eventTitle: string;
  price: number;
  qrCode: string;
  status: string;
}
export type EventInput = Omit<Event, '_id' | 'createdAt' | 'updatedAt' | '__v'>;

// Event-related API functions
export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch events');
    }
    
    const data: Event[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};


export const createEvent = async (eventData: EventInput): Promise<Event> => {
  try {
    const headers = getAuthHeaders();
    const url = `${API_BASE_URL}/events`;
    console.log('Full API URL:', url); // Debugging line
    console.log('Request headers:', headers);
    console.log('Request body:', JSON.stringify(eventData));

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(eventData),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`API endpoint not found: ${url}`);
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create event');
    }

    const responseData = await response.json();
    console.log('Response data:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
export const updateEvent = async (id: string, eventData: EventInput): Promise<Event> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update event');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete event');
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export const fetchEventById = async (id: string): Promise<Event> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch event');
    }

    const data: Event = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

// Authentication-related API functions
export const loginUser = async (email: string, password: string): Promise<UserLoginData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to login user');
    }

    const data: UserLoginData = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const registerUser = async (username: string, email: string, password: string, role: string): Promise<UserRegisterData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, role }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to register user');
    }

    const data: UserRegisterData = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};


