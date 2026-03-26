'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: Image[];
	/** How many "scroll units" (pixels of wheel delta) needed to go from 0→1 (default 3000) */
	scrollBudget?: number;
}

export function ZoomParallax({ images, scrollBudget = 3000 }: ZoomParallaxProps) {
	const stickyRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef(0);
	const isLockedRef = useRef(false);
	const hasFinishedRef = useRef(false);
	const touchStartY = useRef(0);

	// Framer-motion value driven by our virtual scroll
	const progress = useMotionValue(0);

	// Build zoom scales from progress (0 → 1)
	const scale4 = useTransform(progress, [0, 1], [1, 4]);
	const scale5 = useTransform(progress, [0, 1], [1, 5]);
	const scale6 = useTransform(progress, [0, 1], [1, 6]);
	const scale8 = useTransform(progress, [0, 1], [1, 8]);
	const scale9 = useTransform(progress, [0, 1], [1, 9]);
	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	// No longer using contentOpacity to keep images at 100% opacity as requested

	const lockScroll = useCallback(() => {
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';
	}, []);

	const unlockScroll = useCallback(() => {
		document.documentElement.style.overflow = '';
		document.body.style.overflow = '';
	}, []);

	useEffect(() => {
		const el = stickyRef.current;
		if (!el) return;

		// ── Intersection Observer: detect when the sticky area is on-screen ──
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
					if (!isLockedRef.current && !hasFinishedRef.current) {
						// Snap the page so the section is exactly at top
						el.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
						isLockedRef.current = true;
						lockScroll();
					}
				}
			},
			{ threshold: [0.9, 1.0] },
		);

		observer.observe(el);

		// ── Wheel handler: eat the scroll, feed the progress ──
		const onWheel = (e: WheelEvent) => {
			if (!isLockedRef.current) return;

			e.preventDefault();
			e.stopPropagation();

			const delta = e.deltaY;
			progressRef.current = Math.min(1, Math.max(0, progressRef.current + delta / scrollBudget));
			progress.set(progressRef.current);

			// Scrolling backwards past 0 → unlock upward
			if (progressRef.current <= 0 && delta < 0) {
				isLockedRef.current = false;
				unlockScroll();
				return;
			}

			// Finished → unlock downward
			if (progressRef.current >= 1) {
				isLockedRef.current = false;
				hasFinishedRef.current = true;
				unlockScroll();
			}
		};

		// ── Touch handlers for mobile ──
		const onTouchStart = (e: TouchEvent) => {
			touchStartY.current = e.touches[0].clientY;
		};

		const onTouchMove = (e: TouchEvent) => {
			if (!isLockedRef.current) return;

			e.preventDefault();
			e.stopPropagation();

			const currentY = e.touches[0].clientY;
			const delta = touchStartY.current - currentY; // positive = scroll down
			touchStartY.current = currentY;

			progressRef.current = Math.min(1, Math.max(0, progressRef.current + delta / (scrollBudget * 0.4)));
			progress.set(progressRef.current);

			if (progressRef.current <= 0 && delta < 0) {
				isLockedRef.current = false;
				unlockScroll();
				return;
			}

			if (progressRef.current >= 1) {
				isLockedRef.current = false;
				hasFinishedRef.current = true;
				unlockScroll();
			}
		};

		window.addEventListener('wheel', onWheel, { passive: false });
		window.addEventListener('touchstart', onTouchStart, { passive: true });
		window.addEventListener('touchmove', onTouchMove, { passive: false });

		// ── Reset when user scrolls back above the section ──
		const onNativeScroll = () => {
			if (!containerRef.current || isLockedRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			// If we're above the section again, let the lock re-trigger
			if (rect.top > window.innerHeight * 0.5 && hasFinishedRef.current) {
				hasFinishedRef.current = false;
				progressRef.current = 0;
				progress.set(0);
			}
		};
		window.addEventListener('scroll', onNativeScroll, { passive: true });

		return () => {
			observer.disconnect();
			window.removeEventListener('wheel', onWheel);
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('scroll', onNativeScroll);
			unlockScroll();
		};
	}, [lockScroll, unlockScroll, progress, scrollBudget]);

	return (
		<div ref={containerRef} className="relative" style={{ height: '100vh' }}>
			<div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
				<motion.div style={{ opacity: 1 }} className="h-full w-full">
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
				</motion.div>
			</div>
		</div>
	);
}
