# Remote Touchpad

## For Users
# English and Japanese README available
[日本語版](./README_ja.md)

### Overview
Remote Touchpad is a desktop app (Electron) that lets you use your smartphone or tablet as a remote touchpad and keyboard for your PC.

- **Electron app**: Easy server ON/OFF from the window, no need to run `node server.js` manually
- **Modern dark UI**
- **PWA support** (add to home screen on mobile)
- **Free, open source, LAN-only, privacy-friendly**

---

### Main Features
- 1-finger: Mouse move
- 2-finger: Scroll (with inertia)
- 3-finger: Drag & Drop
- Double tap: Left click
- Long press: Right click
- Text input (real-time sync, send with Enter/reset)
- Zoom (slider, +/-, Cmd/Ctrl+=/-/0)
- Dark UI, accidental touch prevention
- PWA: Add to home screen

---

### Installation & Usage

1. [GitHub Releases](https://github.com/hrak0x59/remote-touchpad/releases)からお使いのOS用のインストーラー（.dmg, .exeなど）をダウンロード
- MacOS: [Download .dmg](https://github.com/hrak0x59/remote-touchpad/releases/download/v0.1.0-beta/Remote.Touchpad-1.0.0-arm64.dmg)
2. インストーラーを実行し、アプリをインストール
3. アプリを起動し、ウィンドウに表示されるIPアドレスを確認
4. スマホ/タブレットで同じWi-Fiに接続し、`http://[PCのIP]:3000` にアクセス
5. 必要に応じてホーム画面追加（PWA対応）

#### Accessibility on macOS
- Go to **System Settings > Privacy & Security > Accessibility**
- Enable access for all items named "Remote Touchpad.app", "Electron", etc.
- Restart the app (and Mac if needed)

---

### Distribution (GitHub Releases)
- Upload `.dmg`, `.exe`, etc. in `dist/` to your GitHub repository's **Releases** page
- Share the Releases page URL with users
- Do **not** commit `dist/` to git (it's in `.gitignore`)

---

### Notes
- On macOS, robotjs requires accessibility permissions (see above)
- Communication is only within the same LAN, safe for personal or internal use
- No data is sent to any external server, so security risks are transparent

---

## For Developers

### Setup
- Install [Node.js](https://nodejs.org/) v20 or later
- Install dependencies:
  ```sh
  npm install
  ```
- (On Mac) Install Xcode Command Line Tools if needed:
  ```sh
  xcode-select --install
  ```

### Development & Build
- Start the Electron app:
  ```sh
  npm start
  ```
- Build distributable app (macOS/Windows/Linux):
  ```sh
  npm run dist
  ```
- `.dmg`, `.exe`, etc. will be generated in the `dist/` folder

### Rebuilding robotjs
- If you change Node.js/Electron version or get a binary mismatch error:
  ```sh
  npm install
  npx electron-rebuild
  ```

### Contributing
- Pull requests and issues are welcome
- Code and documentation improvements are appreciated

### Other
- For development, use `npm start` (Electron)
- For distribution, use `npm run dist` and upload to GitHub Releases
- Do **not** commit `dist/` to git (it's in `.gitignore`)

---

## License
MIT

## Benefits
- **Free to use**
- **Open source** (customization and modification are welcome)
- **No data is sent to any external server, so security risks are transparent**
  - Communication is only within the same LAN, safe for personal or internal use
