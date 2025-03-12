import { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Rating, 
  Divider, 
  Chip, 
  Grid,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import { Phone } from '@/types';
import ReviewList from './ReviewList';
import { useReviews } from '@/hooks/useReviews';

interface PhoneDetailProps {
  phone: Phone;
}

export default function PhoneDetail({ phone }: PhoneDetailProps) {
  const { reviews, isLoading, error } = useReviews(phone.id);
  const [displayCount, setDisplayCount] = useState(3);
  
  // Reset display count when phone changes
  useEffect(() => {
    setDisplayCount(3);
  }, [phone.id]);
  
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 3);
  };

  return (
    <Paper elevation={2}>
      <Box p={3}>
        <Box display="flex" alignItems="center" mb={2}>
          <Box mr={2}>
            {phone.image ? (
              <img src={phone.image} alt={phone.name} style={{ maxWidth: '80px' }} />
            ) : (
              <Avatar sx={{ width: 80, height: 80 }}>
                {phone.name.charAt(0)}
              </Avatar>
            )}
          </Box>
          <Box>
            <Typography variant="h4">{phone.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {phone.brand}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>Specifications</Typography>
                <Box mt={2}>
                  {phone.specs && Object.entries(phone.specs).map(([key, value]) => (
                    <Box key={key} display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        {key}:
                      </Typography>
                      <Typography variant="body2">
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>Ratings Summary</Typography>
                
                <Box display="flex" alignItems="center" mt={2}>
                  <Rating 
                    value={phone.rating?.average || 0} 
                    precision={0.1} 
                    readOnly 
                    size="large"
                  />
                  <Typography variant="h5" ml={1}>
                    {phone.rating?.average.toFixed(1) || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    ({phone.rating?.count || 0} reviews)
                  </Typography>
                </Box>
                
                <Box mt={2}>
                  {phone.rating?.distribution && 
                    Object.entries(phone.rating.distribution)
                      .sort((a, b) => Number(b[0]) - Number(a[0]))
                      .map(([stars, count]) => (
                        <Box key={stars} display="flex" alignItems="center" mb={1}>
                          <Box minWidth={40}>
                            <Typography variant="body2">{stars} ★</Typography>
                          </Box>
                          <Box 
                            sx={{ 
                              flexGrow: 1, 
                              bgcolor: 'grey.300', 
                              height: 8, 
                              borderRadius: 1,
                              mr: 1,
                              overflow: 'hidden'
                            }}
                          >
                            <Box 
                              sx={{ 
                                width: `${(count / phone.rating!.count) * 100}%`, 
                                bgcolor: 'primary.main', 
                                height: '100%' 
                              }} 
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {count}
                          </Typography>
                        </Box>
                      ))
                  }
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Box mt={3}>
          <Typography variant="h5" gutterBottom>
            Customer Reviews
          </Typography>
          
          {isLoading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">
              Error loading reviews: {error.message}
            </Typography>
          ) : (
            <>
              <ReviewList reviews={reviews?.slice(0, displayCount) || []} />
              
              {reviews && displayCount < reviews.length && (
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button 
                    variant="outlined" 
                    onClick={handleLoadMore}
                  >
                    Load More Reviews
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
}