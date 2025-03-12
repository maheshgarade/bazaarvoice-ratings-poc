import { 
    Box, 
    Typography, 
    Rating, 
    Divider, 
    Card, 
    CardContent, 
    Avatar, 
    Chip
  } from '@mui/material';
  import { Review } from '@/types';
  import ThumbUpIcon from '@mui/icons-material/ThumbUp';
  import ThumbDownIcon from '@mui/icons-material/ThumbDown';
  
  interface ReviewListProps {
    reviews: Review[];
  }
  
  export default function ReviewList({ reviews }: ReviewListProps) {
    if (reviews.length === 0) {
      return (
        <Box my={2}>
          <Typography variant="body1" color="text.secondary" align="center">
            No reviews available for this product yet.
          </Typography>
        </Box>
      );
    }
  
    return (
      <Box>
        {reviews.map((review, index) => (
          <Card key={review.id} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, mr: 1 }}>
                    {review.reviewer.name.charAt(0)}
                  </Avatar>
                  <Typography variant="subtitle1">{review.reviewer.name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {new Date(review.submissionDate).toLocaleDateString()}
                </Typography>
              </Box>
              
              <Box display="flex" alignItems="center" my={1}>
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="subtitle2" ml={1}>
                  {review.title}
                </Typography>
              </Box>
              
              <Typography variant="body2" paragraph>
                {review.text}
              </Typography>
              
              {review.pros && (
                <Box mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Pros:
                  </Typography>
                  <Typography variant="body2">
                    {review.pros}
                  </Typography>
                </Box>
              )}
              
              {review.cons && (
                <Box mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Cons:
                  </Typography>
                  <Typography variant="body2">
                    {review.cons}
                  </Typography>
                </Box>
              )}
              
              <Box display="flex" mt={2}>
                <Chip 
                  icon={<ThumbUpIcon fontSize="small" />} 
                  label={`Helpful (${review.helpfulVotes || 0})`} 
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip 
                  icon={<ThumbDownIcon fontSize="small" />} 
                  label={`Not Helpful (${review.notHelpfulVotes || 0})`} 
                  variant="outlined"
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }