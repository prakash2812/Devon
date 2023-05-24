import { Avatar, CircularProgress } from '@mui/material';

const Loader = () => {
    return (
        <div className="loading">
            <Avatar sx={{ width: 80, height: 80 }}>
                <CircularProgress />
            </Avatar>
        </div>
    );
};

export default Loader;
