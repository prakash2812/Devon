import { Typography, Button } from '@mui/material';
import SessionItem from '../../components/SessionItem/SessionItem';
import { useGetSessions } from '../../hooks/useGetSessions';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/Error/ErrorMessage';
import FilterSessions from '../../components/FilterSessions/FilterSessions';
import './SessionOverview.css';

const SessionsOverview = () => {
    /* To simplify code and readability, customs hooks are written only callaback or refrences or values can be used */
    const {
        sessions,
        isLoading,
        error,
        isError,
        selectedDate,
        listOfGroups,
        selectedGroups,
        handleDefaultDay,
        handlePreviousDay,
        handleNextDay,
        handleStatusChange,
        handleGroupFilter,
    } = useGetSessions();

    const filterSessionProps = {
        listOfGroups,
        selectedGroups,
        handleGroupFilter,
    };
    /* Incase API takes long time to response,showing Loader Component as fallback UI */
    if (isLoading) return <Loader />;
    /* Incase API failed with any error, showing Error Component as fallback UI */
    if (isError) return <ErrorMessage message={error?.message} />;

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
                <FilterSessions {...filterSessionProps} />
            </div>
            <div className="session-items">
                {sessions && sessions?.length > 0 ? (
                    sessions?.map((session) => (
                        <SessionItem key={session.id} session={session} handleStatusChange={handleStatusChange} />
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
