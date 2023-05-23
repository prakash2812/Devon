import { NavLink } from 'react-router-dom';
const menuLists = [
    { id: crypto.randomUUID(), name: 'Home', to: '/' },
    { id: crypto.randomUUID(), name: 'Sessions', to: '/sessions' },
    { id: crypto.randomUUID(), name: 'Childrens', to: '/children' },
    { id: crypto.randomUUID(), name: 'News', to: '/news' },
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
