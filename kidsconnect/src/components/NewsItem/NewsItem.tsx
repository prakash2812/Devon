import { Typography } from '@mui/material';
import { NewsItemProps } from '../../Interface/NewsInterface';

const NewsItem = ({ newsItem }: NewsItemProps) => {
    const { id, title, content, author, date = 'NA' } = newsItem;
    return (
        <div key={id} className="news-items">
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1" className="author-news-item">
                <em>Author:</em>
                {author}
            </Typography>
            <Typography variant="body1">{content}</Typography>
            <Typography variant="body1" className="author-news-item">
                <em>Posted On:</em>
                {date}
            </Typography>
        </div>
    );
};

export default NewsItem;
