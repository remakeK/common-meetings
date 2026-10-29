import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Typography } from '@mui/material';
import {
  CreateEventForm,
  type CreateEventFormValues,
} from '../features/create-event/ui/CreateEventForm';

export function CreateEventPage() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (values: CreateEventFormValues) => {
    setSubmitError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.log('Создано событие:', values);
      navigate('/events');
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Не удалось создать событие');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Создание своего события
      </Typography>

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

      <CreateEventForm onSubmit={handleSubmit} />
    </Container>
  );
}