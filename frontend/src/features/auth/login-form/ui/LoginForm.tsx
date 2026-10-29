import { useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { isEmail, isNotEmpty, minLen } from '../../../../shared/lib/validation';

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => Promise<void> | void;
  submitting?: boolean;
}

type Errors = Partial<Record<'email' | 'password', string>>;

export function LoginForm({ onSubmit, submitting = false }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const e: Errors = {};
    if (!isNotEmpty(email)) e.email = 'Укажите email';
    else if (!isEmail(email)) e.email = 'Некорректный email';

    if (!isNotEmpty(password)) e.password = 'Укажите пароль';
    else if (!minLen(password, 8)) e.password = 'Минимум 8 символов';
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    await onSubmit({ email: email.trim(), password });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <Button variant="contained" type="submit" size="large" disabled={submitting}>
          {submitting ? 'Входим…' : 'Войти'}
        </Button>
      </Stack>
    </form>
  );
}