import { gsap } from 'gsap';

export const animateElement = (selector, options) => {
    gsap.from(selector, options);
};