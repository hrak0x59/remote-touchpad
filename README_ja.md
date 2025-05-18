# Remote Touchpad

## 一般ユーザー向けガイド

### 概要
Remote Touchpadは、スマホやタブレットをPCのリモートタッチパッド・キーボードとして使えるデスクトップアプリ（Electron）です。

- **Electronアプリ**：サーバーの起動・停止もウィンドウから簡単操作、`node server.js`の手動起動不要
- **モダンなダークUI**
- **PWA対応**（スマホでホーム画面追加）
- **無料・オープンソース・LAN内のみ・プライバシー重視**

---

### 主な機能
- 1本指：マウス移動
- 2本指：慣性付きスクロール
- 3本指：ドラッグ＆ドロップ
- ダブルタップ：左クリック
- 長押し：右クリック
- テキスト入力（リアルタイム同期、Enter/リセットで送信）
- ズーム（スライダー、＋/−、Cmd/Ctrl+=/-/0）
- ダークUI、誤操作防止
- PWA：ホーム画面追加対応

---

### インストール・使い方

1. [GitHub Releases](https://github.com/hrak0x59/remote-touchpad/releases)からお使いのOS用のインストーラー（.dmg, .exeなど）をダウンロード
2. インストーラーを実行し、アプリをインストール
3. アプリを起動し、ウィンドウに表示されるIPアドレスを確認
4. スマホ/タブレットで同じWi-Fiに接続し、`http://[PCのIP]:3000` にアクセス
5. 必要に応じてホーム画面追加（PWA対応）

#### macOSのアクセシビリティ設定
- **システム設定 > プライバシーとセキュリティ > アクセシビリティ**で「Remote Touchpad.app」「Electron」など**関連する全て**にチェックを入れる
- アプリやMacを再起動

---

### 配布方法（GitHub Releases）
- `dist/`内の`.dmg`や`.exe`等をGitHubリポジトリの**Releases**ページにアップロード
- ReleasesページのURLをユーザーに案内
- `dist/`はgit管理しない（.gitignoreで除外）

---

### 注意事項
- macOSではrobotjsの権限設定が必要（上記参照）
- 通信は同一LAN内のみ、個人利用・社内利用にも安心
- 外部サーバー等に一切データを送信しないため、セキュリティリスクが透明

---

## 開発者向けガイド

### セットアップ
- [Node.js](https://nodejs.org/) v20以上をインストール
- 依存パッケージをインストール：
  ```sh
  npm install
  ```
- （Macの場合）Xcodeコマンドラインツールも必要な場合あり：
  ```sh
  xcode-select --install
  ```

### 開発・ビルド
- Electronアプリとして起動：
  ```sh
  npm start
  ```
- 配布用アプリ（macOS/Windows/Linux）をビルド：
  ```sh
  npm run dist
  ```
- `dist/`フォルダに`.dmg`や`.exe`等が生成されます

### robotjsの再ビルド
- Node.js/Electronのバージョンを変えた場合や、robotjsのバイナリ不一致エラーが出た場合：
  ```sh
  npm install
  npx electron-rebuild
  ```

### コントリビュート
- プルリクエスト・Issue歓迎
- コード・ドキュメントの改善も大歓迎

### その他
- 開発時は`npm start`（Electron）推奨
- 配布時は`npm run dist`でビルドし、GitHub Releasesで配布
- `dist/`はgit管理しない（.gitignoreで除外）

---

## ライセンス
MIT

## 使うメリット
- **無料で利用可能**
- **オープンソース**（カスタマイズ・改変も自由）
- **外部サーバー等に一切データを送信しないため、セキュリティリスクが透明**
  - 通信は同一LAN内のみ、個人利用・社内利用にも安心 