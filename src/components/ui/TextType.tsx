import { type ElementType, type HTMLAttributes, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TextTypeProps extends HTMLAttributes<HTMLElement> {
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorClassName?: string;
  startOnVisible?: boolean;
  reserveSpace?: boolean;
}

export default function TextType({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  startOnVisible = false,
  reserveSpace = false,
  ...props
}: TextTypeProps) {
  const shouldReduceMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const containerRef = useRef<HTMLElement | null>(null);
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const currentText = textArray[currentTextIndex] ?? "";

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(currentText);
      return;
    }

    if (!isVisible) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (displayedText === "") {
        setIsDeleting(false);

        if (currentTextIndex === textArray.length - 1 && !loop) {
          return;
        }

        setCurrentTextIndex((current) => (current + 1) % textArray.length);
        setCurrentCharIndex(0);
        return;
      }

      timeout = setTimeout(() => {
        setDisplayedText((current) => current.slice(0, -1));
      }, deletingSpeed);
    } else if (currentCharIndex < currentText.length) {
      timeout = setTimeout(
        () => {
          setDisplayedText((current) => current + currentText[currentCharIndex]);
          setCurrentCharIndex((current) => current + 1);
        },
        currentCharIndex === 0 && displayedText === "" ? initialDelay : typingSpeed,
      );
    } else if (loop && textArray.length > 1) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    currentText,
    currentTextIndex,
    deletingSpeed,
    displayedText,
    initialDelay,
    isDeleting,
    isVisible,
    loop,
    pauseDuration,
    shouldReduceMotion,
    textArray,
    typingSpeed,
  ]);

  const shouldHideCursor = hideCursorWhileTyping && currentCharIndex < currentText.length && !isDeleting;

  return (
    <Component ref={containerRef} className={`whitespace-pre-wrap ${className}`} {...props}>
      {reserveSpace ? (
        <>
          <span aria-hidden="true" className="invisible block">
            {currentText}
            {showCursor ? cursorCharacter : ""}
          </span>
          <span className="absolute inset-0 block">
            <span>{displayedText}</span>
            {showCursor && !shouldReduceMotion ? (
              <span className={`ml-1 inline-block animate-pulse ${shouldHideCursor ? "hidden" : ""} ${cursorClassName}`}>
                {cursorCharacter}
              </span>
            ) : null}
          </span>
        </>
      ) : (
        <>
          <span>{displayedText}</span>
          {showCursor && !shouldReduceMotion ? (
            <span className={`ml-1 inline-block animate-pulse ${shouldHideCursor ? "hidden" : ""} ${cursorClassName}`}>
              {cursorCharacter}
            </span>
          ) : null}
        </>
      )}
    </Component>
  );
}
