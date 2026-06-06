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
      '研究、データサイエンス、コード、読んだものや小さな実験を置いていく個人ページです。',
    ctaGithub: 'GitHubを見る',
    ctaPlay: 'Playgroundへ',
    researchTitle: 'Academic Interests',
    researchCopy:
      '赤外線高分散分光、星間物質、装置開発に関する研究の入口です。論文や研究者IDへのリンクをここにまとめ、詳しい研究内容は少しずつ追加していきます。',
    researchItems: [
      {
        title: '赤外線天文学',
        description:
          '星間物質や星形成領域を、可視光では届きにくい波長から調べてきました。特に近赤外線で見える吸収線・分子バンドに関心があります。',
      },
      {
        title: '高分散分光観測',
        description:
          'WINEREDなどを用いた高分散分光データから、拡散星間バンドや原子・分子吸収線を測定し、天体環境の物理・化学状態を探っています。',
      },
      {
        title: '装置開発とデータ解析',
        description:
          '観測装置、パイプライン、解析ツールをつなぎ、取得したスペクトルを科学に使える形へ整えるところまで関わってきました。',
      },
    ],
    projectsTitle: 'Instruments / Projects',
    publicationsTitle: 'Selected publications',
    firstAuthorTitle: '主著論文',
    coauthorTitle: '共著論文',
    careerTitle: 'Industry Career',
    careerCopy:
      'Senior Data Scientistとして、出版業界の物流に関わる需要予測、数理最適化、サプライチェーンマネジメント理論の実装に取り組んでいます。レコメンドや分析に閉じず、フィジカルな物流を支える数値設計と意思決定支援に関わっています。',
    helpTitle: 'Can help with',
    helpCopy:
      '需要予測、数理最適化、データ分析、分析ワークフローの自動化、研究者向けのデータ解析支援や技術相談などに対応できます。',
    profilesTitle: 'Profiles',
    profilesCopy:
      'コード、実験、職業SNSなど、研究以外の公開プロフィールをまとめる入口です。',
    contactTitle: 'Contact',
    contactCopy:
      'データ分析、需要予測、数理最適化、研究データ解析支援などの相談はLinkedInまたはGitHubからご連絡ください。Email available on request.',
    githubUser: 'SatoshiHamano',
    playgroundTitle: 'Playground',
    playgroundCopy:
      'ブラウザで動く小さな実験やメモ置き場です。ゲームを無理に置くより、分析・最適化・読書記録など、このページとつながるものを少しずつ足していきます。',
    playgroundStatus: 'planned',
    footer: 'Built for GitHub Pages. More notes, papers, and browser experiments will land here.',
  },
  en: {
    nav: ['Home', 'Research', 'Career', 'Profiles', 'Playground'],
    toggle: '日本語',
    eyebrow: 'Researcher / Data Scientist',
    name: 'Satoshi Hamano',
    roman: '濱野哲史',
    intro:
      'A personal page for research, data science, code, notes, and small browser experiments.',
    ctaGithub: 'Open GitHub',
    ctaPlay: 'Visit Playground',
    researchTitle: 'Academic Interests',
    researchCopy:
      'A compact entry point for work around infrared high-resolution spectroscopy, interstellar matter, and instrumentation. Research profile links live here; deeper notes can be added over time.',
    researchItems: [
      {
        title: 'Infrared astronomy',
        description:
          'I have studied interstellar matter and star-forming environments at wavelengths that can reveal structures hidden from optical observations.',
      },
      {
        title: 'High-resolution spectroscopy',
        description:
          'Using instruments such as WINERED, I have measured diffuse interstellar bands and atomic/molecular absorption features in near-infrared spectra.',
      },
      {
        title: 'Instrumentation and data analysis',
        description:
          'My work connects instrument development, reduction pipelines, and analysis tools to turn raw spectra into science-ready data.',
      },
    ],
    projectsTitle: 'Instruments / Projects',
    publicationsTitle: 'Selected publications',
    firstAuthorTitle: 'First-author papers',
    coauthorTitle: 'Co-authored papers',
    careerTitle: 'Industry Data Science',
    careerCopy:
      'As a Senior Data Scientist, I work on demand forecasting, mathematical optimization, and applied supply-chain management for physical logistics in the publishing industry. The work goes beyond recommendation or analysis, supporting numerical decision-making that affects inventory flow, distribution, and operational execution.',
    helpTitle: 'Can help with',
    helpCopy:
      'Forecasting, optimization, data analysis, workflow automation, and technical support for academic researchers working with data.',
    profilesTitle: 'Profiles',
    profilesCopy:
      'A compact set of doors into code, experiments, and professional networks outside the research profile pages.',
    contactTitle: 'Contact',
    contactCopy:
      'For data analysis, forecasting, optimization, or academic research-data support, please reach me via LinkedIn or GitHub. Email available on request.',
    githubUser: 'SatoshiHamano',
    playgroundTitle: 'Playground',
    playgroundCopy:
      'A place for small browser experiments and notes. This section will collect demos connected to analysis, optimization, reading logs, and research tools.',
    playgroundStatus: 'planned',
    footer: 'Built for GitHub Pages. More notes, papers, and browser experiments will land here.',
  },
}

const skills = [
  'Demand forecasting',
  'Mathematical optimization',
  'Supply chain management',
  'Decision support',
  'Python',
  'Operations',
]

const helpAreas = [
  {
    label: 'Forecasting',
    description: 'Demand, sales, inventory, or operational time-series forecasting.',
  },
  {
    label: 'Optimization',
    description: 'Mathematical optimization for allocation, logistics, scheduling, and inventory decisions.',
  },
  {
    label: 'Data workflow',
    description: 'Python analysis pipelines, reproducible reports, dashboards, and automation.',
  },
  {
    label: 'Academic support',
    description: 'Data analysis, visualization, and technical consultation for research projects.',
  },
]

const playgroundItems = [
  {
    title: 'Forecasting sketch',
    description: 'A small visual demo for demand curves, seasonality, uncertainty, and inventory decisions.',
  },
  {
    title: 'Optimization sandbox',
    description: 'A toy allocation problem for seeing how constraints change logistics or scheduling decisions.',
  },
  {
    title: 'Shelf log',
    description: 'A lightweight place for books, films, notes, and links to longer writeups.',
  },
  {
    title: 'Spectral tools',
    description: 'Tiny utilities or visual notes around spectra, absorption lines, and research data.',
  },
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
    label: 'WARP',
    value: 'WINERED Automatic Reduction Pipeline',
    href: 'https://github.com/SatoshiHamano/WARP',
    note: 'A Python pipeline for reducing spectroscopic data obtained with WINERED.',
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
  const t = text[lang]
  const points = useMemo(() => makePoints(1), [])

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
            <article className="mini-card" key={item.title}>
              <span />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
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
          <details className="publication-block">
            <summary>
              <span className="section-kicker">{t.publicationsTitle}</span>
            </summary>
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
          </details>
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
        <div className="help-panel">
          <p className="section-kicker">{t.helpTitle}</p>
          <p>{t.helpCopy}</p>
          <div className="help-grid">
            {helpAreas.map((area) => (
              <article className="help-card" key={area.label}>
                <h3>{area.label}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
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
        <div className="experiment-grid">
          {playgroundItems.map((item) => (
            <article className="experiment-card" key={item.title}>
              <span>{t.playgroundStatus}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>{t.footer}</footer>
    </main>
  )
}

export default App
