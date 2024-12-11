import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/atoms/Button/Button';
import { fetchOrganizers, fetchLocations, createEvent, uploadImage, Location, Organizer } from '@/app/services/Services';
import './EventForm.css';

const localitySchema = z.object({
  name: z.string().min(1, 'Localidad requerida'),
  capacity: z.number().min(1, 'Capacidad mínima: 1').int(),
  price: z.number().min(0, 'Precio no puede ser negativo'),
});

const eventSchema = z.object({
  title: z.string().min(1, 'Título requerido'),
  description: z.string().min(1, 'Descripción requerida'),
  startDate: z.string().min(1, 'Fecha inicio requerida'),
  endDate: z.string().min(1, 'Fecha fin requerida'),
  location: z.string().min(1, 'Ubicación requerida'),
  organizer: z.string().min(1, 'Organizador requerido'),
  isExclusive: z.boolean(),
  discount: z.number().min(0, 'Descuento no puede ser negativo'),
  capacity: z.number().optional(),
  imageUrl: z.string().optional(), // Optional field for imageUrl
  localities: z.array(localitySchema).min(1, 'Mínimo 1 localidad requerida'),
});

type EventInput = z.infer<typeof eventSchema>;

interface EventFormProps {
  onSubmit: (eventData: EventInput) => void;
  isSubmitting: boolean;
  
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, isSubmitting }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [image, setImage] = useState<File | null>(null); // State to handle image upload

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      organizer: '',
      isExclusive: false,
      capacity: 0,
      discount: 0,
      localities: [{ name: '', capacity: 0, price: 0 }],
      imageUrl: '', // Default value for imageUrl
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'localities' });

  useEffect(() => {
    const totalCapacity = watch('localities').reduce((acc, loc) => acc + (loc.capacity || 0), 0);
    setValue('capacity', totalCapacity);
  }, [watch('localities'), setValue]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [locData, orgData] = await Promise.all([fetchLocations(), fetchOrganizers()]);
        setLocations(locData);
        setOrganizers(orgData);
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    };

    loadInitialData();
  }, []);

  const onSubmitHandler = async (data: EventInput) => {
    console.log("Formulario enviado con datos:", data); // Verifica si los datos se están enviando correctamente
    try {
      let imageUrl = data.imageUrl;
      if (image) {
        imageUrl = await uploadImage(image); // Sube la imagen y obtiene la URL
      }
  
      const formattedEventData: EventInput = {
        ...data,
        startDate: new Date(data.startDate).toISOString(), // Asegura el formato ISO 8601
        endDate: new Date(data.endDate).toISOString(),
        imageUrl: imageUrl || undefined, // Evita enviar cadena vacía si no hay imagen
      };
  
      await onSubmit(formattedEventData);
      console.log("Evento creado exitosamente:", formattedEventData);
    } catch (error) {
      console.error("Error creando evento:", error);
    }
  };
  
  
  
  

  // Handle file upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setImage(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="event-form">
      {/* Título */}
      <div className="form-group">
        <label htmlFor="title">Titulo</label>
        <input id="title" {...register('title')} />
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      {/* Descripción */}
      <div className="form-group">
        <label htmlFor="description">Descripcion</label>
        <textarea id="description" {...register('description')} />
        {errors.description && <span>{errors.description.message}</span>}
      </div>

      {/* Fechas */}
      <div className="form-group">
        <label htmlFor="startDate">Fecha Inicio</label>
        <input id="startDate" type="datetime-local" {...register('startDate')} />
        {errors.startDate && <span>{errors.startDate.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="endDate">Fecha Fin</label>
        <input id="endDate" type="datetime-local" {...register('endDate')} />
        {errors.endDate && <span>{errors.endDate.message}</span>}
      </div>

      {/* Ubicación */}
      <div className="form-group">
        <label htmlFor="location">Ubicacion</label>
        <select id="location" {...register('location')}>
          <option value="">Seleccionar ubicación</option>
          {locations.map((loc) => (
            <option key={loc._id} value={loc._id}>
              {loc.name}
            </option>
          ))}
        </select>
        {errors.location && <span>{errors.location.message}</span>}
      </div>

      {/* Organizador */}
      <div className="form-group">
        <label htmlFor="organizer">Organizador</label>
        <select id="organizer" {...register('organizer')}>
          <option value="">Seleccionar organizador</option>
          {organizers.map((org) => (
            <option key={org._id} value={org._id}>
              {org.name}
            </option>
          ))}
        </select>
        {errors.organizer && <span>{errors.organizer.message}</span>}
      </div>

      {/* Imagen de evento */}
      <div className="form-group">
        <label htmlFor="imageUrl">Imagen del Evento</label>
        <input id="imageUrl" type="file" accept="image/*" onChange={handleImageUpload} />
        {errors.imageUrl && <span>{errors.imageUrl.message}</span>}
      </div>

      {/* Localidades */}
      <div className="form-group">
        <label>Localidades</label>
        {fields.map((field, index) => (
          <div key={field.id} className="locality-item">
            <input
              placeholder="Name"
              {...register(`localities.${index}.name` as const)}
            />
            <input
              placeholder="Capacity"
              type="number"
              {...register(`localities.${index}.capacity` as const)}
            />
            <input
              placeholder="Price"
              type="number"
              {...register(`localities.${index}.price` as const)}
            />
            <Button type="button" onClick={() => remove(index)}>Remove</Button>
          </div>
        ))}
        <Button type="button" onClick={() => append({ name: '', capacity: 0, price: 0 })}>
          Agregar Localidad
        </Button>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creando evento...' : 'Crear Evento'}
      </Button>

    </form>
  );
};

export default EventForm;
