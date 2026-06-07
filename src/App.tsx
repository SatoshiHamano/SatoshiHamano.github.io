import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { prefecturePopulation, type PrefecturePopulation } from './populationData'

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
    populationLabTitle: 'Population Lab',
    populationLabCopy:
      '令和7年国勢調査の人口速報集計を使い、2025年人口、2020年からの変化率、2015年からの減少加速を都道府県ごとに並べた小さな可視化です。',
    populationDashboardCta: '詳細ダッシュボードへ',
    populationDashboardTitle: 'Population Dashboard',
    populationDashboardCopy:
      '速報値を都道府県単位で比較するための詳細ビューです。人口規模、直近5年の変化率、前回からの変化率差を同じ表で眺め、どこで減少・鈍化が強いかを確認します。',
    dashboardBack: '概要へ戻る',
    dashboardKpis: [
      { label: '全国人口', value: '12,305万人', note: '2025年速報値' },
      { label: '2020-2025', value: '-2.5%', note: '全国の5年間人口増減率' },
      { label: '変化率差', value: '-1.7pt', note: '2015-2020からの変化率差' },
      { label: '人口増加', value: '2都県', note: '東京都・沖縄県' },
    ],
    dashboardColumns: ['都道府県', '2025人口', '2020-2025', '変化率差', '読み'],
    municipalityTitle: '市区町村ビュー',
    municipalityCopy:
      '都道府県を選ぶと、速報値で得られる市区町村・行政区単位の人口、男女別人口、世帯、人口密度、増減率を確認できます。',
    municipalityColumns: ['自治体', 'タイプ', '2025人口', '男性', '女性', '世帯', '人口密度', '増減率'],
    municipalityTypeTitle: '自治体タイプ横断',
    municipalityTypeCopy:
      '人口規模・人口密度・区分に基づく暫定分類です。都市構造そのものの分類ではなく、速報値だけで作る探索用のheuristicです。',
    municipalityTypes: {
      core: '中核的自治体',
      urban: '準都市型',
      suburban: '郊外・地域拠点型',
      small: '小規模自治体',
    },
    dashboardReadPositiveSlowdown: '増加鈍化',
    dashboardReadTurnedDecline: '減少転換',
    dashboardReadDeclineWidened: '減少拡大',
    dashboardReadStable: '変化小',
    populationLabSource:
      '出典: 令和7年国勢調査 人口速報集計結果（総務省統計局）。本ページの可視化・指標化は公開統計を用いた独自分析であり、公式見解ではありません。',
    populationViews: ['2025 population', '2020-2025 change', 'acceleration'],
    selectedPrefecture: '選択中',
    population2015: '2015人口',
    population2020: '2020人口',
    population2025: '2025人口',
    previousChange: '2015-2020',
    currentChange: '2020-2025',
    changeDifference: '変化率差',
    insightTitle: 'Quick read',
    insights: [
      '人口規模は東京圏・大阪圏・愛知に集中している一方、2020-2025の人口増加は東京都と沖縄県のみです。',
      '2015-2020に増加していた埼玉、千葉、神奈川、愛知、滋賀、福岡も2020-2025では減少へ転じています。',
      '前回からの変化率差を見ると、島根、静岡、広島、東京、岡山、青森などで減少または増加鈍化が目立ちます。',
    ],
    sourceLink: '統計局の結果ページ',
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
    populationLabTitle: 'Population Lab',
    populationLabCopy:
      'A compact visualization using the preliminary 2025 Population Census release: 2025 population, 2020-2025 change rate, and change-rate acceleration by prefecture.',
    populationDashboardCta: 'Open dashboard',
    populationDashboardTitle: 'Population Dashboard',
    populationDashboardCopy:
      'A more detailed prefecture-level dashboard for comparing population size, the latest five-year change rate, and the change-rate difference from the previous period.',
    dashboardBack: 'Back to overview',
    dashboardKpis: [
      { label: 'Japan population', value: '123.05M', note: 'Preliminary 2025 count' },
      { label: '2020-2025', value: '-2.5%', note: 'National five-year change rate' },
      { label: 'Change-rate diff.', value: '-1.7pt', note: 'Difference from 2015-2020' },
      { label: 'Growing areas', value: '2', note: 'Tokyo and Okinawa' },
    ],
    dashboardColumns: ['Prefecture', '2025 pop.', '2020-2025', 'Diff.', 'Read'],
    municipalityTitle: 'Municipality view',
    municipalityCopy:
      'Select a prefecture to inspect municipality- and ward-level population, sex breakdown, households, density, and five-year change rate available in the preliminary release.',
    municipalityColumns: ['Area', 'Type', '2025 pop.', 'Male', 'Female', 'Households', 'Density', 'Change'],
    municipalityTypeTitle: 'Municipality classes',
    municipalityTypeCopy:
      'A provisional heuristic based on population size, density, and administrative type. It is a starting point for exploration, not a formal urban classification.',
    municipalityTypes: {
      core: 'Core',
      urban: 'Urban',
      suburban: 'Suburban/regional',
      small: 'Small',
    },
    dashboardReadPositiveSlowdown: 'slower growth',
    dashboardReadTurnedDecline: 'turned decline',
    dashboardReadDeclineWidened: 'wider decline',
    dashboardReadStable: 'limited change',
    populationLabSource:
      'Source: 2025 Population Census preliminary results, Statistics Bureau of Japan. Visualizations and derived indicators on this page are independent analysis, not an official view.',
    populationViews: ['2025 population', '2020-2025 change', 'acceleration'],
    selectedPrefecture: 'Selected',
    population2015: '2015 population',
    population2020: '2020 population',
    population2025: '2025 population',
    previousChange: '2015-2020',
    currentChange: '2020-2025',
    changeDifference: 'Change-rate diff.',
    insightTitle: 'Quick read',
    insights: [
      'Population remains concentrated around Tokyo, Osaka, and Aichi, while only Tokyo and Okinawa grew from 2020 to 2025.',
      'Saitama, Chiba, Kanagawa, Aichi, Shiga, and Fukuoka shifted from growth in 2015-2020 to decline in 2020-2025.',
      'The acceleration view highlights stronger slowdown or decline in Shimane, Shizuoka, Hiroshima, Tokyo, Okayama, and Aomori.',
    ],
    sourceLink: 'Statistics Bureau results',
    footer: 'Built for GitHub Pages. More notes, papers, and browser experiments will land here.',
  },
}

type PopulationMetric = 'population' | 'change' | 'acceleration'
type MunicipalityKind = 'ward' | 'major_city' | 'city' | 'town_village'

type MunicipalityRecord = {
  kind: MunicipalityKind
  prefectureCode: string
  prefecture: string
  code: string
  name: string
  population2025: number
  male2025: number
  female2025: number
  population2020: number
  populationChange: number
  populationChangeRate: number
  sexRatio: number
  areaKm2: number
  populationDensity: number
  households2025: number
  households2020: number
  householdChange: number
  householdChangeRate: number
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
    title: 'Population Lab',
    description: 'A first data-science portfolio piece using preliminary 2025 Population Census data.',
    href: '#population-lab',
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

const populationMetrics: PopulationMetric[] = ['population', 'change', 'acceleration']

const populationMetricLabels: Record<Lang, Record<PopulationMetric, string>> = {
  ja: {
    population: '2025人口',
    change: '2020-2025変化率',
    acceleration: '変化率差',
  },
  en: {
    population: '2025 population',
    change: '2020-2025 change',
    acceleration: 'Acceleration',
  },
}

const populationMetricUnits: Record<PopulationMetric, string> = {
  population: '万人',
  change: '%',
  acceleration: 'pt',
}

const nationalPopulation = {
  population2025: 123049524,
  changeRate2020To2025: -2.5,
  accelerationPoint: -1.7,
}

function formatPopulation(value: number) {
  return `${(value / 10000).toLocaleString('ja-JP', { maximumFractionDigits: 0 })}万人`
}

function formatMetricValue(prefecture: PrefecturePopulation, metric: PopulationMetric) {
  if (metric === 'population') {
    return formatPopulation(prefecture.population2025)
  }

  const value = metric === 'change' ? prefecture.changeRate2020To2025 : prefecture.accelerationPoint
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}${populationMetricUnits[metric]}`
}

function getMetricValue(prefecture: PrefecturePopulation, metric: PopulationMetric) {
  if (metric === 'population') {
    return prefecture.population2025 / 10000
  }

  return metric === 'change' ? prefecture.changeRate2020To2025 : prefecture.accelerationPoint
}

function getHeatColor(prefecture: PrefecturePopulation, metric: PopulationMetric) {
  const value = getMetricValue(prefecture, metric)

  if (metric === 'population') {
    const intensity = Math.min(1, Math.log10(value) / Math.log10(1500))
    return {
      backgroundColor: `hsl(190 42% ${88 - intensity * 48}%)`,
      color: intensity > 0.62 ? '#fff' : '#17202d',
    }
  }

  if (metric === 'change') {
    const intensity = Math.min(Math.abs(value) / 8.2, 1)

    if (value >= 0) {
      return {
        backgroundColor: `hsl(162 42% ${82 - Math.min(value / 1.6, 1) * 42}%)`,
        color: value > 0.9 ? '#fff' : '#17202d',
      }
    }

    return {
      backgroundColor: `hsl(8 58% ${88 - intensity * 46}%)`,
      color: intensity > 0.55 ? '#fff' : '#17202d',
    }
  }

  const intensity = Math.min(Math.abs(value) / 3, 1)

  return {
    backgroundColor:
      value >= 0 ? `hsl(162 42% ${84 - intensity * 42}%)` : `hsl(351 50% ${88 - intensity * 44}%)`,
    color: intensity > 0.58 ? '#fff' : '#17202d',
  }
}

function formatSigned(value: number, unit: string) {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}${unit}`
}

function formatNationalValue(metric: PopulationMetric) {
  if (metric === 'population') {
    return formatPopulation(nationalPopulation.population2025)
  }

  const value =
    metric === 'change' ? nationalPopulation.changeRate2020To2025 : nationalPopulation.accelerationPoint

  return formatSigned(value, populationMetricUnits[metric])
}

function getTrendNote(prefecture: PrefecturePopulation, lang: Lang) {
  const previous = prefecture.changeRate2015To2020
  const current = prefecture.changeRate2020To2025
  const acceleration = prefecture.accelerationPoint

  if (current > 0 && acceleration < 0) {
    return lang === 'ja'
      ? '人口はまだ増加していますが、前回より増加率は低下しています。'
      : 'Population is still growing, but the growth rate has slowed from the previous period.'
  }

  if (previous >= 0 && current < 0) {
    return lang === 'ja'
      ? '前回は横ばいまたは増加でしたが、今回は減少へ転じています。'
      : 'The prefecture shifted from flat or positive growth to decline.'
  }

  if (current < 0 && acceleration < 0) {
    return lang === 'ja'
      ? '人口は減少しており、前回より減少幅が広がっています。'
      : 'Population is declining, and the decline is larger than in the previous period.'
  }

  return lang === 'ja'
    ? '前回からの変化率差は比較的小さく、傾向変化は限定的です。'
    : 'The change-rate difference is relatively small.'
}

function getTrendLabel(prefecture: PrefecturePopulation, lang: Lang) {
  const t = text[lang]

  if (prefecture.changeRate2020To2025 > 0 && prefecture.accelerationPoint < 0) {
    return t.dashboardReadPositiveSlowdown
  }

  if (prefecture.changeRate2015To2020 >= 0 && prefecture.changeRate2020To2025 < 0) {
    return t.dashboardReadTurnedDecline
  }

  if (prefecture.changeRate2020To2025 < 0 && prefecture.accelerationPoint < 0) {
    return t.dashboardReadDeclineWidened
  }

  return t.dashboardReadStable
}

type MunicipalityClass = 'core' | 'urban' | 'suburban' | 'small'

function formatNumber(value: number) {
  return value.toLocaleString('ja-JP')
}

function formatDensity(value: number) {
  return `${value.toLocaleString('ja-JP', { maximumFractionDigits: 1 })}/km2`
}

function formatSignedNumber(value: number) {
  return `${value > 0 ? '+' : ''}${value.toLocaleString('ja-JP')}`
}

function DeltaText({
  count,
  rate,
  unit,
}: {
  count: number
  rate: number
  unit: string
}) {
  const tone = count > 0 ? 'positive' : count < 0 ? 'negative' : 'neutral'

  return (
    <small className={`table-delta table-delta-${tone}`}>
      {formatSignedNumber(count)}
      {unit} / {formatSigned(rate, '%')}
    </small>
  )
}

function classifyMunicipality(area: MunicipalityRecord): MunicipalityClass {
  if (area.kind === 'major_city' || area.population2025 >= 500000) {
    return 'core'
  }

  if (area.population2025 >= 150000 || area.populationDensity >= 2500) {
    return 'urban'
  }

  if (area.population2025 >= 50000 || area.populationDensity >= 600) {
    return 'suburban'
  }

  return 'small'
}

function getMunicipalityKindLabel(area: MunicipalityRecord, lang: Lang) {
  if (lang === 'en') {
    return {
      ward: 'ward',
      major_city: 'major city',
      city: 'city',
      town_village: 'town/village',
    }[area.kind]
  }

  return {
    ward: '行政区',
    major_city: '政令市等',
    city: '市',
    town_village: '町村',
  }[area.kind]
}

function getAnalysisBaseMunicipalities(municipalities: MunicipalityRecord[]) {
  return municipalities.filter((area) => area.kind !== 'ward')
}

function PopulationHeatmap({
  metric,
  lang,
}: {
  metric: PopulationMetric
  lang: Lang
}) {
  const [selectedName, setSelectedName] = useState('東京都')
  const label = populationMetricLabels[lang][metric]
  const selectedPrefecture =
    prefecturePopulation.find((prefecture) => prefecture.name === selectedName) ?? prefecturePopulation[12]
  const topPrefectures = [...prefecturePopulation]
    .sort((a, b) => Math.abs(getMetricValue(b, metric)) - Math.abs(getMetricValue(a, metric)))
    .slice(0, 5)

  return (
    <article className="heatmap-card">
      <div className="heatmap-heading">
        <div>
          <h3>{label}</h3>
          <span>
            {lang === 'ja' ? '全国' : 'Japan'} {formatNationalValue(metric)}
          </span>
        </div>
      </div>
      <div className="prefecture-map" aria-label={label}>
        {prefecturePopulation.map((prefecture) => (
          <button
            className="prefecture-tile"
            key={prefecture.name}
            type="button"
            aria-label={`${prefecture.name}: ${formatMetricValue(prefecture, metric)}`}
            aria-pressed={selectedPrefecture.name === prefecture.name}
            onClick={() => setSelectedName(prefecture.name)}
            onFocus={() => setSelectedName(prefecture.name)}
            onMouseEnter={() => setSelectedName(prefecture.name)}
            style={{
              ...getHeatColor(prefecture, metric),
              gridColumn: prefecture.x + 8,
              gridRow: prefecture.y + 1,
            }}
            title={`${prefecture.name}: ${formatMetricValue(prefecture, metric)}`}
          />
        ))}
      </div>
      <div className="prefecture-detail">
        <span>{lang === 'ja' ? text.ja.selectedPrefecture : text.en.selectedPrefecture}</span>
        <strong>
          {selectedPrefecture.name}
          <small>{formatMetricValue(selectedPrefecture, metric)}</small>
        </strong>
        <dl>
          <div>
            <dt>{lang === 'ja' ? text.ja.population2015 : text.en.population2015}</dt>
            <dd>{formatPopulation(selectedPrefecture.population2015)}</dd>
          </div>
          <div>
            <dt>{lang === 'ja' ? text.ja.population2020 : text.en.population2020}</dt>
            <dd>{formatPopulation(selectedPrefecture.population2020)}</dd>
          </div>
          <div>
            <dt>{lang === 'ja' ? text.ja.population2025 : text.en.population2025}</dt>
            <dd>{formatPopulation(selectedPrefecture.population2025)}</dd>
          </div>
          <div>
            <dt>{lang === 'ja' ? text.ja.previousChange : text.en.previousChange}</dt>
            <dd>{formatSigned(selectedPrefecture.changeRate2015To2020, '%')}</dd>
          </div>
          <div>
            <dt>{lang === 'ja' ? text.ja.currentChange : text.en.currentChange}</dt>
            <dd>{formatSigned(selectedPrefecture.changeRate2020To2025, '%')}</dd>
          </div>
          <div>
            <dt>{lang === 'ja' ? text.ja.changeDifference : text.en.changeDifference}</dt>
            <dd>{formatSigned(selectedPrefecture.accelerationPoint, 'pt')}</dd>
          </div>
        </dl>
        <p>{getTrendNote(selectedPrefecture, lang)}</p>
      </div>
      <div className="heatmap-ranking">
        {topPrefectures.map((prefecture) => (
          <span key={prefecture.name}>
            <strong>{prefecture.name}</strong>
            {formatMetricValue(prefecture, metric)}
          </span>
        ))}
      </div>
    </article>
  )
}

function PopulationDashboard({ lang }: { lang: Lang }) {
  const [selectedPrefectureCode, setSelectedPrefectureCode] = useState('13')
  const [municipalities, setMunicipalities] = useState<MunicipalityRecord[]>([])
  const t = text[lang]

  useEffect(() => {
    let active = true

    fetch(`${import.meta.env.BASE_URL}census2025-municipalities.json`)
      .then((response) => response.json() as Promise<MunicipalityRecord[]>)
      .then((data) => {
        if (active) {
          setMunicipalities(data)
        }
      })
      .catch(() => {
        if (active) {
          setMunicipalities([])
        }
      })

    return () => {
      active = false
    }
  }, [])

  const rankedPrefectures = [...prefecturePopulation].sort(
    (a, b) => a.changeRate2020To2025 - b.changeRate2020To2025,
  )
  const slowdownLeaders = [...prefecturePopulation]
    .sort((a, b) => a.accelerationPoint - b.accelerationPoint)
    .slice(0, 6)
  const selectedPrefecture = prefecturePopulation.find((prefecture) =>
    municipalities.some(
      (area) => area.prefecture === prefecture.name && area.prefectureCode === selectedPrefectureCode,
    ),
  )
  const selectedMunicipalities = municipalities
    .filter((area) => area.prefectureCode === selectedPrefectureCode)
    .sort((a, b) => b.population2025 - a.population2025)
  const analysisBaseMunicipalities = getAnalysisBaseMunicipalities(municipalities)
  const municipalityClasses: MunicipalityClass[] = ['core', 'urban', 'suburban', 'small']
  const prefectureOptions = [...new Map(municipalities.map((area) => [area.prefectureCode, area.prefecture])).entries()]

  return (
    <section className="population-dashboard" id="population-dashboard">
      <div className="dashboard-hero">
        <div>
          <p className="section-kicker">Population Dashboard</p>
          <h2>{t.populationDashboardTitle}</h2>
          <p>{t.populationDashboardCopy}</p>
        </div>
        <a className="button secondary" href="#population-lab">
          {t.dashboardBack}
        </a>
      </div>

      <div className="dashboard-kpis">
        {t.dashboardKpis.map((kpi) => (
          <article className="dashboard-kpi" key={kpi.label}>
            <span>{kpi.label}</span>
            <strong>{kpi.value}</strong>
            <small>{kpi.note}</small>
          </article>
        ))}
      </div>

      <div className="dashboard-panels">
        <article className="dashboard-panel municipality-panel">
          <div className="panel-heading-row">
            <div>
              <h3>{t.municipalityTitle}</h3>
              <p>{t.municipalityCopy}</p>
            </div>
            <label className="prefecture-select">
              <span>{lang === 'ja' ? '都道府県' : 'Prefecture'}</span>
              <select
                value={selectedPrefectureCode}
                disabled={prefectureOptions.length === 0}
                onChange={(event) => setSelectedPrefectureCode(event.target.value)}
              >
                {prefectureOptions.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {selectedMunicipalities.length > 0 ? (
            <>
              <div className="municipality-summary">
                <strong>{selectedPrefecture?.name ?? selectedMunicipalities[0]?.prefecture}</strong>
                <span>
                  {selectedMunicipalities.length}
                  {lang === 'ja' ? '件' : ' areas'}
                </span>
              </div>

              <div className="dashboard-table-wrap">
                <table className="dashboard-table municipality-table">
                  <thead>
                    <tr>
                      {t.municipalityColumns.map((column) => (
                        <th key={column}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMunicipalities.map((area) => (
                      <tr key={area.code}>
                        <th scope="row">{area.name}</th>
                        <td>{getMunicipalityKindLabel(area, lang)}</td>
                        <td>
                          <span className="table-value">{formatPopulation(area.population2025)}</span>
                          <DeltaText
                            count={area.populationChange}
                            rate={area.populationChangeRate}
                            unit={lang === 'ja' ? '人' : ' people'}
                          />
                        </td>
                        <td>{formatNumber(area.male2025)}</td>
                        <td>{formatNumber(area.female2025)}</td>
                        <td>
                          <span className="table-value">{formatNumber(area.households2025)}</span>
                          <DeltaText
                            count={area.householdChange}
                            rate={area.householdChangeRate}
                            unit={lang === 'ja' ? '世帯' : ' households'}
                          />
                        </td>
                        <td>{formatDensity(area.populationDensity)}</td>
                        <td>{formatSigned(area.populationChangeRate, '%')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="municipality-summary">
              <strong>{lang === 'ja' ? '読み込み中' : 'Loading'}</strong>
            </div>
          )}
        </article>

        <article className="dashboard-panel municipality-class-panel">
          <h3>{t.municipalityTypeTitle}</h3>
          <p>{t.municipalityTypeCopy}</p>
          <div className="municipality-class-grid">
            {municipalityClasses.map((municipalityClass) => {
              const areas = analysisBaseMunicipalities.filter(
                (area) => classifyMunicipality(area) === municipalityClass,
              )
              const growing = [...areas].sort((a, b) => b.populationChangeRate - a.populationChangeRate).slice(0, 3)
              const declining = [...areas].sort((a, b) => a.populationChangeRate - b.populationChangeRate).slice(0, 3)

              return (
                <article className="municipality-class-card" key={municipalityClass}>
                  <span>{t.municipalityTypes[municipalityClass]}</span>
                  <strong>
                    {areas.length}
                    {lang === 'ja' ? '自治体' : ' areas'}
                  </strong>
                  <div>
                    <small>{lang === 'ja' ? '伸びている' : 'Growing'}</small>
                    {growing.map((area) => (
                      <p key={area.code}>
                        {area.prefecture} {area.name}
                        <b>{formatSigned(area.populationChangeRate, '%')}</b>
                      </p>
                    ))}
                  </div>
                  <div>
                    <small>{lang === 'ja' ? '落ちている' : 'Declining'}</small>
                    {declining.map((area) => (
                      <p key={area.code}>
                        {area.prefecture} {area.name}
                        <b>{formatSigned(area.populationChangeRate, '%')}</b>
                      </p>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </article>

        <article className="dashboard-panel">
          <h3>{lang === 'ja' ? '鈍化・減少の強い地域' : 'Largest slowdowns'}</h3>
          <div className="slowdown-list">
            {slowdownLeaders.map((prefecture) => (
              <span key={prefecture.name}>
                <strong>{prefecture.name}</strong>
                {formatSigned(prefecture.accelerationPoint, 'pt')}
              </span>
            ))}
          </div>
        </article>

        <article className="dashboard-panel dashboard-table-panel">
          <h3>{lang === 'ja' ? '都道府県一覧' : 'Prefecture table'}</h3>
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  {t.dashboardColumns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rankedPrefectures.map((prefecture) => (
                  <tr key={prefecture.name}>
                    <th scope="row">{prefecture.name}</th>
                    <td>{formatPopulation(prefecture.population2025)}</td>
                    <td>{formatSigned(prefecture.changeRate2020To2025, '%')}</td>
                    <td>{formatSigned(prefecture.accelerationPoint, 'pt')}</td>
                    <td>{getTrendLabel(prefecture, lang)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  )
}

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
            <a className="experiment-card" href={item.href ?? '#playground'} key={item.title}>
              <span>{t.playgroundStatus}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="population-lab" id="population-lab">
        <div className="population-lab-copy">
          <p className="section-kicker">Data Science Portfolio</p>
          <h2>{t.populationLabTitle}</h2>
          <p>{t.populationLabCopy}</p>
          <a className="button primary" href="#population-dashboard">
            {t.populationDashboardCta}
          </a>
          <div className="insight-panel">
            <span>{t.insightTitle}</span>
            {t.insights.map((insight) => (
              <p key={insight}>{insight}</p>
            ))}
          </div>
        </div>
        <div className="heatmap-grid">
          {populationMetrics.map((metric) => (
            <PopulationHeatmap key={metric} lang={lang} metric={metric} />
          ))}
        </div>
        <p className="source-note">
          {t.populationLabSource}{' '}
          <a href="https://www.stat.go.jp/data/kokusei/2025/kekka.html">{t.sourceLink}</a>
        </p>
      </section>

      <PopulationDashboard lang={lang} />

      <a
        className="floating-top-link"
        href="#home"
        aria-label={lang === 'ja' ? 'トップへ戻る' : 'Back to top'}
        onClick={(event) => {
          event.preventDefault()
          window.history.pushState(null, '', '#home')
          document.querySelector('#home')?.scrollIntoView({ block: 'start' })
        }}
      >
        Top
      </a>

      <footer>{t.footer}</footer>
    </main>
  )
}

export default App
