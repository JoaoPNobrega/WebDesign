import { useState, type CSSProperties } from "react";

const DRAW_TIME_SCALE = .38;
const ENTRY_DELAY = .15;

// Centerline lettering traced from João's sketch. The final o returns to form N.
const strokes = [
  {
    id: "j",
    d: "M53 27 C62 41 56 59 44 70 C35 78 25 85 34 90 C39 93 47 88 53 85 M53 28 C48 48 57 75 63 101 C70 128 57 153 42 160 C25 167 16 139 27 119 C37 101 62 90 79 87",
    delay: .9, duration: 1,
  },
  {
    id: "oao",
    d: "M75 88 C77 76 87 76 86 85 C85 95 75 100 75 91 C74 83 85 78 88 82 C92 88 86 94 90 92 C95 91 96 80 100 81 C106 77 108 84 102 90 C96 96 93 90 97 85 C102 77 107 79 107 83 C104 91 105 94 111 88 C116 80 124 80 123 87 C122 95 113 99 112 92 C110 85 119 80 123 84 C128 88 130 87 134 84",
    delay: 1.9, duration: .8,
  },
  {
    id: "tilde",
    d: "M84 73 C87 64 93 77 99 67",
    delay: 2.7, duration: .2,
  },
  {
    id: "p",
    d: "M113 127 C118 102 123 69 129 34 C144 27 175 31 177 45 C180 64 151 81 123 85",
    delay: 2.9, duration: .9,
  },
  {
    id: "edro",
    d: "M136 88 C143 88 149 81 143 82 C136 83 134 96 142 94 C151 92 158 80 160 71 C161 63 154 79 153 91 C151 100 159 93 164 86 C161 96 165 95 170 88 C176 80 180 83 175 88 C171 94 176 95 183 89 C184 80 195 79 197 85 C199 92 184 98 184 90 C184 84 193 80 197 85",
    delay: 3.8, duration: .85,
  },
  {
    id: "o-return-n",
    d: "M197 85 C209 87 213 79 202 72 C183 61 154 60 133 67 C109 75 92 108 82 145 C84 116 86 72 89 40 C95 73 102 114 109 145 C113 111 117 67 121 31 C124 21 129 19 134 23",
    delay: 4.65, duration: 1.25,
  },
];

export default function Signature() {
  const [replay, setReplay] = useState(0);

  return (
    <button
      className="signature"
      type="button"
      aria-label="Repetir o desenho da assinatura de João Pedro, com o N final"
      onClick={() => setReplay((value) => value + 1)}
    >
      <svg key={replay} viewBox="12 15 212 158" fill="none" aria-hidden="true">
        {strokes.map((stroke) => (
          <path
            key={stroke.id}
            data-stroke={stroke.id}
            d={stroke.d}
            pathLength={1}
            style={{
              "--draw-delay": `${(replay ? 0 : ENTRY_DELAY) + (stroke.delay - strokes[0].delay) * DRAW_TIME_SCALE}s`,
              "--draw-duration": `${stroke.duration * DRAW_TIME_SCALE}s`,
            } as CSSProperties}
          />
        ))}
      </svg>
    </button>
  );
}
