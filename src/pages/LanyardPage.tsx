import Lanyard from "@/components/Lanyard";

export default function LanyardPage() {
  return (
    <section className="min-h-screen bg-zinc-950">
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
    </section>
  );
}
