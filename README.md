# PasscodeLock — Vencord User Plugin
<img width="1207" height="892" alt="Screenshot 2026-11-18 204740" src="https://github.com/user-attachments/assets/2876ef68-5b99-409c-a817-8220fd274d76" />

**PasscodeLock** is a custom user plugin for [Vencord](https://vencord.dev) that adds a full-screen 6-character PIN lock to your Discord desktop client. It is designed to protect your account and messages whenever you open Discord, step away from your desk, or share your screen

---

## How It Works
When active, PasscodeLock places a full-screen overlay directly over the Discord interface and isolates keyboard focus inside the PIN box so Discord shortcuts cannot bypass it. As soon as all 6 matching characters are typed, the overlay unmounts and returns you straight to Discord.

### Key Features
- **Automatic Startup Lock:** Immediately locks Discord the moment the client launches so your chats are never visible before you enter your PIN.
- **Instant Manual Lock (`Ctrl + L`):** Press `Ctrl + L` (or `Cmd + L` on macOS) at any time inside Discord to lock the screen right away.
- **Inactivity Auto-Lock:** Automatically locks Discord if there is no mouse movement, scrolling, clicking, or typing for a set number of minutes.
- **Smart Input Box:**
  - Automatically converts lowercase letters to uppercase as you type.
  - Includes a built-in **Show/Hide Password** eye toggle so you can verify your PIN without mistyping.
  - Clears and refocuses automatically if an incorrect PIN is entered.

---

## Installation Guide

Because this is a **user plugin**, it requires a local Vencord source build rather than the standard pre-built installer.

1. **Navigate to your Vencord userplugins folder:**
   Open your local Vencord source directory and go to `src/userplugins/`. (Create the `userplugins` folder if it does not exist yet.)
2. **Add the plugin:**
   Clone or download this repository into `src/userplugins/` so your folder structure looks like this:
   ```text
   Vencord/
   └── src/
       └── userplugins/
           └── PasscodeLock/
               └── index.tsx
   ```
3. **Rebuild and inject Vencord:**
   Open a terminal in your main `Vencord` folder and run:
   ```bash
   pnpm build
   pnpm inject
   ```
4. **Restart Discord:**
   Completely quit Discord (including from your system tray) and reopen it.
5. **Enable the plugin:**
   Go to **User Settings > Vencord > Plugins**, search for **PasscodeLock**, and toggle it on.

---

## Settings & Customization
Click the **gear icon** next to **PasscodeLock** in your Vencord Plugins menu to configure how it behaves:

| Setting | Description | Default |
| :--- | :--- | :--- |
| **Pin** | The 6-character passcode required to unlock Discord (letters and numbers supported). | `000000` |
| **Lock On Start** | Controls whether Discord locks automatically every time you open the app. | `Enabled` |
| **Auto Lock Minutes** | Number of idle minutes before Discord locks itself. Set to `0` to turn off auto-locking. | `5` |

---

## Important Notes
- **Client-Side Privacy Lock:** This plugin protects local access to your Discord window on your computer; it does not replace Discord's account password or 2FA.
- **Forgot Your PIN?** If you ever lock yourself out, open your Vencord `settings.json` file, locate the `PasscodeLock` section, and reset or update the `"pin"` value.
<img width="1207" height="892" alt="Screenshot 2026-11-18 204740" src="https://github.com/user-attachments/assets/d5c6a5eb-27ad-44c6-9538-19fbc94d35d6" />
