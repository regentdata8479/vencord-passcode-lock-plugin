# PasscodeLock (Vencord User Plugin)
<img width="1207" height="892" alt="Screenshot 2026-11-18 204740" src="https://github.com/user-attachments/assets/06d4a0e9-2973-490d-816b-8252af6a615d" />

A clean, lightweight user plugin for [Vencord](https://vencord.dev) that protects your Discord client with a customizable 6-character PIN lock screen.

## Features
- **Startup Lock:** Automatically locks Discord the moment it opens.
- **Quick Lock Shortcut:** Press `Ctrl + L` (or `Cmd + L` on macOS) anytime to lock immediately.
- **Inactivity Auto-Lock:** Automatically locks Discord after a configurable number of idle minutes (set to `0` to disable).
- **Auto-Uppercase & Show/Hide Toggle:** Automatically converts input to uppercase and includes an eye toggle button to view or mask your PIN.

## Installation
1. Clone or download this repository into your Vencord `src/userplugins/` directory so the path looks like:
   ```text
   Vencord/src/userplugins/PasscodeLock/index.tsx
   ```
2. Rebuild Vencord:
   ```bash
   pnpm build
   ```
3. Restart Discord and enable **PasscodeLock** under **User Settings > Vencord > Plugins**.

## Configuration
Open the plugin settings in Vencord to customize:
- **Pin:** Set your custom 6-character passcode.
- **Lock On Start:** Toggle locking when Discord launches.
- **Auto Lock Minutes:** Set the idle timeout duration in minutes.
