import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { ChildrenInterface } from '../Interface/ChildrensInterface';
import { baseAxios } from '../utils/AxiosInstance';
import { SCREENS } from '../constants/appConstants';

const { CHILDREN_PATH } = SCREENS;
export const useGetChildrens = () => {
    const fetchChildrens = useCallback(async () => {
        try {
            const response = await baseAxios.get(CHILDREN_PATH);
            return response.data;
        } catch (error) {
            throw new Error('Unable To Fetch Childrens');
        }
    }, []);

    const {
        data: childrens,
        isLoading,
        error,
        isError,
    } = useQuery<ChildrenInterface[], Error>('childrens', fetchChildrens);

    return { childrens, isLoading, error, isError };
};
