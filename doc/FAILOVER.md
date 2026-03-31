# フェイルオーバー手順

## 構成

| 役割 | ホスト |
|---|---|
| プライマリ | mac-m1 |
| スタンバイ | mac-m4 |

---

## mac-m1 → mac-m4 へのフェイルオーバー

mac-m1 が障害などで使用不能になった場合の手順です。

### 1. mac-m4 をプライマリに昇格

mac-m4 で実行します。
```bash
/opt/homebrew/opt/postgresql@16/bin/pg_ctl promote -D /opt/homebrew/var/postgresql@16
```

昇格を確認します。
```bash
psql -U m -d postgres -c "SELECT pg_is_in_recovery();"
```

`f`（false）が返れば昇格成功です。

### 2. 各サービスの接続先を変更

各リポジトリの `.env` の `DATABASE_URL` を mac-m4 のアドレスに変更します。
```
DATABASE_URL=postgresql://m:m@mac-m4/llmndb
```

対象リポジトリ：

- `llmn_db`
- `llamune_poc`
- `llamune_learn`

### 3. サービスを再起動

pm2 で管理しているサービスを再起動します。
```bash
pm2 restart all
```

---

## mac-m4 → mac-m1 への切り戻し

mac-m1 が復旧した場合に元の構成に戻す手順です。

### 1. mac-m1 の PostgreSQL を停止

mac-m1 で実行します。
```bash
/opt/homebrew/opt/postgresql@16/bin/pg_ctl stop -D /opt/homebrew/var/postgresql@16
```

### 2. mac-m1 のデータを mac-m4 に同期

mac-m1 で実行します。既存のデータディレクトリを削除してから同期します。
```bash
rm -rf /opt/homebrew/var/postgresql@16
pg_basebackup -h mac-m4 -U replicator -D /opt/homebrew/var/postgresql@16 -P -Xs -R
```

### 3. mac-m1 の PostgreSQL を起動

mac-m1 で実行します。
```bash
/opt/homebrew/opt/postgresql@16/bin/pg_ctl start -D /opt/homebrew/var/postgresql@16
```

### 4. mac-m4 をスタンバイに戻す

mac-m4 で実行します。
```bash
/opt/homebrew/opt/postgresql@16/bin/pg_ctl stop -D /opt/homebrew/var/postgresql@16
rm -rf /opt/homebrew/var/postgresql@16
pg_basebackup -h mac-m1 -U replicator -D /opt/homebrew/var/postgresql@16 -P -Xs -R
/opt/homebrew/opt/postgresql@16/bin/pg_ctl start -D /opt/homebrew/var/postgresql@16
```

### 5. 各サービスの接続先を元に戻す

各リポジトリの `.env` の `DATABASE_URL` を mac-m1 のアドレスに戻します。
```
DATABASE_URL=postgresql://m:m@mac-m1/llmndb
```

### 6. サービスを再起動
```bash
pm2 restart all
```
