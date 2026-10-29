import { Button } from '@mui/material';

interface LeaveEventButtonProps {
  onClick?: () => void;
}

export function LeaveEventButton({ onClick }: LeaveEventButtonProps) {
  return (
    <Button
      size="small"
      variant="outlined"
      onClick={onClick}
      sx={{
        color: '#DC2626',
        borderColor: '#DC2626',
        borderRadius: 2,
        '&:hover': { backgroundColor: '#FEF2F2', borderColor: '#B91C1C' },
      }}
    >
      Снять запись
    </Button>
  );
}