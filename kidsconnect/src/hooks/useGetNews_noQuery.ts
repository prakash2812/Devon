import { useReducer, useEffect, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NewStateProps, formStateProps } from '../Interface/NewsInterface';
import { useLocation, useNavigate } from 'react-router-dom';
import { SCREENS } from '../constants/appConstants';
import { baseAxios } from '../utils/AxiosInstance';

const { NEWS_PATH, NEWS_POST_PATH, POSTNEWS_PATH } = SCREENS;
const initialState = {
    news: [],
    isLoading: false,
    error: {
        isError: false,
        message: '',
    },
};
const newsReducer = (previous: NewStateProps, update: Partial<NewStateProps>) => ({
    ...previous,
    ...update,
});
const useGetNews = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isFormPath = location.pathname.split('/').includes(POSTNEWS_PATH);
    const [{ news, isLoading, error }, setNews] = useReducer(newsReducer, initialState);
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
    const onSubmit: SubmitHandler<formStateProps> = async (data) => {
        const { title, author, content } = data;
        try {
            setNews({
                isLoading: true,
            });
            const response = await baseAxios.post(NEWS_PATH, {
                title,
                author,
                content,
            });
            setNews({
                news: response.data,
                isLoading: false,
            });
        } catch (error) {
            setNews({
                news: [],
                isLoading: false,
                error: {
                    isError: true,
                    message: 'Unable to Post News',
                },
            });
        }
        reset(); // Reset the form fields
        navigate(NEWS_PATH);
        setForm(false);
    };
    // fetch recent and all news
    const fetchNews = useCallback(async () => {
        try {
            setNews({
                isLoading: true,
            });
            const response = await baseAxios.get(NEWS_PATH);
            // to show recent news on top using reverse data
            setNews({
                news: response.data.reverse(),
                isLoading: false,
            });
        } catch (error) {
            setNews({
                news: [],
                isLoading: false,
                error: {
                    isError: true,
                    message: 'Unable to Fetch News',
                },
            });
        }
    }, []);

    useEffect(() => {
        fetchNews();
    }, [fetchNews, isForm]);

    return { news, isLoading, error, isForm, setForm, openNewsForm, handleBackToNews, onSubmit };
};

export default useGetNews;
