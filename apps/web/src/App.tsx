const cards = [
  "Clock In / Clock Out",
  "Project Status",
  "Team Activity",
  "Financial Snapshot"
];

export function App() {
  return (
    <main className="page">
      <header>
        <p className="eyebrow">Contractor Management</p>
        <h1>Field-ready operations dashboard</h1>
        <p className="subtext">
          Initial shell for time tracking, project oversight, and bilingual support.
        </p>
      </header>

      <section className="grid" aria-label="initial module cards">
        {cards.map((card) => (
          <article key={card} className="card">
            <h2>{card}</h2>
            <p>Planned in the initial spec and ready for iterative implementation.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
