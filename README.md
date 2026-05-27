# Tagr / Cloud Dragon — NFC × ID

**かざすだけで、人と人がつながる。**
NFC × 人脈ネットワーク × いくつもの顔。

Tagr2 NFC×IDピッチデックと Cloud Dragon チームMtg ノートから生まれた、新しいID体験のプロトタイプ Webアプリです。

## 体験できるページ

| Route | 内容 |
|---|---|
| `/` | ランディング — Hero / Problem / Solution / Multi-Face / Trust / Roadmap |
| `/app` | ダッシュボード — 最近のタップ、イベント、レコメンド |
| `/app/tap` | **NFCタップ・シミュレーター**（顔切替＋3ステップフロー） |
| `/app/feed` | アクティビティフィード |
| `/app/me` | あなたの「いくつもの顔」管理 |
| `/app/people/[id]` | 人物プロフィール（360°評価：ポジ＋ネガ） |
| `/network` | 人脈ネットワークグラフ（SVG）+ AIレコメンド |
| `/identity` | マルチコンテキストID エクスプローラ |
| `/trust` | 360° Trust リーダーボード + 倫理原則 |
| `/business-plan` | **投資家向け事業計画書** |

## コアコンセプト

- **Tap to Connect** — NFCをかざすだけで連絡先・自己紹介・記録が一瞬で完結
- **いくつもの顔（Multi-Face Identity）** — Work / Student / Creator / Family / Community… 相手の文脈に合わせて切替
- **360° Trust** — ポジティブだけでなく、ウォッチアウト（ネガ）も本人合意ベースで蓄積
- **Cloud Recommendation** — 過去のつながりから、次に話すといい人をAIが提案

## 技術スタック

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** カスタムデザインシステム
- すべて静的生成（SSG）でパフォーマンス最適化

## 開発

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 本番ビルド
npm start          # 本番サーバ
```

## デザイン原則

- ダークモード基調（`#050608` インクブラック）
- ティール（`#37e7c0`）と バイオレット（`#9d7bff`）のアクセント
- フォント：Inter / Noto Sans JP / Space Grotesk / JetBrains Mono
- グラスモーフィズム、グリッド背景、NFCパルスリングアニメーション

## ロードマップ（ピッチ準拠）

- **2026 Q2** — β: 人脈ネットワーク MVP（10コミュニティ / 300カード）
- **2026 Q3–Q4** — v1: イベント運営機能
- **2027 H1+** — v2: IDプラットフォーム構想

© 2026 Cloud Dragon, Inc.
