export interface SessionInterface {
    id: number;
    start_time: string;
    end_time: string;
    product_name: string;
    child_id: number;
    group: {
        id: number;
        name: string;
    };
    presence: string;
}

export interface SessionStateProps {
    sessions: SessionInterface[];
    isLoading: boolean;
    error: {
        isError: boolean;
        message: string;
    };
}

export interface SessionItemProps {
    session: SessionInterface;
    handleStatusChange: (sessionId: number, changeStatus: string) => void;
}
