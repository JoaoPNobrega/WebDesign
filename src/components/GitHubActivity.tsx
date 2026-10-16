import { contributionTotal, contributionWeeks, contributionColors } from "../lib/github-activity";

const months = [["Out", 0], ["Nov", 3], ["Dez", 8], ["Jan", 13], ["Fev", 17], ["Mar", 21], ["Abr", 26], ["Mai", 30], ["Jun", 34], ["Jul", 39], ["Ago", 43], ["Set", 47], ["Out", 51]] as const;
const intensity = ["sem atividade", "atividade leve", "atividade moderada", "atividade alta", "atividade muito alta"];

export default function GitHubActivity() {
  return (
    <figure className="github-activity" aria-label={`${contributionTotal.toLocaleString("pt-BR")} contribuições no último ano. Registro do perfil de João Pedro no GitHub.`}>
      <figcaption className="github-activity__heading">
        <div><strong>{contributionTotal.toLocaleString("pt-BR")}</strong><span>contribuições no último ano</span></div>
        <a href="https://github.com/JoaoPNobrega" target="_blank" rel="noreferrer">Meu GitHub ↗</a>
      </figcaption>
      <div className="github-activity__calendar" aria-hidden="true">
        <div className="github-activity__months">{months.map(([month, week]) => <span key={`${month}-${week}`} style={{ gridColumn: week + 1 }}>{month}</span>)}</div>
        <div className="github-activity__grid">{contributionWeeks.flatMap((week, column) => [...week].map((level, row) => <span key={`${column}-${row}`} data-contribution-cell data-level={level} style={{ backgroundColor: contributionColors[Number(level)], animationDelay: `${360 + column * 3 + row * 9}ms` }} title={`Semana ${column + 1}: ${intensity[Number(level)]}`} />))}</div>
      </div>
      <div className="github-activity__footer"><span>Um pouco do que construo, dia após dia.</span><div aria-hidden="true">Menos {contributionColors.map(color => <i key={color} style={{ backgroundColor: color }} />)} Mais</div></div>
    </figure>
  );
}
