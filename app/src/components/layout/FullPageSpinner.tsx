import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const FullPageSpinner = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
    }}
  >
    <CircularProgress/>
  </Box>
);