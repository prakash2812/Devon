export interface ChildrenInterface {
    id: number;
    name: string;
    avatar: string;
}

export interface ChildrensStateProps {
    childrens: ChildrenInterface[];
    isLoading: boolean;
    error: {
        isError: boolean;
        message: string;
    };
}
