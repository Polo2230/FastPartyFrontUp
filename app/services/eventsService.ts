// app/services/eventsService.ts

export interface Event {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
  price: number;
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

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch('https://fastpartybackend.onrender.com/api/events');
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  const data: Event[] = await response.json();
  return data;
};

export const fetchEventById = async (id: string): Promise<Event> => {
  const response = await fetch(`https://fastpartybackend.onrender.com/api/events/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  const data: Event = await response.json();
  return data;
};

// Función para realizar el login del usuario
export const loginUser = async (email: string, password: string): Promise<UserLoginData> => {
  const response = await fetch('https://fastpartybackend.onrender.com/api/auth/login', {
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
};

// Función para registrar un nuevo usuario
export const registerUser = async (username: string, email: string, password: string, role: string): Promise<UserRegisterData> => {
  const response = await fetch('https://fastpartybackend.onrender.com/api/auth/register', {
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
};
