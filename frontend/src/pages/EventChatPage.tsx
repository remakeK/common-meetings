import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  Grow,
} from '@mui/material';

import type { Message } from '../entities/message/model/types';
import { fetchMessages } from '../entities/message/api/fetchMessages';
import { usersById } from '../entities/user/api/mockUsers';
import { CURRENT_USER_ID } from '../entities/user/model/currentUser';
import { useAsync } from '../shared/lib/useAsync';
import { ErrorState } from '../shared/ui/ErrorState';
import { EmptyState } from '../shared/ui/EmptyState';
import { MessageInput } from '../features/send-message/ui/MessageInput';

export function EventChatPage() {
  const { id } = useParams<{ id: string }>();
  const eventId = Number(id);
  const { data, loading, error } = useAsync(() => fetchMessages(eventId), [eventId]);

  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages.length]);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Math.max(0, ...messages.map((m) => m.id)) + 1,
      eventId,
      authorId: CURRENT_USER_ID,
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Чат
      </Typography>

      {loading && (
        <Typography color="text.secondary">Загрузка сообщений…</Typography>
      )}
      {error && <ErrorState message={`Не удалось загрузить чат: ${error}`} />}

      {!loading && !error && (
        <Paper sx={{ p: 2 }}>
          <Stack
            ref={scrollRef}
            spacing={2}
            sx={{ maxHeight: 500, overflowY: 'auto', pr: 1 }}
          >
            {messages.length === 0 ? (
              <EmptyState
                title="Сообщений пока нет"
                description="Напишите первым!"
              />
            ) : (
              messages.map((m) => {
                const author = usersById[m.authorId];
                const isMine = m.authorId === CURRENT_USER_ID;
                return (
                  <Grow in key={m.id} timeout={300}>
                    <Stack
                      sx={{ alignItems: isMine ? 'flex-end' : 'flex-start' }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          backgroundColor: isMine ? 'primary.dark' : 'grey.800',
                          maxWidth: '75%',
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {author?.name ?? 'Неизвестный'}
                        </Typography>
                        <Typography>{m.text}</Typography>
                      </Paper>
                    </Stack>
                  </Grow>
                );
              })
            )}
          </Stack>

          <Box sx={{ mt: 2 }}>
            <MessageInput onSend={handleSend} />
          </Box>
        </Paper>
      )}
    </Container>
  );
}