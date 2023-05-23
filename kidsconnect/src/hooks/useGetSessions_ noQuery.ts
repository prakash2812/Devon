import { useState, useEffect, useCallback, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { SessionStateProps } from '../Interface/SessionInterface';
import { DEFAULT_DATE, SCREENS } from '../constants/appConstants';
import { baseAxios } from '../utils/AxiosInstance';

const { SESSIONS_PATH } = SCREENS;
const initialState = {
    sessions: [],
    isLoading: false,
    error: {
        isError: false,
        message: '',
    },
};
const sessionReducer = (previous: SessionStateProps, update: Partial<SessionStateProps>) => ({
    ...previous,
    ...update,
});
export const useGetSessions = () => {
    const navigate = useNavigate();
    const { date } = useParams();
    const [{ sessions, isLoading, error }, setSessions] = useReducer(sessionReducer, initialState);
    const [selectedDate, setSelectedDate] = useState<string>(date ?? DEFAULT_DATE);

    const selectedDay = (day: string) => {
        const userDate = new Date(selectedDate);
        day === 'Next' ? userDate.setDate(userDate.getDate() + 1) : userDate.setDate(userDate.getDate() - 1);
        const formatUserDate = format(userDate, 'yyyy-MM-dd');
        setSelectedDate(formatUserDate);
        navigate(`${SESSIONS_PATH}/${formatUserDate}`);
    };

    const handleNextDay = () => {
        selectedDay('Next');
    };

    const handlePreviousDay = () => {
        selectedDay('Previous');
    };

    const handleDefaultDay = () => {
        setSelectedDate(DEFAULT_DATE);
        navigate(SESSIONS_PATH);
    };

    const fetchSessions = useCallback(async () => {
        try {
            setSessions({
                isLoading: true,
            });
            const response = await baseAxios.get(`${SESSIONS_PATH}?day=${selectedDate}`);
            setSessions({
                sessions: response.data,
                isLoading: false,
            });
        } catch (error) {
            setSessions({
                sessions: [],
                isLoading: false,
                error: {
                    isError: true,
                    message: 'Unable To Fetch Sessions',
                },
            });
        }
    }, [selectedDate]);

    const onUpdateStatus = useCallback(
        async (sessionId: number, newStatus: string) => {
            try {
                setSessions({
                    isLoading: true,
                });
                await baseAxios.patch(`${SESSIONS_PATH}/${sessionId}`, {
                    presence: newStatus,
                });
                // Refetch the session data after status successful updated
                fetchSessions();
            } catch (error) {
                setSessions({
                    sessions: [],
                    isLoading: false,
                    error: {
                        isError: true,
                        message: `Unable to change ${newStatus} status of child ID ${sessionId}`,
                    },
                });
            }
        },
        [fetchSessions],
    );
    useEffect(() => {
        fetchSessions();
    }, [fetchSessions, selectedDate]);

    return {
        sessions,
        isLoading,
        error,
        selectedDate,
        handleDefaultDay,
        handlePreviousDay,
        handleNextDay,
        onUpdateStatus,
    };
};
