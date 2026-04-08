'use client';

import {
	motion,
	useInView,
	useMotionTemplate,
	useReducedMotion,
	useScroll,
	useSpring,
	useTransform,
} from 'framer-motion';
import { type ReactNode, useEffect, useRef, useState } from 'react';

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
	/** Optional visual replacement for the central media. */
	centerVisual?: ReactNode;
	/** How many "scroll units" (pixels of wheel delta) needed to go from 0 to 1 (default 3000) */
	scrollBudget?: number;
	/** Intersection ratio that locks the section into place (default 0.9) */
	lockThreshold?: number;
	/** Adds a cinematic fade into the following dark section at the end of the effect. */
	endBlend?: boolean;
}

function ZoomMedia({
	media,
	index,
	shouldLoad,
}: {
	media: ZoomMediaAsset;
	index: number;
	shouldLoad: boolean;
}) {
	const [hasVideoError, setHasVideoError] = useState(false);
	const [currentImageSrc, setCurrentImageSrc] = useState(media.src);
	const mediaType = media.type ?? 'image';
	const transparentPlaceholder =
		'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

	useEffect(() => {
		setHasVideoError(false);
		setCurrentImageSrc(media.src);
	}, [media.fallbackSrc, media.src, media.type]);

	if (mediaType === 'video' && !hasVideoError) {
		return (
			<video
				src={shouldLoad ? media.src : undefined}
				poster={media.posterSrc ?? media.fallbackSrc}
				autoPlay={shouldLoad}
				muted
				loop
				playsInline
				preload="metadata"
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
			src={shouldLoad ? currentImageSrc || media.fallbackSrc || '/placeholder.svg' : transparentPlaceholder}
			alt={media.alt || `Parallax image ${index + 1}`}
			loading="lazy"
			decoding="async"
			fetchPriority={index === 0 && shouldLoad ? 'high' : 'auto'}
			className={`h-full w-full object-cover [backface-visibility:hidden] ${media.objectPosition === 'bottom' ? 'object-bottom' : ''} ${media.objectPosition === 'top' ? 'object-top' : ''}`}
			onError={() => {
				if (!media.fallbackSrc || currentImageSrc === media.fallbackSrc) return;
				setCurrentImageSrc(media.fallbackSrc);
			}}
		/>
	);
}

export function ZoomParallax({
	images,
	centerVisual,
	scrollBudget = 3000,
	lockThreshold = 0.9,
	endBlend = false,
}: ZoomParallaxProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const clampedLockThreshold = Math.min(0.99, Math.max(0.1, lockThreshold));
	const shouldReduceMotion = useReducedMotion();
	const isNearViewport = useInView(containerRef, {
		margin: '900px 0px',
	});
	const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	// Native sticky scroll replaces manual wheel/touch locking for a smoother
	// "brake" that cannot be skipped by normal fast scrolling.
	const progress = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 1]);
	const visualProgress = useSpring(progress, {
		stiffness: 120,
		damping: 24,
		mass: 0.42,
	});
	const entryProgress = useTransform(
		scrollYProgress,
		[0, Math.max(0.08, 0.2 * clampedLockThreshold)],
		shouldReduceMotion ? [1, 1] : [0, 1],
	);
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
	const endBlendOpacity = useTransform(
		scrollYProgress,
		[0.72, 0.9, 1],
		shouldReduceMotion ? [1, 1, 1] : [0, 0.55, 1],
	);
	const shouldLoadMedia = isNearViewport || hasEnteredViewport;

	useEffect(() => {
		if (isNearViewport) {
			setHasEnteredViewport(true);
		}
	}, [isNearViewport]);

	return (
		<div
			ref={containerRef}
			className="relative"
			style={{ height: shouldReduceMotion ? '100vh' : `calc(100vh + ${scrollBudget}px)` }}
		>
			<div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">
				<motion.div
					style={{
						scale: stageScale,
						y: stageY,
						opacity: stageOpacity,
						filter: stageFilter,
						borderRadius: stageRadius,
					}}
					className="relative h-full w-full overflow-hidden [contain:layout_paint_style] [content-visibility:auto] will-change-transform"
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
								className={`absolute top-0 flex h-full w-full transform-gpu items-center justify-center [backface-visibility:hidden] [will-change:transform] ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[30vh] [&>div]:!-left-[18vw] [&>div]:!h-[23vh] [&>div]:!w-[22vw]' : ''} ${index === 6 ? '[&>div]:!top-[25vh] [&>div]:!left-[25vw] [&>div]:!h-[22vh] [&>div]:!w-[14vw]' : ''} `}
							>
								<div className="relative h-[25vh] w-[25vw] transform-gpu [backface-visibility:hidden]">
									{index === 0 && centerVisual ? centerVisual : <ZoomMedia media={media} index={index} shouldLoad={shouldLoadMedia} />}
								</div>
							</motion.div>
						);
					})}
				</motion.div>
				{endBlend && (
					<motion.div
						aria-hidden="true"
						style={{ opacity: endBlendOpacity }}
						className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[72vh] bg-[linear-gradient(180deg,rgba(5,5,5,0)_0%,rgba(5,5,5,0.58)_48%,#050505_100%)]"
					/>
				)}
			</div>
		</div>
	);
}
