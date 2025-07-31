export interface ScrollAnimationOptions {
	threshold?: number;
	rootMargin?: string;
	duration?: number;
	delay?: number;
	animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up';
}

export function scrollAnimation(node: HTMLElement, options: ScrollAnimationOptions = {}) {
	const {
		threshold = 0.1,
		rootMargin = '0px 0px -50px 0px',
		duration = 600,
		delay = 0,
		animation = 'fade-up'
	} = options;

	node.style.opacity = '0';
	node.style.transition = `all ${duration}ms ease-out ${delay}ms`;

	switch (animation) {
		case 'fade-up':
			node.style.transform = 'translateY(30px)';
			break;
		case 'fade-in':
			break; // only opacity change
		case 'slide-left':
			node.style.transform = 'translateX(-30px)';
			break;
		case 'slide-right':
			node.style.transform = 'translateX(30px)';
			break;
		case 'scale-up':
			node.style.transform = 'scale(0.95)';
			break;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					(entry.target as HTMLElement).style.opacity = '1';
					(entry.target as HTMLElement).style.transform = 'none';
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
