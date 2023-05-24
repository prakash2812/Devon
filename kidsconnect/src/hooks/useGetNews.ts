import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient, MutationFunction } from 'react-query';
import { NewsInterface, formStateProps } from '../Interface/NewsInterface';
import { useLocation, useNavigate } from 'react-router-dom';
import { SCREENS } from '../constants/appConstants';
import { baseAxios } from '../utils/AxiosInstance';
import { format } from 'date-fns';

const { NEWS_PATH, NEWS_POST_PATH, POSTNEWS_PATH } = SCREENS;

const useGetNews = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const location = useLocation();
    const isFormPath = location.pathname.split('/').includes(POSTNEWS_PATH);
    const { reset } = useForm<formStateProps>();
    const [isForm, setForm] = useState<boolean>(isFormPath ? true : false);

    const openNewsForm = () => {
        navigate(NEWS_POST_PATH);
        setForm(true);
    };
    const handleBackToNews = () => {
        navigate(NEWS_PATH);
        setForm(false);
    };

    // submit/create news post
    const createNews: MutationFunction<void, formStateProps> = useCallback(
        async (data: formStateProps) => {
            const { title, author, content } = data;
            try {
                await baseAxios.post(NEWS_PATH, {
                    title,
                    author,
                    content,
                    date: format(new Date(), 'yyyy-MM-dd HH:mm:ss a'),
                });
            } catch (error) {
                throw new Error('Unable To Create News');
            }
            reset(); // Reset the form fields
            navigate(NEWS_PATH);
            setForm(false);
            queryClient.invalidateQueries('news'); // Invalidate the news query to trigger refetch
        },
        [navigate, queryClient, reset],
    );

    // fetch recent and all news
    const fetchNews = useCallback(async () => {
        try {
            const response = await baseAxios.get(NEWS_PATH);
            // to show recent news on top using reverse data
            return response.data.reverse();
        } catch (error) {
            throw new Error('Unable To Fetch News');
        }
    }, []);

    const { data: news, isLoading, error, isError } = useQuery<NewsInterface[], Error>('news', fetchNews);
    const { mutate: onSubmit } = useMutation(createNews);
    return { news, isLoading, error, isError, isForm, setForm, openNewsForm, handleBackToNews, onSubmit };
};

export default useGetNews;
