import { useRef, type ImgHTMLAttributes } from "react";

/**
 * Imagem com parallax suave: ao mover o mouse por cima, ela se inclina e
 * desliza de leve seguindo o cursor. Volta ao normal ao tirar o mouse.
 * Manipula o transform direto no DOM (sem re-render) para ficar fluido.
 */
export default function ParallaxPhoto({
  className = "",
  strength = 10,
  ...imgProps
}: ImgHTMLAttributes<HTMLImageElement> & { strength?: number }) {
  const ref = useRef<HTMLImageElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.transform = `scale(1.06) translate(${(-px * strength).toFixed(2)}px, ${(-py * strength).toFixed(2)}px) rotateX(${(py * 4).toFixed(2)}deg) rotateY(${(-px * 4).toFixed(2)}deg)`;
  };

  const reset = () => {
    const node = ref.current;
    if (node) {
      node.style.transform = "";
    }
  };

  return (
    <img
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`${className} transition-transform duration-300 ease-out will-change-transform`}
      style={{ transformStyle: "preserve-3d" }}
      {...imgProps}
    />
  );
}
