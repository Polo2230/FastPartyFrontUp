'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminTemplate from '@/components/adminTemplate/AdminTemplate';
import EventForm from '@/components/organisms/EventForm/EventForm';
import { createEvent, EventInput } from '@/app/services/Services';
import { toast } from 'react-hot-toast';
import './style.css';

export default function CreateEvent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (eventData: EventInput) => {
    setIsSubmitting(true);
    try {
      await createEvent(eventData);
      toast.success('Event created successfully');
      router.push('/admin/events');
    } catch (error) {
      console.error('Error creating event:', error);
      if (error instanceof Error) {
        if (error.message === 'Unauthorized: Please log in again') {
          toast.error('Your session has expired. Please log in again.');
          // Redirect to login page or trigger re-authentication
          router.push('/login');
        } else if (error.message === 'API endpoint not found') {
          toast.error('Unable to connect to the server. Please try again later.');
        } else {
          toast.error(error.message || 'Failed to create event');
        }
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminTemplate>
      <div className="create-event-container">
        <h1 className="create-event-title">Create New Event</h1>
        <EventForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </AdminTemplate>
  );
}

