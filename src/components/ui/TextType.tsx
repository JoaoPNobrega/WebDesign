import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  cursorCharacter?: ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
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
  cursorBlinkDuration = 0.5,
  cursorClassName = "",
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
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
  const processedText = reverseMode ? currentText.split("").reverse().join("") : currentText;

  const getTypingDelay = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    return Math.random() * (variableSpeed.max - variableSpeed.min) + variableSpeed.min;
  }, [typingSpeed, variableSpeed]);

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

        onSentenceComplete?.(textArray[currentTextIndex] ?? "", currentTextIndex);
        setCurrentTextIndex((current) => (current + 1) % textArray.length);
        setCurrentCharIndex(0);
        return;
      }

      timeout = setTimeout(() => {
        setDisplayedText((current) => current.slice(0, -1));
      }, deletingSpeed);
    } else if (currentCharIndex < processedText.length) {
      timeout = setTimeout(
        () => {
          setDisplayedText((current) => current + processedText[currentCharIndex]);
          setCurrentCharIndex((current) => current + 1);
        },
        currentCharIndex === 0 && displayedText === "" ? initialDelay : getTypingDelay(),
      );
    } else if (loop && textArray.length >= 1) {
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
    getTypingDelay,
    initialDelay,
    isDeleting,
    isVisible,
    loop,
    onSentenceComplete,
    pauseDuration,
    processedText,
    shouldReduceMotion,
    textArray,
  ]);

  const shouldHideCursor = hideCursorWhileTyping && (currentCharIndex < processedText.length || isDeleting);
  const cursorStyle = { "--text-type-cursor-speed": `${cursorBlinkDuration}s` } as CSSProperties;
  const currentTextColor = textColors.length > 0 ? textColors[currentTextIndex % textColors.length] : undefined;
  const cursorElement =
    showCursor && !shouldReduceMotion ? (
      <span
        className={`ml-1 inline-block animate-[text-type-cursor-blink_var(--text-type-cursor-speed)_ease-in-out_infinite] opacity-100 ${shouldHideCursor ? "hidden" : ""} ${cursorClassName}`}
        style={cursorStyle}
      >
        {cursorCharacter}
      </span>
    ) : null;

  return (
    <Component ref={containerRef} className={`inline-block whitespace-pre-wrap tracking-tight ${className}`} {...props}>
      {reserveSpace ? (
        <>
          <span aria-hidden="true" className="invisible block">
            {currentText}
            {showCursor ? cursorCharacter : ""}
          </span>
          <span className="absolute inset-0 block">
            <span style={{ color: currentTextColor }}>{displayedText}</span>
            {cursorElement}
          </span>
        </>
      ) : (
        <>
          <span style={{ color: currentTextColor }}>{displayedText}</span>
          {cursorElement}
        </>
      )}
    </Component>
  );
}
