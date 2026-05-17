# introduction-page

濱野哲史 / Satoshi Hamano の個人紹介ページです。

研究者としての軽い紹介、企業データサイエンティストとしての経験、GitHub上の活動、ブラウザで動く小さな実験を置くためのサイトです。

## Stack

- Vite
- React
- TypeScript
- pnpm
- GitHub Pages

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Deploy

GitHub Pages向けのGitHub Actions設定を `.github/workflows/deploy.yml` に置いています。

リポジトリ名を `introduction-page` 以外にする場合は、`vite.config.ts` の `base` を変更してください。
