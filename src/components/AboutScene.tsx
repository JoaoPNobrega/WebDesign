import GitHubActivity from "./GitHubActivity";

export default function AboutScene() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="about-section__content">
      <div className="about-section__intro">
        <h2 id="about-title">Sobre mim</h2>
        <p>Sou <strong>João Pedro</strong>, desenvolvedor de software em Recife e estudante de Ciência da Computação na CESAR School. Crio experiências web unindo código, design e atenção aos detalhes.</p>
      </div>
      <GitHubActivity />
      </div>
    </section>
  );
}
