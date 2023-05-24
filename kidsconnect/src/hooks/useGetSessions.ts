import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { DEFAULT_DATE, SCREENS } from '../constants/appConstants';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { SessionInterface } from '../Interface/SessionInterface';
import { baseAxios } from '../utils/AxiosInstance';
import { SelectChangeEvent } from '@mui/material';
import { useGetChildrens } from './useGetChildrens';

const { SESSIONS_PATH } = SCREENS;

export const useGetSessions = () => {
    const { childrens } = useGetChildrens();
    const navigate = useNavigate();
    const { date } = useParams();
    const queryClient = useQueryClient();
    const [filteredSessions, setFilteredSessions] = useState<SessionInterface[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const [listOfGroups, setListOfGroups] = useState<string[]>([]);
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [sessionsData, setSessionsData] = useState<SessionInterface[]>([]);
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
        data: sessionsList,
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

    const handleClearFilter = () => {
        setSelectedGroups([]);
    };
    const handleGroupFilter = (event: SelectChangeEvent<string[]>) => {
        const { value } = event.target;
        value.includes('') ? handleClearFilter() : setSelectedGroups(Array.isArray(value) ? value : [value]);
    };

    const allListOfGroups = () => {
        const groupLists = sessionsData?.map((session) => session.group.name);
        setListOfGroups([...new Set(groupLists)]);
    };

    const filteringSessions = () => {
        if (!selectedGroups.length) {
            setIsFiltered(false);
            return;
        }
        setIsFiltered(true);
        const filteredSessions = sessionsData?.filter((session) => selectedGroups.includes(session.group.name));
        setFilteredSessions(filteredSessions);
    };
    const combinedData = useCallback((): SessionInterface[] => {
        if (!sessionsList || !childrens) return [];
        return sessionsList?.reduce((acc, item) => {
            const child = childrens?.find((child) => child.id === item.child_id);
            if (child) {
                const { name, avatar } = child;
                acc.push({ ...item, name, avatar });
            }
            return acc;
        }, [] as SessionInterface[]);
    }, [childrens, sessionsList]);

    useEffect(() => {
        const finalResult = combinedData();
        setSessionsData(finalResult);
    }, [childrens, combinedData, sessionsList]);
    useEffect(allListOfGroups, [sessionsData]);
    useEffect(filteringSessions, [selectedGroups, sessionsData]);

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

    return {
        sessions: isFiltered ? filteredSessions : sessionsData,
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
    };
};
