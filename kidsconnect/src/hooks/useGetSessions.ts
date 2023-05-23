import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { DEFAULT_DATE, SCREENS } from '../constants/appConstants';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { SessionInterface } from '../Interface/SessionInterface';
import { baseAxios } from '../utils/AxiosInstance';

const { SESSIONS_PATH } = SCREENS;

export const useGetSessions = () => {
    const navigate = useNavigate();
    const { date } = useParams();
    const queryClient = useQueryClient();
    const [selectedDate, setSelectedDate] = useState<string>(date ?? DEFAULT_DATE);

    const selectedDay = useCallback(
        (day: string) => {
            const userDate = new Date(selectedDate);
            day === 'Next' ? userDate.setDate(userDate.getDate() + 1) : userDate.setDate(userDate.getDate() - 1);
            const formatUserDate = format(userDate, 'yyyy-MM-dd');
            setSelectedDate(formatUserDate);
            navigate(`${SESSIONS_PATH}/${formatUserDate}`);
        },
        [navigate, selectedDate],
    );

    const handleNextDay = useCallback(() => {
        selectedDay('Next');
    }, [selectedDay]);

    const handlePreviousDay = useCallback(() => {
        selectedDay('Previous');
    }, [selectedDay]);

    const handleDefaultDay = useCallback(() => {
        setSelectedDate(DEFAULT_DATE);
        navigate(SESSIONS_PATH);
    }, [navigate]);

    const fetchSessions = useCallback(async () => {
        try {
            const response = await baseAxios.get(`${SESSIONS_PATH}?day=${selectedDate}`);
            return response.data;
        } catch (error) {
            throw new Error('Unable To Fetch Sessions');
        }
    }, [selectedDate]);

    const {
        data: sessions,
        isLoading,
        error,
        isError,
    } = useQuery<SessionInterface[], Error>(['sessions', selectedDate], fetchSessions);

    const { mutate: onUpdateStatus } = useMutation<void, unknown, { sessionId: number; changeStatus: string }>(
        ({ sessionId, changeStatus }) => {
            return baseAxios.patch(`${SESSIONS_PATH}/${sessionId}`, {
                presence: changeStatus,
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('sessions');
            },
            onError: (changeStatus, sessionId) => {
                throw new Error(`Unable to change ${changeStatus} status of child ID ${sessionId}`);
            },
        },
    );

    /* useMutation(async ({ sessionId, changeStatus }: SessionUpdateStatusProps) => {
        try {
            await baseAxios.patch(`${SESSIONS_PATH}/${sessionId}`, {
                presence: changeStatus,
            });
            // refetch();
            queryClient.invalidateQueries('sessions');
        } catch (error) {
            throw new Error(`Unable to change ${changeStatus} status of child ID ${sessionId}`);
        }
    }) */

    const handleStatusChange = useCallback(
        (sessionId: number, previousStatus: string) => {
            let changeStatus: string;
            if (previousStatus === 'unknown') {
                changeStatus = 'present';
            } else if (previousStatus === 'present') {
                changeStatus = 'picked up';
            } else {
                changeStatus = 'unknown';
            }
            onUpdateStatus({ sessionId, changeStatus });
        },
        [onUpdateStatus],
    );

    return {
        sessions,
        isLoading,
        error,
        isError,
        selectedDate,
        handleDefaultDay,
        handlePreviousDay,
        handleNextDay,
        handleStatusChange,
    };
};
