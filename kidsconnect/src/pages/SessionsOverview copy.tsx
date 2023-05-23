import { Typography, Button } from '@mui/material';
import SessionItem from '../components/SessionItem';
import { useGetSessions } from '../hooks/useGetSessions';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const SessionsOverview = () => {
    /* To simplify code and readability, customs hooks are written only callaback or refrences or values can be used */
    const {
        sessions,
        isLoading,
        error: { status, message },
        selectedDate,
        handleDefaultDay,
        handlePreviousDay,
        handleNextDay,
        onUpdateStatus,
    } = useGetSessions();

    /* Incase API takes long time to response,showing Loader Component as fallback UI */
    if (isLoading) return <Loader />;
    /* Incase API failed with any error, showing Error Component as fallback UI */
    if (status) return <ErrorMessage message={message} />;

    /* Rendering list of all sessions after API returns successfully*/
    return (
        <section className="session-container">
            <div className="session-header">
                <Button onClick={handleDefaultDay} sx={{ margin: '.6rem' }}>
                    Today
                </Button>
                <Button variant="outlined" onClick={handlePreviousDay} sx={{ margin: '.6rem' }}>
                    Previous day
                </Button>
                <Button variant="outlined" onClick={handleNextDay} sx={{ margin: '.6rem' }}>
                    Next day
                </Button>
            </div>
            <div className="session-items">
                {sessions?.length > 0 ? (
                    sessions?.map((session) => (
                        <SessionItem key={session.id} session={session} onUpdateStatus={onUpdateStatus} />
                    ))
                ) : (
                    <Typography variant="body1" className="seesion-unavailable">
                        No sessions available for <em>{selectedDate}</em>
                    </Typography>
                )}
            </div>
        </section>
    );
};

export default SessionsOverview;
