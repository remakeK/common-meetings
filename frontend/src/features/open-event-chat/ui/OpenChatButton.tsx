import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface OpenChatButtonProps {
  eventId: number;
}

export function OpenChatButton({ eventId }: OpenChatButtonProps) {
  return (
    <Button
      size="small"
      variant="contained"
      component={RouterLink}
      to={`/events/${eventId}/chat`}
      sx={{ minWidth: 40, borderRadius: 2 }}
    >
      💬
    </Button>
  );
}