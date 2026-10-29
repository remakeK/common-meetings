import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Stack, Typography } from '@mui/material';
import {
  RegisterForm,
  type RegisterFormValues,
} from '../features/auth/register-form/ui/RegisterForm';

export function RegistrationPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: RegisterFormValues) => {
    setError(null);
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      console.log('Зарегистрирован:', { name: values.email });
      navigate('/login');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось зарегистрироваться');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Регистрация
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <RegisterForm onSubmit={handleSubmit} submitting={submitting} />

      <Stack direction="row" sx={{ justifyContent: 'center', mt: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
          Уже есть аккаунт?
        </Typography>
        <Button
          variant="text"
          onClick={() => navigate('/login')}
          sx={{ textTransform: 'none' }}
        >
          Войти
        </Button>
      </Stack>
    </Container>
  );
}