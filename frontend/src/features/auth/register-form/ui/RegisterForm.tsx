import { useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { isEmail, isNotEmpty, minLen } from '../../../../shared/lib/validation';

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => Promise<void> | void;
  submitting?: boolean;
}

type Errors = Partial<Record<'name' | 'email' | 'password' | 'confirmation', string>>;

export function RegisterForm({ onSubmit, submitting = false }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const e: Errors = {};
    if (!isNotEmpty(name)) e.name = 'Укажите имя';
    else if (!minLen(name, 2)) e.name = 'Минимум 2 символа';

    if (!isNotEmpty(email)) e.email = 'Укажите email';
    else if (!isEmail(email)) e.email = 'Некорректный email';

    if (!isNotEmpty(password)) e.password = 'Укажите пароль';
    else if (!minLen(password, 8)) e.password = 'Минимум 8 символов';

    if (!isNotEmpty(confirmation)) e.confirmation = 'Подтвердите пароль';
    else if (password !== confirmation) e.confirmation = 'Пароли не совпадают';

    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    await onSubmit({ name: name.trim(), email: email.trim(), password });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <TextField
          label="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
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
        <TextField
          label="Подтверждение пароля"
          type="password"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          fullWidth
          error={Boolean(errors.confirmation)}
          helperText={errors.confirmation}
        />
        <Button variant="contained" type="submit" size="large" disabled={submitting}>
          {submitting ? 'Создаём аккаунт…' : 'Подтвердить'}
        </Button>
      </Stack>
    </form>
  );
}