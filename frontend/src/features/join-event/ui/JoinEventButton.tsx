import { Button } from '@mui/material';

interface JoinEventButtonProps {
  isJoined: boolean;
  onJoin: () => void;
  onLeave: () => void;
}

export function JoinEventButton({ isJoined, onJoin, onLeave }: JoinEventButtonProps) {
  if (isJoined) {
    return (
      <Button
        size="large"
        variant="outlined"
        onClick={onLeave}
        sx={{
          borderRadius: 2,
          color: '#DC2626',
          borderColor: '#DC2626',
          '&:hover': { backgroundColor: '#FEF2F2', borderColor: '#B91C1C' },
        }}
      >
        Снять запись
      </Button>
    );
  }

  return (
    <Button
      size="small"
      variant="contained"
      onClick={onJoin}
      sx={{
        borderRadius: 2,
        backgroundColor: '#2563EB',
        '&:hover': { backgroundColor: '#1D4ED8' },
      }}
    >
      Я приду
    </Button>
  );
}