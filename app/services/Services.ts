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

export interface Place {
  _id: string;
  name: string;
  address: string;
  capacity: number;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export const fetchPlaces = async (): Promise<Place[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/places`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch places');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
};


export interface Locality {
  name: string;
  capacity: number;
  price: number;
}

export interface Location {
  _id: string;
  name: string;
  address: string;
  capacity: number;
  companyId: string | null;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Organizer {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface Event {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: Location | null; // Puede ser null según tu ejemplo
  capacity: number;
  imageUrl: string;
  organizer: string | null; // Puede ser null según tu ejemplo
  isExclusive: boolean;
  discount: number;
  localities: Locality[];
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
export interface EventInput {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string | null;
  capacity?: number; // Incluido
  imageUrl?: string; // Incluido
  organizer?: string | null;
  isExclusive?: boolean;
  discount?: number;
  localities: Locality[];
}

export interface TicketInput {
  eventId: string;
  localityName: string;
  price: number;
  quantity: number;
}

export const purchaseTickets = async (
  customerId: string,
  tickets: TicketInput[]
): Promise<any> => {
  try {
    const headers = getAuthHeaders();
    const url = `${API_BASE_URL}/tickets/purchase`;

    const body = {
      customerId,
      tickets,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to purchase tickets');
    }

    return await response.json(); // Devolvemos la respuesta completa
  } catch (error) {
    console.error('Error purchasing tickets:', error);
    throw error;
  }
};


// Event-related API functions
export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);

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

// Añadir la nueva función para cargar imágenes
export const uploadImage = async (image: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', image); // El key es 'image' y el value es el archivo de la imagen

    const response = await fetch(`${API_BASE_URL}/images/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload image');
    }

    const data = await response.json();
    return data.url; // La URL de la imagen subida
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};






export const createEvent = async (eventData: EventInput): Promise<Event> => {
  try {
    const headers = getAuthHeaders();
    const url = `${API_BASE_URL}/events`;

    const body = {
      ...eventData,
      localities: eventData.localities.map((loc) => ({
        name: loc.name,
        capacity: loc.capacity,
        price: loc.price,
      })),
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create event");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating event:", error);
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
    const response = await fetch(`${API_BASE_URL}/events/${id}`); // Sin headers de autenticación

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

// Fetch organizers
export const fetchLocations = async (): Promise<Location[]> => {
  try {
    const headers = getAuthHeaders();
    const url = `${API_BASE_URL}/locations`;

    const response = await fetch(url, { headers });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch locations');
    }

    const data = await response.json();
    return data.locations; // Asegúrate de que la respuesta tenga esta estructura
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};


export const fetchOrganizers = async (): Promise<Organizer[]> => {
  try {
    const headers = getAuthHeaders();
    const url = `${API_BASE_URL}/companies`;

    const response = await fetch(url, { headers });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch organizers');
    }

    const data: Organizer[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching organizers:', error);
    throw error;
  }
};


