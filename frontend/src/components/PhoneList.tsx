import { 
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Avatar,
    Paper,
    Typography,
    Box,
    Rating
  } from '@mui/material';
  import PhoneIcon from '@mui/icons-material/Smartphone';
  import { Phone } from '@/types';
  
  interface PhoneListProps {
    phones: Phone[];
    onPhoneSelect: (phone: Phone) => void;
    selectedPhoneId?: string;
  }
  
  export default function PhoneList({ phones, onPhoneSelect, selectedPhoneId }: PhoneListProps) {
    return (
      <Paper elevation={2} sx={{ height: '100%' }}>
        <Box p={2}>
          <Typography variant="h5" gutterBottom>
            Phone Models
          </Typography>
        </Box>
        
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {phones.map((phone) => (
            <ListItem 
              key={phone.id}
              alignItems="flex-start"
              button
              onClick={() => onPhoneSelect(phone)}
              selected={phone.id === selectedPhoneId}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                }
              }}
            >
              <ListItemAvatar>
                <Avatar alt={phone.name}>
                  {phone.image ? (
                    <img src={phone.image} alt={phone.name} width="40" />
                  ) : (
                    <PhoneIcon />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={phone.name}
                secondary={
                  <Box>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {phone.brand}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={0.5}>
                      <Rating 
                        value={phone.rating?.average || 0} 
                        precision={0.1}
                        size="small"
                        readOnly 
                      />
                      <Typography variant="body2" color="text.secondary" ml={0.5}>
                        ({phone.rating?.count || 0})
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }