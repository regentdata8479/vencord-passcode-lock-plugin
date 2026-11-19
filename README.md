# PasscodeLock — Vencord User Plugin

**PasscodeLock** is a custom user plugin for [Vencord](https://vencord.dev) that locks your Discord desktop app behind a 6-character PIN screen. It protects your messages and servers whenever you launch Discord, step away from your PC, or share your screen.

<img width="1207" height="892" alt="Screenshot 2026-11-18 204740" src="https://github.com/user-attachments/assets/5d6558d3-aaf2-46f8-adb0-1a1c5e45aac9" />


---

## What Does This Plugin Do?
- **Locks Discord on Startup:** As soon as Discord opens, a full-screen PIN prompt blocks access until the right 6 characters are entered.
  
- **Instant Lock Hotkey (`Ctrl + L`):** Press `Ctrl + L` (or `Cmd + L` on Mac) anywhere in Discord to lock your screen immediately.
  
- **Auto-Lock Timer:** Automatically locks Discord after a set number of minutes if you go AFK (no mouse movement, clicks, or typing).
  
- **Idiot-Proofing ts shit:**
  - Automatically converts everything you type to **UPPERCASE** (so you never have to worry about Caps Lock).
    
  - Includes a **Show/Hide Eye Icon** inside the box so you can see what you're typing.
    
  - Automatically unlocks the instant the 6th right character is typed—no need to press Enter.

---

## BEFORE YOU START (Read This First!)
> **Important:** Because this is a **User Plugin**, it will **NOT** work with the basic pre-built Vencord installer (`VencordInstaller.exe`). You **must** build Vencord from source using Git, Node.js, and `pnpm`. 
> 
> If you already have a Vencord source folder set up on your PC, skip straight to **Step 2**.

---

## Step 1: Set Up Vencord From Source (Skip if you already have it)
If you have never built Vencord yourself, follow the official [Vencord Custom Plugins Guide](https://vencord.dev) or do these quick steps:

1. Install **[Git](https://git-scm.com)** and **[Node.js (LTS)](https://nodejs.org)**.
2. Open a terminal (Command Prompt or PowerShell) and install `pnpm`:
   ```bash
   npm install -g pnpm
   ```
3. Clone Vencord to your PC and install its dependencies:
   ```bash
   git clone https://github.com
   cd Vencord
   pnpm install --frozen-lockfile
   ```

---

## Step 2: Download & Install PasscodeLock

1. **Download this repository:**
   - Scroll up to the top of this GitHub page, click the green **`<> Code`** button, and click **Download ZIP**.
   
   - Right-click the downloaded `.zip` file and click **Extract All**.
2. **Locate your `userplugins` folder:**
   - Open your `Vencord` source folder from Step 1.
   - Open the **`src`** folder.
   - Look for a folder named **`userplugins`**. *(If it doesn't exist yet, right-click and create a new folder named `userplugins`—all lowercase, no spaces).*
3. **Copy the `PasscodeLock` folder inside:**
   - Drag the **`PasscodeLock`** folder (the one containing `index.tsx`) into `Vencord/src/userplugins/`.
   - **DOUBLE-CHECK YOUR FOLDER PATH!** It must look **exactly** like this:
     ```text
     Vencord/
     └── src/
         └── userplugins/
             └── PasscodeLock/
                 └── index.tsx
     ```
     *(Common Mistake: Do NOT put `PasscodeLock-main/PasscodeLock/index.tsx` or `index.tsx` loose inside `userplugins`!)*

---

## Step 3: Build & Inject Vencord

1. Open your terminal inside your main **`Vencord`** folder.
2. Build Vencord with the new plugin:
   ```bash
   pnpm build
   ```
3. Inject Vencord into your Discord client:
   ```bash
   pnpm inject
   ```
   *(Follow the terminal prompts and select your Discord installation, e.g., Stable, PTB, or Canary).*
4. **Completely restart Discord:**
   - Closing the window with `X` is **not** enough because Discord stays open in the background.
   - Look at your bottom-right Windows taskbar tray (near the clock), right-click the **Discord icon**, and click **Quit Discord**.
   - Reopen Discord.

---

## Step 4: Turn It On & Set Your PIN

1. Open Discord and click the **User Settings** gear icon (bottom-left).
2. Scroll down to the **Vencord** section and click **Plugins**.
3. Search for **`PasscodeLock`** and flip the switch **ON**.
4. Click the **gear icon** next to `PasscodeLock` to configure your settings:

| Setting | What It Does | Default |
| :--- | :--- | :--- |
| **Pin** | Your custom 6-character passcode (letters and/or numbers). | `000000` |
| **Lock On Start** | Automatically locks Discord every time you open the app. | `ON` |
| **Auto Lock Minutes** | Locks Discord after this many minutes of being AFK. Set to `0` to disable. | `5` |

---

## Troubleshooting & FAQ

### "I forgot my PIN and locked myself out!"
Don't panic—you don't need to reinstall Discord:
1. Completely quit Discord from your system tray.
2. Open your Vencord configuration folder:
   - **Windows:** Press `Win + R`, type `%appdata%\Vencord\settings`, and hit Enter.
   - **Mac:** Open Finder, press `Cmd + Shift + G`, and go to `~/Library/Application Support/Vencord/settings`.
   - **Linux:** Go to `~/.config/Vencord/settings`.
3. Open **`settings.json`** in Notepad (or any text editor).
4. Find `"PasscodeLock"` and either change `"pin": "YOURNEWPIN"` or delete the whole `"PasscodeLock"` block.
5. Save the file and reopen Discord.

### "I built Vencord, why isn't PasscodeLock showing up in my Plugins list?"
- Make sure the file is named **`index.tsx`** (not `index.tsx.txt` or `index.ts`).
- Make sure the folder structure is `Vencord/src/userplugins/PasscodeLock/index.tsx` and not nested inside an extra unzipped folder.
- Re-run `pnpm build` and check the terminal for any red error text.

### "I can't type into the PIN box!"
- Click directly inside the dark PIN box once to focus it, or make sure you copied the latest `index.tsx` from this repository.
