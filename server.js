const express = require('express');
const WebSocket = require('ws');
const robot = require('robotjs');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

let lastClickPos = null;

wss.on('connection', ws => {
  // クライアントごとのズーム値を保持（初期値0）
  ws._zoomValue = 0;
  ws.on('message', msg => {
    const data = JSON.parse(msg);

    if (data.type === 'move') {
      const mouse = robot.getMousePos();
      const speed = 2; // 移動速度倍率
      const newX = mouse.x + data.dx * speed;
      const newY = mouse.y + data.dy * speed;
      robot.moveMouse(newX, newY);
      lastClickPos = { x: newX, y: newY };
    } else if (data.type === 'click') {
      robot.mouseClick();
      lastClickPos = robot.getMousePos();
    } else if (data.type === 'type') {
      robot.typeString(data.text);
    } else if (data.type === 'right_click') {
      robot.mouseClick('right');
    } else if (data.type === 'backspace') {
      robot.keyTap('backspace');
    } else if (data.type === 'sync_text') {
      robot.keyTap('a', process.platform === 'darwin' ? 'command' : 'control');
      robot.keyTap('backspace');
      if (data.text.length > 0) {
        robot.typeString(data.text);
      }
    } else if (data.type === 'reset_input') {
      robot.keyTap('a', process.platform === 'darwin' ? 'command' : 'control');
      robot.keyTap('backspace');
    } else if (data.type === 'enter') {
      robot.keyTap('enter');
    } else if (data.type === 'scroll') {
      robot.scrollMouse(0, -Math.round(data.dy * 3));
    } else if (data.type === 'drag_start') {
      robot.mouseToggle('down', 'left');
    } else if (data.type === 'drag_end') {
      robot.mouseToggle('up', 'left');
    } else if (data.type === 'zoom') {
      const mod = process.platform === 'darwin' ? 'command' : 'control';
      const prev = (typeof ws._zoomValue === 'number') ? ws._zoomValue : 0;
      const next = typeof data.value === 'number' ? data.value : Number(data.value);
      // 直前の左クリック座標で一度クリックしてからズーム（100ms待つ）
      if (lastClickPos) {
        robot.moveMouse(lastClickPos.x, lastClickPos.y);
        robot.mouseClick();
        setTimeout(() => {
          // リセット（0）時はCmd+0/Ctrl+0のみ送信
          if (next === 0 && prev !== 0) {
            robot.keyTap('0', mod);
            ws._zoomValue = 0;
            return;
          }
          const diff = next - prev;
          if (diff > 0) {
            for (let i = 0; i < diff; i++) {
              robot.keyTap('=', mod);
            }
          } else if (diff < 0) {
            for (let i = 0; i < -diff; i++) {
              robot.keyTap('-', mod);
            }
          }
          ws._zoomValue = next;
        }, 100);
        return;
      }
      // クリック座標がない場合は従来通り即ズーム
      if (next === 0 && prev !== 0) {
        robot.keyTap('0', mod);
        ws._zoomValue = 0;
        return;
      }
      const diff = next - prev;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          robot.keyTap('=', mod);
        }
      } else if (diff < 0) {
        for (let i = 0; i < -diff; i++) {
          robot.keyTap('-', mod);
        }
      }
      ws._zoomValue = next;
    } else if (data.type === 'spotlight') {
      // Spotlight起動（Cmd+Space or Ctrl+Space）
      const mod = process.platform === 'darwin' ? 'command' : 'control';
      robot.keyTap('space', mod);
    } else if (data.type === 'browser_nav') {
      if (data.direction === 'back') {
        if (process.platform === 'darwin') {
          robot.keyTap('[', 'command');
        } else if (process.platform === 'win32') {
          robot.keyTap('left', 'alt');
        }
      } else if (data.direction === 'forward') {
        if (process.platform === 'darwin') {
          robot.keyTap(']', 'command');
        } else if (process.platform === 'win32') {
          robot.keyTap('right', 'alt');
        }
      }
    }
  });
});

server.listen(3000, () => console.log('📡 http://your-mac-ip:3000'));
