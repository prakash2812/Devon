import { useGetChildrens } from '../hooks/useGetChildrens';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { Avatar, Typography } from '@mui/material';

const Childrens = () => {
    /* To simplify code and readability, customs hooks are written so only callaback or refrences or values can be used */
    const { childrens, isLoading, error, isError } = useGetChildrens();

    /* Incase API takes long time to response,showing Loader Component as fallback UI */
    if (isLoading) return <Loader />;
    /* Incase API failed with any error, showing Error Component as fallback UI */
    if (isError) return <ErrorMessage message={error?.message} />;

    /* Rendering list of all childrens after API returns successfully*/
    return (
        <section className="childrens-container">
            <div className="childrens-headings">
                <div>ID</div>
                <div>Name</div>
                <div>Avatar</div>
            </div>
            <div className="childrensData">
                {childrens && childrens.length > 0 ? (
                    childrens.map(({ id, name, avatar }) => {
                        return (
                            <div className="childrensList" key={id}>
                                <div>{id}</div>
                                <div>{name}</div>
                                <Avatar src={avatar} alt="Avatar" sx={{ width: 40, height: 40 }} />
                            </div>
                        );
                    })
                ) : (
                    <Typography variant="body1" className="children-unavailable">
                        No Childrens Data Available
                    </Typography>
                )}
            </div>
        </section>
    );
};

export default Childrens;
