import { useMemo, useState } from 'react'
import './App.css'

type Lang = 'ja' | 'en'

const text = {
  ja: {
    nav: ['Home', 'Research', 'Career', 'Profiles', 'Playground'],
    toggle: 'English',
    eyebrow: 'Researcher / Data Scientist',
    name: '濱野哲史',
    roman: 'Satoshi Hamano',
    intro:
      '赤外線天文学を専門に、東京大学で博士号を取得しました。装置開発チームでの経験を持ち、高分散分光観測を用いた宇宙物理学研究に取り組んできました。',
    ctaGithub: 'GitHubを見る',
    ctaPlay: 'Playgroundへ',
    researchTitle: 'Academic Interests',
    researchCopy:
      '赤外線高分散分光、星間物質、装置開発に関する研究の入口です。論文や研究者IDへのリンクをここにまとめ、詳しい研究内容は少しずつ追加していきます。',
    researchItems: ['赤外線天文学', '高分散分光観測', '装置開発とデータ解析'],
    researchItemNote: '関連する研究テーマ、論文、観測データへのメモを追加していきます。',
    projectsTitle: 'Instruments / Projects',
    publicationsTitle: 'Selected publications',
    firstAuthorTitle: '主著論文',
    coauthorTitle: '共著論文',
    careerTitle: 'データサイエンティストとして',
    careerCopy:
      '企業での実務は、分析・予測・意思決定支援・実装までをまとめて紹介する予定です。社名や数値を出せないものは、問題設定とアプローチ中心に書けます。',
    profilesTitle: 'Profiles',
    profilesCopy:
      'コード、実験、職業SNSなど、研究以外の公開プロフィールをまとめる入口です。',
    contactTitle: 'Contact',
    contactCopy: 'LinkedIn or GitHub is the easiest way to reach me. Email available on request.',
    githubUser: 'SatoshiHamano',
    playgroundTitle: 'Playground',
    playgroundCopy: '小さなブラウザ実験を置く場所です。まずは点を研究クラスタに集めるミニゲームを入れています。',
    gameScore: 'Score',
    gameButton: '点を増やす',
    footer: 'Built for GitHub Pages. More notes, papers, and small games will land here.',
  },
  en: {
    nav: ['Home', 'Research', 'Career', 'Profiles', 'Playground'],
    toggle: '日本語',
    eyebrow: 'Researcher / Data Scientist',
    name: 'Satoshi Hamano',
    roman: '濱野哲史',
    intro:
      'I received my PhD from the University of Tokyo, specializing in infrared astronomy. My research has involved instrument development and astrophysics with high-resolution spectroscopic observations.',
    ctaGithub: 'Open GitHub',
    ctaPlay: 'Visit Playground',
    researchTitle: 'Academic Interests',
    researchCopy:
      'A compact entry point for work around infrared high-resolution spectroscopy, interstellar matter, and instrumentation. Research profile links live here; deeper notes can be added over time.',
    researchItems: ['Infrared astronomy', 'High-resolution spectroscopy', 'Instrumentation and data analysis'],
    researchItemNote: 'Notes on related themes, papers, and observational data will be added here.',
    projectsTitle: 'Instruments / Projects',
    publicationsTitle: 'Selected publications',
    firstAuthorTitle: 'First-author papers',
    coauthorTitle: 'Co-authored papers',
    careerTitle: 'Industry Data Science',
    careerCopy:
      'Industry work can be summarized through problem settings, modeling choices, decision support, and implementation work, even when company names or exact metrics stay private.',
    profilesTitle: 'Profiles',
    profilesCopy:
      'A compact set of doors into code, experiments, and professional networks outside the research profile pages.',
    contactTitle: 'Contact',
    contactCopy: 'LinkedIn or GitHub is the easiest way to reach me. Email available on request.',
    githubUser: 'SatoshiHamano',
    playgroundTitle: 'Playground',
    playgroundCopy: 'A corner for small browser experiments. The first toy gathers data points into a research cluster.',
    gameScore: 'Score',
    gameButton: 'Add points',
    footer: 'Built for GitHub Pages. More notes, papers, and small games will land here.',
  },
}

const skills = [
  'Infrared astronomy',
  'High-resolution spectroscopy',
  'Instrumentation',
  'Python',
  'Data science',
  'Visualization',
]

const researchLinks = [
  {
    label: 'researchmap',
    value: 'HAMANO SATOSHI',
    href: 'https://researchmap.jp/7000011229',
    note: 'Papers, projects, research keywords',
  },
  {
    label: 'ORCID',
    value: '0000-0002-6505-3395',
    href: 'https://orcid.org/0000-0002-6505-3395',
    note: 'Persistent researcher identifier',
  },
]

const projectLinks = [
  {
    label: 'WINERED',
    value: 'Warm near-infrared high-resolution spectrograph',
    href: 'https://merlot.kyoto-su.ac.jp/WINERED/ETC/',
    note: 'A near-infrared high-resolution spectrograph central to my instrumentation and observing work.',
  },
  {
    label: 'Subaru / PFS',
    value: 'Prime Focus Spectrograph',
    href: 'https://pfs.naoj.org/instrumentation.html',
    note: 'A wide-field multi-object spectrograph for the Subaru Telescope.',
  },
  {
    label: 'TMT',
    value: 'Thirty Meter Telescope',
    href: 'https://www.tmt.org/',
    note: 'An international next-generation optical-infrared extremely large telescope project.',
  },
]

const profileLinks = [
  {
    label: 'GitHub',
    value: 'SatoshiHamano',
    href: 'https://github.com/SatoshiHamano',
    note: 'Repositories, experiments, and public activity',
  },
  {
    label: 'LinkedIn',
    value: 'Satoshi Hamano',
    href: 'https://www.linkedin.com/in/satoshi-hamano-6800ba391/',
    note: 'Professional profile and career network',
  },
]

const firstAuthorPapers = [
  {
    year: '2024',
    title: 'WARP: The Data Reduction Pipeline for the WINERED Spectrograph',
    venue: 'Publications of the Astronomical Society of the Pacific',
    href: 'https://arxiv.org/abs/2401.04876',
  },
  {
    year: '2022',
    title: 'Survey of Near-infrared Diffuse Interstellar Bands in Y and J Bands. I. Newly Identified Bands',
    venue: 'The Astrophysical Journal Supplement Series',
    href: 'https://arxiv.org/abs/2206.03131',
  },
  {
    year: '2019',
    title: 'First Detection of A-X (0,0) Bands of Interstellar C2 and CN',
    venue: 'The Astrophysical Journal',
    href: 'https://doi.org/10.3847/1538-4357/ab2e0f',
  },
  {
    year: '2016',
    title: 'Near Infrared Diffuse Interstellar Bands Toward the Cygnus OB2 Association',
    venue: 'The Astrophysical Journal',
    href: 'https://doi.org/10.3847/0004-637X/821/1/42',
  },
  {
    year: '2015',
    title: 'Near-infrared diffuse interstellar bands in 0.91-1.32 μm',
    venue: 'The Astrophysical Journal',
    href: 'https://doi.org/10.1088/0004-637X/800/2/137',
  },
]

const coauthorPapers = [
  {
    year: '2025',
    title: 'MAGIS (Measuring Abundances of red super Giants with Infrared Spectroscopy) project',
    venue: 'Astronomy & Astrophysics',
  },
  {
    year: '2024',
    title: '[N i] 10400/10410 Å Lines as Possible Disk Wind Tracers in a Young Intermediate-mass Star',
    venue: 'The Astrophysical Journal',
  },
  {
    year: '2024',
    title: 'Shock Excitation in Narrow-line Regions Powered by AGN Outflows',
    venue: 'The Astrophysical Journal',
  },
  {
    year: '2023',
    title: 'Metallicities of Classical Cepheids in the Inner Galactic Disk',
    venue: 'The Astrophysical Journal',
  },
  {
    year: '2022',
    title: 'Highly Sensitive, Non-cryogenic NIR High-resolution Spectrograph, WINERED',
    venue: 'Publications of the Astronomical Society of the Pacific',
  },
  {
    year: '2021',
    title: 'Effective temperatures of red supergiants estimated from line-depth ratios in the YJ bands',
    venue: 'Monthly Notices of the Royal Astronomical Society',
  },
]

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
              <p>{t.researchItemNote}</p>
            </article>
          ))}
          <div className="project-block">
            <p className="section-kicker">{t.projectsTitle}</p>
            <div className="project-grid">
              {projectLinks.map((project) => (
                <a className="project-card" href={project.href} key={project.label}>
                  <span>{project.label}</span>
                  <strong>{project.value}</strong>
                  <small>{project.note}</small>
                </a>
              ))}
            </div>
          </div>
          <div className="research-link-grid">
            {researchLinks.map((link) => (
              <a className="research-link-card" href={link.href} key={link.label}>
                <span>{link.label}</span>
                <strong>{link.value}</strong>
                <small>{link.note}</small>
              </a>
            ))}
          </div>
          <div className="publication-block">
            <p className="section-kicker">{t.publicationsTitle}</p>
            <div className="publication-columns">
              <section className="publication-list" aria-labelledby="first-author-papers">
                <h3 id="first-author-papers">{t.firstAuthorTitle}</h3>
                {firstAuthorPapers.map((paper) => (
                  <a className="paper-row" href={paper.href} key={paper.title}>
                    <span>{paper.year}</span>
                    <strong>{paper.title}</strong>
                    <small>{paper.venue}</small>
                  </a>
                ))}
              </section>
              <section className="publication-list" aria-labelledby="coauthor-papers">
                <h3 id="coauthor-papers">{t.coauthorTitle}</h3>
                {coauthorPapers.map((paper) => (
                  <article className="paper-row" key={paper.title}>
                    <span>{paper.year}</span>
                    <strong>{paper.title}</strong>
                    <small>{paper.venue}</small>
                  </article>
                ))}
              </section>
            </div>
          </div>
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

      <section className="section-grid profiles-section" id="profiles">
        <div>
          <p className="section-kicker">@{t.githubUser}</p>
          <h2>{t.profilesTitle}</h2>
          <p>{t.profilesCopy}</p>
        </div>
        <div className="profile-grid">
          {profileLinks.map((link) =>
            link.href ? (
              <a className="profile-card" href={link.href} key={link.label}>
                <span>{link.label}</span>
                <strong>{link.value}</strong>
                <small>{link.note}</small>
              </a>
            ) : (
              <article className="profile-card profile-card-pending" key={link.label}>
                <span>{link.label}</span>
                <strong>{link.value}</strong>
                <small>{link.note}</small>
              </article>
            ),
          )}
        </div>
        <div className="contact-note">
          <span>{t.contactTitle}</span>
          <p>{t.contactCopy}</p>
        </div>
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
