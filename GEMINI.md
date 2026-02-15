# Moltworker（OpenClaw）プロジェクト - Cloudflare Workers デプロイ

このプロジェクトは OpenClaw を Cloudflare Workers にデプロイするためのものです。

## プロジェクト概要
- **目的**: LLM エージェントを Cloudflare Workers 上で動作させる
- **主要技術**: Cloudflare Workers, Wrangler CLI, R2 Storage, AI Gateway
- **チャット連携**: Telegram, Discord, Slack

## 重要な設定ファイル
- `wrangler.jsonc`: Cloudflare Workers の設定
- `package.json`: Node.js の依存関係
- `.dev.vars`: ローカル環境変数（git 管理外）

## 必須シークレット（Cloudflare Workers に設定する）

### LLM API キー（いずれか1つ）
- `ANTHROPIC_API_KEY`: Anthropic を使う場合
- `CLOUDFLARE_AI_GATEWAY_API_KEY`: AI Gateway 経由の場合（Gemini 推奨）
- `CLOUDFLARE_AI_GATEWAY_ID`: AI Gateway の ID
- `CF_AI_GATEWAY_MODEL`: 使用するモデル名

### 共通シークレット（全て必須）
- `MOLTBOT_GATEWAY_TOKEN`: ゲートウェイアクセス用トークン（`openssl rand -hex 32`で生成）
- `CF_ACCOUNT_ID`: Cloudflare アカウント ID

### Cloudflare Access（推奨）
- `CF_ACCESS_TEAM_DOMAIN`: Zero Trust のチームドメイン
- `CF_ACCESS_AUD`: Application Audience タグ

### R2 ストレージ（推奨）
- `R2_ACCESS_KEY_ID`: R2 API トークンの Access Key ID
- `R2_SECRET_ACCESS_KEY`: R2 API トークンの Secret Access Key

### チャット連携（最低1つ）
- `TELEGRAM_BOT_TOKEN`: Telegram ボットトークン
- `DISCORD_BOT_TOKEN`: Discord ボットトークン
- `SLACK_BOT_TOKEN`: Slack ボットトークン
- `SLACK_APP_TOKEN`: Slack アプリレベルトークン

## よく使うコマンド
- `npx wrangler login`: Cloudflare にログイン
- `npx wrangler secret put <KEY_NAME>`: シークレット設定
- `npx wrangler secret list`: 設定済みシークレット一覧
- `npm run deploy`: デプロイ（Docker または GitHub Actions が必要）
- `npx wrangler tail`: ログのリアルタイム表示

## デプロイ方法
1. GitHub Actions（推奨）: リポジトリをフォークし、Actions タブから実行
2. Docker 経由: `docker --version` で確認後、`npm run deploy`

## トラブルシューティング
- エラーが出たら、まず `npx wrangler secret list` で設定を確認
- Gemini 利用時は AI Gateway が必須
- デプロイ時のエラーは Workers Paid プランが有効か確認
