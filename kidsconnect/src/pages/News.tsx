import { Typography, Button } from '@mui/material';
import NewForm from './NewsForm';
import useGetNews from '../hooks/useGetNews';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import NewsItem from '../components/NewsItem';

const News = () => {
    /* To simplify code and readability, customs hooks are written only callaback or refrences or values can be used */
    const { news, isLoading, error, isForm, isError, openNewsForm, handleBackToNews, onSubmit } = useGetNews();

    /* Incase API takes long time to response,showing Loader Component as fallback UI */
    if (isLoading) return <Loader />;
    /* Incase API failed with any error, showing Error Component as fallback UI */
    if (isError) return <ErrorMessage message={error?.message} />;

    /* 
    Conditionally Rendering list of all News after API returns successfully and rendering news form if user want to create news or post
    */
    return (
        <>
            {isForm ? (
                <section className="newsform-container">
                    <NewForm onSubmit={onSubmit} handleBackToNews={handleBackToNews} />
                </section>
            ) : (
                <section className="news-container">
                    <div className="news-headers">
                        <Typography variant="h4">News</Typography>
                        <Button variant="outlined" onClick={openNewsForm} sx={{ margin: '.6rem' }}>
                            Create New Post
                        </Button>
                    </div>
                    {news && news?.length > 0 ? (
                        news?.map((newsItem) => <NewsItem newsItem={newsItem} />)
                    ) : (
                        <Typography variant="body1" className="news-unavailable">
                            No news available.
                        </Typography>
                    )}
                </section>
            )}
        </>
    );
};

export default News;
