'use client';

import {
	animate,
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
	useTransform,
} from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface ZoomMediaAsset {
	type?: 'image' | 'video';
	src: string;
	fallbackSrc?: string;
	posterSrc?: string;
	alt?: string;
	objectPosition?: 'top' | 'bottom' | 'center';
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: ZoomMediaAsset[];
	/** How many "scroll units" (pixels of wheel delta) needed to go from 0 to 1 (default 3000) */
	scrollBudget?: number;
	/** Intersection ratio that locks the section into place (default 0.9) */
	lockThreshold?: number;
}

function ZoomMedia({ media, index }: { media: ZoomMediaAsset; index: number }) {
	const [hasVideoError, setHasVideoError] = useState(false);
	const [currentImageSrc, setCurrentImageSrc] = useState(media.src);
	const mediaType = media.type ?? 'image';

	useEffect(() => {
		setHasVideoError(false);
		setCurrentImageSrc(media.src);
	}, [media.fallbackSrc, media.src, media.type]);

	if (mediaType === 'video' && !hasVideoError) {
		return (
			<video
				src={media.src}
				poster={media.posterSrc ?? media.fallbackSrc}
				autoPlay
				muted
				loop
				playsInline
				preload="auto"
				aria-label={media.alt || `Parallax video ${index + 1}`}
			className={`h-full w-full object-cover ${media.objectPosition === 'bottom' ? 'object-bottom' : ''} ${media.objectPosition === 'top' ? 'object-top' : ''}`}
				onError={() => {
					setHasVideoError(true);
				}}
			/>
		);
	}

	return (
		<img
			src={currentImageSrc || media.fallbackSrc || '/placeholder.svg'}
			alt={media.alt || `Parallax image ${index + 1}`}
			className={`h-full w-full object-cover ${media.objectPosition === 'bottom' ? 'object-bottom' : ''} ${media.objectPosition === 'top' ? 'object-top' : ''}`}
			onError={() => {
				if (!media.fallbackSrc || currentImageSrc === media.fallbackSrc) return;
				setCurrentImageSrc(media.fallbackSrc);
			}}
		/>
	);
}

export function ZoomParallax({
	images,
	scrollBudget = 3000,
	lockThreshold = 0.9,
}: ZoomParallaxProps) {
	const stickyRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef(0);
	const isLockedRef = useRef(false);
	const isPrimingRef = useRef(false);
	const hasFinishedRef = useRef(false);
	const touchStartY = useRef(0);
	const snapTimeoutRef = useRef<number | null>(null);
	const entryAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
	const clampedLockThreshold = Math.min(0.99, Math.max(0.1, lockThreshold));

	// Separate target progress from rendered progress so the zoom has inertia.
	const progress = useMotionValue(0);
	const visualProgress = useSpring(progress, {
		stiffness: 120,
		damping: 24,
		mass: 0.42,
	});
	const entryProgress = useMotionValue(0);
	const entrySpring = useSpring(entryProgress, {
		stiffness: 180,
		damping: 28,
		mass: 0.55,
	});

	// Build zoom scales from progress (0 to 1).
	const scale4 = useTransform(visualProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(visualProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(visualProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(visualProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(visualProgress, [0, 1], [1, 9]);
	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	// Morph the section in so the lock feels more like a cinematic settle than a hard snap.
	const stageScale = useTransform(entrySpring, [0, 1], [0.965, 1]);
	const stageY = useTransform(entrySpring, [0, 1], [34, 0]);
	const stageOpacity = useTransform(entrySpring, [0, 1], [0.82, 1]);
	const stageBlur = useTransform(entrySpring, [0, 1], [18, 0]);
	const stageRadius = useTransform(entrySpring, [0, 1], [32, 0]);
	const stageSaturate = useTransform(entrySpring, [0, 1], [0.82, 1]);
	const stageBrightness = useTransform(entrySpring, [0, 1], [0.82, 1]);
	const stageFilter = useMotionTemplate`blur(${stageBlur}px) saturate(${stageSaturate}) brightness(${stageBrightness})`;
	const overlayOpacity = useTransform(entrySpring, [0, 1], [0.2, 0]);

	const lockScroll = useCallback(() => {
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overscrollBehavior = 'none';
		document.body.style.overscrollBehavior = 'none';
		document.body.style.touchAction = 'none';
	}, []);

	const unlockScroll = useCallback(() => {
		document.documentElement.style.overflow = '';
		document.body.style.overflow = '';
		document.documentElement.style.overscrollBehavior = '';
		document.body.style.overscrollBehavior = '';
		document.body.style.touchAction = '';
	}, []);

	const animateEntry = useCallback(
		(nextValue: number, duration = 0.55) => {
			entryAnimationRef.current?.stop();
			entryAnimationRef.current = animate(entryProgress, nextValue, {
				duration,
				ease: [0.22, 1, 0.36, 1],
			});
		},
		[entryProgress],
	);

	const releaseLock = useCallback(
		(markAsFinished: boolean) => {
			if (snapTimeoutRef.current !== null) {
				window.clearTimeout(snapTimeoutRef.current);
				snapTimeoutRef.current = null;
			}

			isPrimingRef.current = false;
			isLockedRef.current = false;
			hasFinishedRef.current = markAsFinished;
			unlockScroll();
		},
		[unlockScroll],
	);

	const beginCapture = useCallback(() => {
		const el = stickyRef.current;
		if (!el || isLockedRef.current || isPrimingRef.current || hasFinishedRef.current) {
			return;
		}

		const targetTop = window.scrollY + el.getBoundingClientRect().top;

		// IMPORTANT: Only lock if we are coming from ABOVE the element (scrolling down).
		// If the current scroll position is significantly below the target, we are 
		// likely scrolling up from the bottom of the page.
		if (window.scrollY > targetTop + 10) {
			return;
		}

		isPrimingRef.current = true;
		animateEntry(1, 0.65);
		window.scrollTo({ top: targetTop, behavior: 'smooth' });

		snapTimeoutRef.current = window.setTimeout(() => {
			window.scrollTo({ top: targetTop });
			isPrimingRef.current = false;
			isLockedRef.current = true;
			lockScroll();
		}, 420);
	}, [animateEntry, lockScroll]);

	useEffect(() => {
		const el = stickyRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting && entry.intersectionRatio >= clampedLockThreshold) {
					beginCapture();
				}
			},
			{ threshold: [clampedLockThreshold, 1] },
		);

		observer.observe(el);

		const onWheel = (e: WheelEvent) => {
			if (isPrimingRef.current) {
				e.preventDefault();
				e.stopPropagation();
				return;
			}

			if (!isLockedRef.current) return;

			e.preventDefault();
			e.stopPropagation();

			const delta = e.deltaY;

			// Release lock immediately if scrolling UP (delta < 0)
			if (delta < 0) {
				releaseLock(false);
				return;
			}

			progressRef.current = Math.min(1, Math.max(0, progressRef.current + delta / scrollBudget));
			progress.set(progressRef.current);

			if (progressRef.current >= 1) {
				releaseLock(true);
			}
		};

		const onTouchStart = (e: TouchEvent) => {
			touchStartY.current = e.touches[0].clientY;
		};

		const onTouchMove = (e: TouchEvent) => {
			if (isPrimingRef.current) {
				e.preventDefault();
				e.stopPropagation();
				return;
			}

			if (!isLockedRef.current) return;

			e.preventDefault();
			e.stopPropagation();

			const currentY = e.touches[0].clientY;
			const delta = touchStartY.current - currentY;
			touchStartY.current = currentY;

			progressRef.current = Math.min(1, Math.max(0, progressRef.current + delta / (scrollBudget * 0.4)));
			progress.set(progressRef.current);

			if (progressRef.current <= 0 && delta < 0) {
				releaseLock(false);
				return;
			}

			if (progressRef.current >= 1) {
				releaseLock(true);
			}
		};

		window.addEventListener('wheel', onWheel, { passive: false });
		window.addEventListener('touchstart', onTouchStart, { passive: true });
		window.addEventListener('touchmove', onTouchMove, { passive: false });

		const onNativeScroll = () => {
			if (!containerRef.current || isLockedRef.current || isPrimingRef.current) return;

			const rect = containerRef.current.getBoundingClientRect();
			if (rect.top > window.innerHeight * 0.55 && (hasFinishedRef.current || progressRef.current > 0)) {
				releaseLock(false);
				hasFinishedRef.current = false;
				progressRef.current = 0;
				progress.set(0);
				animateEntry(0, 0.35);
			}
		};

		window.addEventListener('scroll', onNativeScroll, { passive: true });

		return () => {
			releaseLock(false);
			entryAnimationRef.current?.stop();
			observer.disconnect();
			window.removeEventListener('wheel', onWheel);
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('scroll', onNativeScroll);
		};
	}, [animateEntry, beginCapture, clampedLockThreshold, progress, releaseLock, scrollBudget]);

	return (
		<div ref={containerRef} className="relative" style={{ height: '100vh' }}>
			<div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden bg-black">
				<motion.div
					style={{
						scale: stageScale,
						y: stageY,
						opacity: stageOpacity,
						filter: stageFilter,
						borderRadius: stageRadius,
					}}
					className="relative h-full w-full overflow-hidden will-change-transform"
				>
					<motion.div
						style={{ opacity: overlayOpacity }}
						className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),rgba(0,0,0,0.55)_72%)]"
					/>
					{images.map((media, index) => {
						const scale = scales[index % scales.length];

						return (
							<motion.div
								key={index}
								style={{ scale }}
								className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[30vh] [&>div]:!-left-[18vw] [&>div]:!h-[23vh] [&>div]:!w-[22vw]' : ''} ${index === 6 ? '[&>div]:!top-[25vh] [&>div]:!left-[25vw] [&>div]:!h-[22vh] [&>div]:!w-[14vw]' : ''} `}
							>
								<div className="relative h-[25vh] w-[25vw]">
									<ZoomMedia media={media} index={index} />
								</div>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</div>
	);
}
