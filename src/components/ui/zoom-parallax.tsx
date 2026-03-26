'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: Image[];
	/** Duration in ms the scroll stays locked before zoom begins (default 2500) */
	lockDuration?: number;
}

export function ZoomParallax({ images, lockDuration = 2500 }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const stickyRef = useRef<HTMLDivElement>(null);
	const [isLocked, setIsLocked] = useState(false);
	const [hasUnlocked, setHasUnlocked] = useState(false);
	const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	// ─── Hard-lock scroll when section enters viewport ────────────────
	// Uses IntersectionObserver to detect when the sticky zone hits the
	// top of the screen, then blocks ALL scroll for `lockDuration` ms.
	const lockScroll = useCallback(() => {
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';
		// Also block touch scrolling on mobile
		document.addEventListener('touchmove', preventScroll, { passive: false });
		document.addEventListener('wheel', preventScroll, { passive: false });
	}, []);

	const unlockScroll = useCallback(() => {
		document.documentElement.style.overflow = '';
		document.body.style.overflow = '';
		document.removeEventListener('touchmove', preventScroll);
		document.removeEventListener('wheel', preventScroll);
	}, []);

	useEffect(() => {
		const el = stickyRef.current;
		if (!el || hasUnlocked) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				// Trigger only when the sticky container is fully at the top
				if (entry.isIntersecting && entry.intersectionRatio >= 0.95 && !isLocked && !hasUnlocked) {
					setIsLocked(true);
					lockScroll();

					lockTimerRef.current = setTimeout(() => {
						unlockScroll();
						setIsLocked(false);
						setHasUnlocked(true);
					}, lockDuration);
				}
			},
			{
				threshold: [0.95, 1.0],
			}
		);

		observer.observe(el);

		return () => {
			observer.disconnect();
			if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
			// Always clean up scroll lock on unmount
			unlockScroll();
		};
	}, [isLocked, hasUnlocked, lockDuration, lockScroll, unlockScroll]);

	// Reset lock state if user scrolls back up above the section
	useEffect(() => {
		if (!hasUnlocked) return;

		const unsubscribe = scrollYProgress.on('change', (v) => {
			if (v <= 0.01) {
				setHasUnlocked(false);
			}
		});

		return () => unsubscribe();
	}, [hasUnlocked, scrollYProgress]);

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	return (
		<div ref={container} className="relative h-[300vh]">
			<div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
				{images.map(({ src, alt }, index) => {
					const scale = scales[index % scales.length];

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
						>
							<div className="relative h-[25vh] w-[25vw]">
								<img
									src={src || '/placeholder.svg'}
									alt={alt || `Parallax image ${index + 1}`}
									className="h-full w-full object-cover"
								/>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}

// ─── Helpers ──────────────────────────────────────────────────────────
function preventScroll(e: Event) {
	e.preventDefault();
	e.stopPropagation();
}
