import { NavLink } from 'react-router-dom';
import { SCREENS } from '../../constants/appConstants';

const { SESSIONS_PATH, HOME_PATH, CHILDREN_PATH, NEWS_PATH } = SCREENS;
const menuLists = [
    { id: crypto.randomUUID(), name: 'Home', to: HOME_PATH },
    { id: crypto.randomUUID(), name: 'Sessions Overview', to: SESSIONS_PATH },
    // { id: crypto.randomUUID(), name: 'Childrens', to: CHILDREN_PATH },
    { id: crypto.randomUUID(), name: 'News', to: NEWS_PATH },
];
const Menu = () => {
    return (
        <>
            {menuLists.map(({ id, name, to }) => {
                return (
                    <NavLink key={id} to={to} className={({ isActive }) => (isActive ? 'active' : 'disactive')}>
                        {name}
                    </NavLink>
                );
            })}
        </>
    );
};

export default Menu;
