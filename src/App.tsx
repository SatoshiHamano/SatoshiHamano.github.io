import { useMemo, useState } from 'react'
import './App.css'

type Lang = 'ja' | 'en'

const text = {
  ja: {
    nav: ['Home', 'Research', 'Career', 'GitHub', 'Playground'],
    toggle: 'English',
    eyebrow: 'Researcher / Data Scientist',
    name: '濱野哲史',
    roman: 'Satoshi Hamano',
    intro:
      '研究を軸に、データサイエンスとソフトウェアで問いを形にする人です。CVというより、研究ノートと実験場が混ざった軽い自己紹介ページとして育てていきます。',
    ctaGithub: 'GitHubを見る',
    ctaPlay: '遊び場へ',
    researchTitle: '研究のこと',
    researchCopy:
      '関心領域、論文、発表、プロジェクトを少しずつ整理していく場所です。まずは大きなテーマと代表的な成果を短く見せ、詳細なCVやPDFは必要になったら追加します。',
    researchItems: ['研究テーマの地図', '論文・発表のハイライト', '共同研究・プロジェクト'],
    careerTitle: 'データサイエンティストとして',
    careerCopy:
      '企業での実務は、分析・予測・意思決定支援・実装までをまとめて紹介する予定です。社名や数値を出せないものは、問題設定とアプローチ中心に書けます。',
    githubTitle: 'GitHub Activity',
    githubCopy:
      'コード、実験、メモ、データ可視化、小さなツールなどをまとめます。代表リポジトリは手で選び、活動量はGitHub APIを使うか静的表示にできます。',
    githubUser: 'SatoshiHamano',
    playgroundTitle: 'Playground',
    playgroundCopy: '小さなブラウザ実験を置く場所です。まずは点を研究クラスタに集めるミニゲームを入れています。',
    gameScore: 'Score',
    gameButton: '点を増やす',
    footer: 'Built for GitHub Pages. More notes, papers, and small games will land here.',
  },
  en: {
    nav: ['Home', 'Research', 'Career', 'GitHub', 'Playground'],
    toggle: '日本語',
    eyebrow: 'Researcher / Data Scientist',
    name: 'Satoshi Hamano',
    roman: '濱野哲史',
    intro:
      'I work around research, data science, and software. This site is meant to feel less like a formal CV and more like a light personal lab with notes, projects, and small browser experiments.',
    ctaGithub: 'Open GitHub',
    ctaPlay: 'Visit Playground',
    researchTitle: 'Research',
    researchCopy:
      'A compact home for research interests, papers, talks, and projects. The first version keeps things short, with room for a detailed CV or PDF later.',
    researchItems: ['Map of research themes', 'Paper and talk highlights', 'Collaborations and projects'],
    careerTitle: 'Industry Data Science',
    careerCopy:
      'Industry work can be summarized through problem settings, modeling choices, decision support, and implementation work, even when company names or exact metrics stay private.',
    githubTitle: 'GitHub Activity',
    githubCopy:
      'A place to feature code, experiments, notes, visualizations, and small tools. Repositories can be curated manually or connected to the GitHub API later.',
    githubUser: 'SatoshiHamano',
    playgroundTitle: 'Playground',
    playgroundCopy: 'A corner for small browser experiments. The first toy gathers data points into a research cluster.',
    gameScore: 'Score',
    gameButton: 'Add points',
    footer: 'Built for GitHub Pages. More notes, papers, and small games will land here.',
  },
}

const skills = ['Bayesian modeling', 'Causal inference', 'Python', 'R', 'TypeScript', 'Visualization']

function makePoints(seed: number) {
  return Array.from({ length: 18 }, (_, index) => {
    const angle = (index * 137.5 + seed * 19) * (Math.PI / 180)
    const radius = 28 + ((index * 17 + seed * 11) % 36)
    return {
      id: `${seed}-${index}`,
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
      size: 8 + ((index + seed) % 4) * 2,
    }
  })
}

function App() {
  const [lang, setLang] = useState<Lang>('ja')
  const [seed, setSeed] = useState(1)
  const [score, setScore] = useState(0)
  const t = text[lang]
  const points = useMemo(() => makePoints(seed), [seed])

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Home">
          SH
        </a>
        <nav aria-label="Primary navigation">
          {t.nav.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <button className="lang-toggle" type="button" onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}>
          {t.toggle}
        </button>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.name}</h1>
          <p className="roman">{t.roman}</p>
          <p className="lead">{t.intro}</p>
          <div className="hero-actions">
            <a className="button primary" href="https://github.com/SatoshiHamano">
              {t.ctaGithub}
            </a>
            <a className="button secondary" href="#playground">
              {t.ctaPlay}
            </a>
          </div>
        </div>
        <div className="lab-visual" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          {points.slice(0, 10).map((point) => (
            <span
              className="data-dot"
              key={point.id}
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                width: point.size,
                height: point.size,
              }}
            />
          ))}
          <div className="terminal-card">
            <span>research.log</span>
            <strong>questions -&gt; models -&gt; tools</strong>
          </div>
        </div>
      </section>

      <section className="section-grid" id="research">
        <div>
          <p className="section-kicker">Research CV</p>
          <h2>{t.researchTitle}</h2>
          <p>{t.researchCopy}</p>
        </div>
        <div className="card-list">
          {t.researchItems.map((item) => (
            <article className="mini-card" key={item}>
              <span />
              <h3>{item}</h3>
              <p>TODO: add selected details, links, and short notes.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="career-band" id="career">
        <div>
          <p className="section-kicker">Industry CV</p>
          <h2>{t.careerTitle}</h2>
          <p>{t.careerCopy}</p>
        </div>
        <div className="skill-cloud" aria-label="Skill keywords">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="section-grid github-section" id="github">
        <div>
          <p className="section-kicker">@{t.githubUser}</p>
          <h2>{t.githubTitle}</h2>
          <p>{t.githubCopy}</p>
        </div>
        <a className="github-card" href="https://github.com/SatoshiHamano">
          <span>github.com</span>
          <strong>SatoshiHamano</strong>
          <small>Repositories, experiments, and public activity</small>
        </a>
      </section>

      <section className="playground" id="playground">
        <div className="playground-copy">
          <p className="section-kicker">Playground</p>
          <h2>{t.playgroundTitle}</h2>
          <p>{t.playgroundCopy}</p>
        </div>
        <div className="game-panel">
          <div className="game-header">
            <span>
              {t.gameScore}: {score}
            </span>
            <button
              type="button"
              onClick={() => {
                setSeed((current) => current + 1)
                setScore((current) => current + 3)
              }}
            >
              {t.gameButton}
            </button>
          </div>
          <div className="game-field" aria-label="Data point mini game">
            <div className="cluster-target" />
            {points.map((point, index) => (
              <button
                className="game-dot"
                key={point.id}
                type="button"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  width: point.size + 10,
                  height: point.size + 10,
                }}
                aria-label={`data point ${index + 1}`}
                onClick={() => setScore((current) => current + 1)}
              />
            ))}
          </div>
        </div>
      </section>

      <footer>{t.footer}</footer>
    </main>
  )
}

export default App
