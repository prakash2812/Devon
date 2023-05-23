import { Route, Routes } from 'react-router-dom';
import News from '../pages/News';
import Page404 from '../pages/Page404';
import SessionsOverview from '../pages/SessionsOverview';
import Childrens from '../pages/Childrens';
import Home from '../pages/Home';
import { SCREENS } from '../constants/appConstants';

const { HOME_PATH, SESSIONS_PATH, NEWS_PATH, POSTNEWS_PATH, CHILDREN_PATH, NOTFOUND_PATH } = SCREENS;
const GlobalRouter = () => {
    return (
        <Routes>
            <Route path={HOME_PATH} element={<Home />} />
            <Route path={SESSIONS_PATH}>
                <Route index element={<SessionsOverview />} />
                <Route path=":date" element={<SessionsOverview />} />
            </Route>
            <Route path={NEWS_PATH}>
                <Route index element={<News />} />
                <Route path={POSTNEWS_PATH} element={<News />} />
            </Route>
            <Route path={CHILDREN_PATH} element={<Childrens />} />
            <Route path={NOTFOUND_PATH} element={<Page404 />} />
        </Routes>
    );
};

export default GlobalRouter;
