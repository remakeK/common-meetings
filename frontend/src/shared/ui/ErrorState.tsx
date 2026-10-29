import { Alert, Box, Button } from '@mui/material';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Box sx={{ my: 4 }}>
      <Alert
        severity="error"
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              Повторить
            </Button>
          )
        }
      >
        {message}
      </Alert>
    </Box>
  );
}