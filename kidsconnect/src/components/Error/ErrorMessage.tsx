const ErrorMessage = ({ message }: { message: string | undefined }) => {
    return <div className="errorMessage">{message}</div>;
};

export default ErrorMessage;
