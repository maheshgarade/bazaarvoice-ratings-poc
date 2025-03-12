import { useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import PhoneList from '@/components/PhoneList';
import PhoneDetail from '@/components/PhoneDetail';
import { usePhones } from '@/hooks/usePhones';
import { Phone } from '@/types';

export default function Home() {
  const { phones, isLoading, error } = usePhones();
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box my={4}>
        <Typography color="error" variant="h6">
          Error loading phones: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Phone Ratings
        </Typography>
        
        <Box display="flex" mt={4}>
          <Box width="40%" pr={2}>
            <PhoneList 
              phones={phones || []}
              onPhoneSelect={(phone) => setSelectedPhone(phone)}
              selectedPhoneId={selectedPhone?.id}
            />
          </Box>
          
          <Box width="60%" pl={2}>
            {selectedPhone ? (
              <PhoneDetail phone={selectedPhone} />
            ) : (
              <Typography variant="h6" align="center" color="textSecondary">
                Select a phone to view details and ratings
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}