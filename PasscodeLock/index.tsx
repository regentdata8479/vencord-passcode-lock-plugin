/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { createRoot, React, useEffect, useRef, useState } from "@webpack/common";

const settings = definePluginSettings({
    pin: {
        type: OptionType.STRING,
        description: "The 6-character PIN required when Discord opens",
        default: "111111",
    },
    lockOnStart: {
        type: OptionType.BOOLEAN,
        description: "Lock Discord immediately on startup",
        default: true,
    },
    autoLockMinutes: {
        type: OptionType.NUMBER,
        description: "Auto-lock after X minutes of inactivity (set to 0 to disable)",
        default: 5,
    }
});

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;
let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

function LockScreen({ onUnlock }: { onUnlock: () => void; }) {
    const [pinInput, setPinInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const expectedPin = (settings.store.pin || "6TT55T").replace(/\s+/g, "").toUpperCase();

    useEffect(() => {
        const focusTimer = setInterval(() => {
            if (document.activeElement !== inputRef.current) {
                inputRef.current?.focus();
            }
        }, 100);
        return () => clearInterval(focusTimer);
    }, []);

    const handleInput = (rawValue: string) => {
        const upper = rawValue.replace(/\s+/g, "").toUpperCase().slice(0, expectedPin.length);
        setPinInput(upper);
        setError(false);

        if (upper.length === expectedPin.length) {
            if (upper === expectedPin) {
                onUnlock();
            } else {
                setError(true);
                setTimeout(() => {
                    setPinInput("");
                    setError(false);
                    inputRef.current?.focus();
                }, 500);
            }
        }
    };
    return (
        <div
            onClick={() => inputRef.current?.focus()}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 999999,
                backgroundColor: "#1a1b1e",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontFamily: "var(--font-primary, 'gg sans', sans-serif)",
                userSelect: "none",
            }}
        >
            <h2 style={{ fontSize: "20px", fontWeight: 500, margin: "0 0 18px 0", color: "#f2f3f5" }}>
                Enter {expectedPin.length}-Character PIN
            </h2>

            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                    ref={inputRef}
                    type={showPassword ? "text" : "password"}
                    maxLength={expectedPin.length}
                    value={pinInput}
                    onChange={e => handleInput(e.target.value)}
                    onKeyDown={e => e.stopPropagation()}
                    onKeyUp={e => e.stopPropagation()}
                    onKeyPress={e => e.stopPropagation()}
                    autoFocus
                    style={{
                        width: "260px",
                        height: "52px",
                        padding: "0 44px 0 44px",
                        borderRadius: "8px",
                        backgroundColor: "#2b2d31",
                        border: error ? "2px solid #f23f43" : "2px solid #5865f2",
                        color: "#ffffff",
                        fontSize: "20px",
                        fontWeight: 600,
                        letterSpacing: "4px",
                        textAlign: "center",
                        textTransform: "uppercase",
                        outline: "none",
                        boxSizing: "border-box",
                        pointerEvents: "auto",
                    }}
                />

                <button
                    type="button"
                    onClick={e => {
                        e.stopPropagation();
                        setShowPassword(prev => !prev);
                        inputRef.current?.focus();
                    }}
                    title={showPassword ? "Hide PIN" : "Show PIN"}
                    style={{
                        position: "absolute",
                        right: "10px",
                        background: "none",
                        border: "none",
                        color: "#b5bac1",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px",
                    }}
                >
                    {showPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    )}
                </button>
            </div>

            <div style={{ height: "24px", marginTop: "12px" }}>
                {error && (
                    <span style={{ color: "#f23f43", fontSize: "14px", fontWeight: 500 }}>
                        Incorrect PIN
                    </span>
                )}
            </div>
        </div>
    );
}

function resetInactivityTimer() {
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
        inactivityTimer = null;
    }

    const minutes = settings.store.autoLockMinutes;
    if (!minutes || minutes <= 0 || container) return;

    inactivityTimer = setTimeout(() => {
        showLock();
    }, minutes * 60 * 1000);
}

function showLock() {
    if (container || !settings.store.pin) return;
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
        inactivityTimer = null;
    }
    container = document.createElement("div");
    container.id = "vc-passcode-lock";
    document.body.appendChild(container);
    root = createRoot(container);
    root.render(<LockScreen onUnlock={hideLock} />);
}

function hideLock() {
    if (root) {
        root.unmount();
        root = null;
    }
    if (container) {
        container.remove();
        container = null;
    }
    resetInactivityTimer();
}

function onGlobalKeyDown(e: KeyboardEvent) {
    if (container) return;

    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        e.stopPropagation();
        showLock();
        return;
    }
    resetInactivityTimer();
}

const ACTIVITY_EVENTS = ["mousemove", "mousedown", "wheel", "touchstart"] as const;

export default definePlugin({
    name: "PasscodeLock",
    description: "Requires a 6-character PIN code when opening Discord",
    authors: [{ name: "User", id: 0n }],
    settings,

    start() {
        window.addEventListener("keydown", onGlobalKeyDown, true);
        ACTIVITY_EVENTS.forEach(evt => window.addEventListener(evt, resetInactivityTimer, { passive: true }));

        if (settings.store.lockOnStart) {
            showLock();
        } else {
            resetInactivityTimer();
        }
    },

          stop() {
        window.removeEventListener("keydown", onGlobalKeyDown, true);
        ACTIVITY_EVENTS.forEach(evt => window.removeEventListener(evt, resetInactivityTimer));
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
            inactivityTimer = null;
        }
        hideLock();
    }
});
