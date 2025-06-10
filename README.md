# カロリートラッカー

LINEボットと連携した自動カロリー計算・体重管理システム

## 機能

- 🍎 自動カロリー計算
- 📊 栄養バランス分析
- 🎯 目標体重管理
- 📈 進捗の可視化
- 💬 LINE連携

## セットアップ

### 1. 依存関係のインストール
\`\`\`bash
npm install
\`\`\`

### 2. アプリケーションの起動
\`\`\`bash
npm start
\`\`\`

### 3. LINE連携設定
1. LINE Developersでチャネルを作成
2. Webhook URLを設定
3. Google Apps Scriptでスプレッドシート連携

## 使い方

### LINEボット
- 写真送信: 食事の写真を送ると自動でカロリー計算
- テキスト入力: 「カルボナーラ」などの食事名で検索
- 体重記録: 「体重 63kg」で記録
- レポート: 「今日のまとめ」で日次レポート

## 技術スタック
- React
- Recharts (グラフ表示)
- Lucide React (アイコン)
- Tailwind CSS (スタイリング)
- Google Sheets API
- LINE Messaging API
