import { useEffect, useCallback, useReducer } from 'react';
import { ChildrensStateProps } from '../Interface/ChildrensInterface';
import { baseAxios } from '../utils/AxiosInstance';
import { SCREENS } from '../constants/appConstants';

const { CHILDREN_PATH } = SCREENS;
const initialState = {
    childrens: [],
    isLoading: false,
    error: {
        isError: false,
        message: '',
    },
};
const childReducer = (previous: ChildrensStateProps, update: Partial<ChildrensStateProps>) => ({
    ...previous,
    ...update,
});
export const useGetChildrens = () => {
    const [{ childrens, isLoading, error }, setChildrens] = useReducer(childReducer, initialState);

    const fetchChildrens = useCallback(async () => {
        try {
            setChildrens({
                isLoading: true,
            });
            const response = await baseAxios.get(CHILDREN_PATH);
            setChildrens({
                childrens: response.data,
                isLoading: false,
            });
        } catch (error) {
            setChildrens({
                childrens: [],
                isLoading: false,
                error: {
                    isError: true,
                    message: 'Unable to Fetch Childrens',
                },
            });
        }
    }, []);

    useEffect(() => {
        fetchChildrens();
    }, [fetchChildrens]);
    return { childrens, isLoading, error };
};
