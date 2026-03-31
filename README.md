# llmn_db

llamune システムのデータベース定義・マイグレーション管理リポジトリです。

## 構成

- **DB**: `llmndb`
- **スキーマ**: `llmn`
- **マイグレーションツール**: [node-pg-migrate](https://github.com/salsita/node-pg-migrate)

## データモデル

### 認証系

| テーブル | 説明 |
|---|---|
| `users` | ユーザーアカウント |
| `refresh_tokens` | JWT リフレッシュトークン |

### マスター系

| テーブル | 説明 |
|---|---|
| `models` | LLM モデル（ベースモデル・訓練済みモデル）。`parent_models_id` で前バージョンのモデルを参照。`version` でバージョン管理 |
| `poc` | チューニング対象。使用するモデルを `models_id` で指定 |
| `system_prompts` | poc に紐づくシステムプロンプト。`version` でバージョン管理 |

### 質問・回答系

| テーブル | 説明 |
|---|---|
| `questions` | 質問。`training_role` で訓練用途を分類（1: correction / 2: reinforcement / 3: graduated / 4: negative / 5: synthetic / 6: boundary） |
| `question_sets` | 質問セット（旧: ワークフロー）。poc とシステムプロンプトに紐づく |
| `question_set_items` | 質問セットと質問の紐付け。`order_index` で順序管理 |
| `answers` | 回答。`answer_type` で人間の回答（`human`）と LLM の回答（`llm`）を区別 |

### 実行系

| テーブル | 説明 |
|---|---|
| `question_set_executions` | 質問セットの実行履歴（モデルへの問い合わせ実行） |
| `question_set_execution_results` | 実行結果の個別回答。`answers_id` で `answers` テーブルを参照 |

### 訓練系

| テーブル | 説明 |
|---|---|
| `training_jobs` | 訓練ジョブ。`training_mode` で訓練方式を指定（1: lora / 2: llamune） |

## セットアップ

### 前提条件

- Node.js 18 以上
- PostgreSQL 14 以上（プライマリ: mac-m1）

### インストール
```bash
npm install
```

### 環境変数

`.env.example` をコピーして `.env` を作成します。
```bash
cp .env.example .env
```

`.env` を編集します。
```
DATABASE_URL=postgresql://user:password@mac-m1/llmndb
```

### DB の作成
```bash
psql -U <user> -h mac-m1 -d postgres -c "CREATE DATABASE llmndb;"
```

### マイグレーションの実行
```bash
export $(cat .env | xargs) && npm run migrate:up
```

### マイグレーションのロールバック
```bash
export $(cat .env | xargs) && npm run migrate:down
```

### マイグレーションファイルの作成
```bash
npm run migrate:create -- <migration-name>
```

## DB 構成

mac-m1 がプライマリ、mac-m4 がスタンバイの PostgreSQL ストリーミングレプリケーション構成です。

フェイルオーバー手順については [doc/FAILOVER.md](./doc/FAILOVER.md) を参照してください。
