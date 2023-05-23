import { SubmitHandler } from 'react-hook-form';
import { UseMutateFunction } from 'react-query';

export interface NewsInterface {
    id: number;
    title: string;
    author: string;
    content: string;
}

export interface NewStateProps {
    news: NewsInterface[];
    isLoading: boolean;
    error: {
        isError: boolean;
        message: string;
    };
}

export interface formStateProps {
    id?: number;
    title: string;
    author: string;
    content: string;
}

export interface NewsItemProps {
    newsItem: formStateProps;
}

export interface formInterfaceProps {
    onSubmit: UseMutateFunction<void, unknown, formStateProps, unknown>;
    handleBackToNews: () => void;
    // onSubmit: SubmitHandler<formStateProps>;
}
