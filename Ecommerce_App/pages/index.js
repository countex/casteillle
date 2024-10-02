import { useEffect } from 'react';
import { gsap } from 'gsap';
import Home from '../components/Home';

export default function Index() {
    useEffect(() => {
        gsap.from('.animate', { duration: 1, y: -50, opacity: 0, stagger: 0.2 });
    }, []);

    return (
        <div>
            <Home />
        </div>
    );
}