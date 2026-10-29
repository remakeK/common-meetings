import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Stack, Typography } from '@mui/material';
import {
  LoginForm,
  type LoginFormValues,
} from '../features/auth/login-form/ui/LoginForm';

export function LoginPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: LoginFormValues) => {
    setError(null);
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      console.log('Вход:', { name: values.email });
      navigate('/');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось войти');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Войдите в свой аккаунт
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <LoginForm onSubmit={handleSubmit} submitting={submitting} />

      <Stack direction="row" sx={{ justifyContent: 'center', mt: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
          Нет аккаунта?
        </Typography>
        <Button
          variant="text"
          onClick={() => navigate('/registration')}
          sx={{ textTransform: 'none' }}
        >
          Зарегистрироваться
        </Button>
      </Stack>
    </Container>
  );
}