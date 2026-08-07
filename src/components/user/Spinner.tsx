import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress size="25px" aria-label="Loading…" />
        </Box>
    );
}

export default Spinner
