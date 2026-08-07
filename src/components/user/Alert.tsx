import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
interface AlertProps {
    type: "success" | "error";
    message: string;
}

const AlertUser = ({ type, message }: AlertProps) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            {type === "success" ?
                <Alert severity="success">{message}</Alert>
                :
                <Alert severity="error">{message}</Alert>}
        </Stack>
    )
}

export default AlertUser