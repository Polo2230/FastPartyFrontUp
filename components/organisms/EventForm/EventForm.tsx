import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/atoms/Button/Button';
import './EventForm.css';

// Define schema using Zod
const localitySchema = z.object({
  name: z.string().min(1, 'Locality name is required'),
  capacity: z.number().min(1, 'Capacity must be at least 1').int(),
  price: z.number().min(0, 'Price cannot be negative'),
});

const eventSchema = z.object({
  title: z.string().min(1, 'Event title is required'),
  description: z.string().min(1, 'Event description is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  location: z.string().min(1, 'Location ID is required'),
  capacity: z.number().min(1, 'Total capacity must be at least 1').int(),
  isExclusive: z.boolean(),
  discount: z.number().min(0, 'Discount cannot be negative'),
  imageUrl: z.string().url('Invalid URL for image'),
  localities: z.array(localitySchema).min(1, 'At least one locality is required'),
});

type EventInput = z.infer<typeof eventSchema>;

interface EventFormProps {
  onSubmit: (data: EventInput) => void;
  initialData?: EventInput;
  isSubmitting?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialData, isSubmitting = false }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      capacity: 0,
      isExclusive: false,
      discount: 0,
      imageUrl: '',
      localities: [{ name: '', capacity: 0, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'localities',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="event-form">
      {/* Event General Information */}
      <h2>{initialData ? 'Edit Event' : 'Create New Event'}</h2>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input id="title" {...register('title')} className="form-control" />
        {errors.title && <span className="error-message">{errors.title.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" {...register('description')} className="form-control" />
        {errors.description && <span className="error-message">{errors.description.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input id="startDate" type="datetime-local" {...register('startDate')} className="form-control" />
        {errors.startDate && <span className="error-message">{errors.startDate.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input id="endDate" type="datetime-local" {...register('endDate')} className="form-control" />
        {errors.endDate && <span className="error-message">{errors.endDate.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="location">Location (ID)</label>
        <input id="location" {...register('location')} className="form-control" />
        {errors.location && <span className="error-message">{errors.location.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="capacity">Total Capacity</label>
        <input id="capacity" type="number" {...register('capacity', { valueAsNumber: true })} className="form-control" />
        {errors.capacity && <span className="error-message">{errors.capacity.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="isExclusive">
          <input type="checkbox" id="isExclusive" {...register('isExclusive')} />
          Exclusive Event
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="discount">Discount (%)</label>
        <input id="discount" type="number" {...register('discount', { valueAsNumber: true })} className="form-control" />
        {errors.discount && <span className="error-message">{errors.discount.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">Image URL</label>
        <input id="imageUrl" {...register('imageUrl')} className="form-control" />
        {errors.imageUrl && <span className="error-message">{errors.imageUrl.message}</span>}
      </div>

      {/* Localities Section */}
      <div className="form-group">
        <h3>Localities</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="locality-group">
            <div className="form-group">
              <label>Name</label>
              <input
                {...register(`localities.${index}.name` as const)}
                className="form-control"
              />
              {errors.localities?.[index]?.name && (
                <span className="error-message">{errors.localities[index]?.name?.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                {...register(`localities.${index}.capacity` as const, { valueAsNumber: true })}
                className="form-control"
              />
              {errors.localities?.[index]?.capacity && (
                <span className="error-message">{errors.localities[index]?.capacity?.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                {...register(`localities.${index}.price` as const, { valueAsNumber: true })}
                className="form-control"
              />
              {errors.localities?.[index]?.price && (
                <span className="error-message">{errors.localities[index]?.price?.message}</span>
              )}
            </div>
            <Button type="button" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => append({ name: '', capacity: 0, price: 0 })}>
          Add Locality
        </Button>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : initialData ? 'Update Event' : 'Create Event'}
      </Button>
    </form>
  );
};

export default EventForm;
