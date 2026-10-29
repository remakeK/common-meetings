import { useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';

interface MessageInputProps {
  onSend: (text: string) => Promise<void> | void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const trimmed = text.trim();
  const tooLong = trimmed.length > 1000;

  const handleSend = async () => {
    if (trimmed.length === 0) {
      setError('Введите сообщение');
      return;
    }
    if (tooLong) {
      setError('Максимум 1000 символов');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSend(trimmed);
      setText('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
      <TextField
        label="Сообщение"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (error) setError(null);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            void handleSend();
          }
        }}
        fullWidth
        multiline
        maxRows={4}
        error={Boolean(error)}
        helperText={error}
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSend}
        disabled={submitting || trimmed.length === 0 || tooLong}
        sx={{ flexShrink: 0 }}
      >
        {submitting ? 'Отправка…' : 'Отправить'}
      </Button>
    </Stack>
  );
}