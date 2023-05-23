import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { formInterfaceProps, formStateProps } from '../Interface/NewsInterface';

const NewsForm = ({ onSubmit, handleBackToNews }: formInterfaceProps) => {
    const { control, handleSubmit } = useForm<formStateProps>();
    return (
        <>
            <form
                className="news-newForm"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await onSubmit(data);
                    } catch (error) {
                        throw new Error('Unable To Fetch News');
                    }
                })}>
                <Controller
                    control={control}
                    name="title"
                    rules={{ required: true }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Title"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? 'Title is required' : ''}
                            sx={{ marginBottom: '1rem' }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="content"
                    rules={{ required: true }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Content"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? 'Content is required' : ''}
                            multiline
                            rows={4}
                            sx={{ marginBottom: '1rem' }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="author"
                    rules={{ required: true }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Author"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? 'Author is required' : ''}
                            sx={{ marginBottom: '1rem' }}
                        />
                    )}
                />
                <Button type="submit" variant="contained">
                    Create News
                </Button>
            </form>
            <Button onClick={handleBackToNews}>Go To News</Button>
        </>
    );
};

export default NewsForm;
