import { useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import {
  isFutureDate,
  isNotEmpty,
  isPositiveInt,
  maxLen,
  minLen,
} from '../../../shared/lib/validation';

export interface CreateEventFormValues {
  name: string;
  description: string;
  date: string;
  location: string;
  maxParticipants: number;
}

interface CreateEventFormProps {
  onSubmit: (values: CreateEventFormValues) => Promise<void> | void;
}

type Errors = Partial<Record<keyof CreateEventFormValues | 'form', string>>;

export function CreateEventForm({ onSubmit }: CreateEventFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!isNotEmpty(name)) e.name = 'Укажите название';
    else if (!minLen(name, 3)) e.name = 'Минимум 3 символа';
    else if (!maxLen(name, 100)) e.name = 'Максимум 100 символов';

    if (!isNotEmpty(description)) e.description = 'Добавьте описание';
    else if (!maxLen(description, 1000)) e.description = 'Максимум 1000 символов';

    if (!isNotEmpty(date)) e.date = 'Укажите дату';
    else if (!isFutureDate(date)) e.date = 'Дата должна быть в будущем';

    if (!isNotEmpty(location)) e.location = 'Укажите место';

    if (!isPositiveInt(maxParticipants, 2)) {
      e.maxParticipants = 'Минимум 2 участника';
    } else if (Number(maxParticipants) > 1000) {
      e.maxParticipants = 'Слишком большое число';
    }

    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        date,
        location: location.trim(),
        maxParticipants: Number(maxParticipants),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <TextField
          label="Название события"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          error={Boolean(errors.name)}
          helperText={errors.name}
        />

        <TextField
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
          error={Boolean(errors.description)}
          helperText={errors.description}
        />

        <TextField
          label="Дата и время"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="datetime-local"
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
          error={Boolean(errors.date)}
          helperText={errors.date}
        />

        <TextField
          label="Место проведения"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          error={Boolean(errors.location)}
          helperText={errors.location}
        />

        <TextField
          label="Максимальное количество участников"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(e.target.value)}
          type="number"
          fullWidth
          error={Boolean(errors.maxParticipants)}
          helperText={errors.maxParticipants}
        />

        <Button variant="contained" size="large" type="submit" disabled={submitting}>
          {submitting ? 'Создаём…' : 'Создать событие'}
        </Button>
      </Stack>
    </form>
  );
}