import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EventInput } from '@/app/services/Services';
import Button from '@/components/atoms/Button/Button';
import './EventForm.css';

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  location: z.string().min(1, 'Location is required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  price: z.number().min(0, 'Price cannot be negative'),
  isExclusive: z.boolean(),
  discount: z.number().min(0, 'Discount cannot be negative'),
  imageUrl: z.string().url('Invalid image URL'),
});

type EventFormProps = {
  onSubmit: (data: EventInput) => void;
  initialData?: EventInput;
  isSubmitting: boolean;
};

const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialData, isSubmitting }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData || {
      isExclusive: false,
      discount: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="event-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input id="title" {...register('title')} className="form-control" />
        {errors.title && <p className="error-message">{errors.title.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" {...register('description')} className="form-control" />
        {errors.description && <p className="error-message">{errors.description.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input id="startDate" type="datetime-local" {...register('startDate')} className="form-control" />
        {errors.startDate && <p className="error-message">{errors.startDate.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input id="endDate" type="datetime-local" {...register('endDate')} className="form-control" />
        {errors.endDate && <p className="error-message">{errors.endDate.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input id="location" {...register('location')} className="form-control" />
        {errors.location && <p className="error-message">{errors.location.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="capacity">Capacity</label>
        <input id="capacity" type="number" {...register('capacity', { valueAsNumber: true })} className="form-control" />
        {errors.capacity && <p className="error-message">{errors.capacity.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input id="price" type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="form-control" />
        {errors.price && <p className="error-message">{errors.price.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="isExclusive">
          <input type="checkbox" id="isExclusive" {...register('isExclusive')} className="form-control" />
          Exclusive Event
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="discount">Discount</label>
        <input id="discount" type="number" step="0.01" {...register('discount', { valueAsNumber: true })} className="form-control" />
        {errors.discount && <p className="error-message">{errors.discount.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">Image URL</label>
        <input id="imageUrl" type="url" {...register('imageUrl')} className="form-control" />
        {errors.imageUrl && <p className="error-message">{errors.imageUrl.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating Event...' : (initialData ? 'Update Event' : 'Create Event')}
      </Button>
    </form>
  );
};

export default EventForm;

