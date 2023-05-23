import daycare1 from '../assets/daycare1.jpg';
import daycare3 from '../assets/daycare3.jpg';
const Home = () => {
    /* Rendering Hero block images in default landing page*/
    return (
        <section className="hero-block">
            <div>
                <img loading="lazy" src={daycare1} alt="daycare1" />
            </div>
            <div>
                <img loading="lazy" src={daycare3} alt="daycare3" />
            </div>
        </section>
    );
};

export default Home;
