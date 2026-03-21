import fs from "node:fs";
import { execFileSync } from "node:child_process";
import puppeteer from "puppeteer";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

function getExecutablePath() {
    try {
        return puppeteer.executablePath();
    } catch {
        return "";
    }
}

function ensureBrowser() {
    const executablePath = getExecutablePath();

    if (executablePath && fs.existsSync(executablePath)) {
        console.log(`Chrome already available at ${executablePath}.`);
        return;
    }

    console.log("Installing Chrome for Puppeteer...");
    execFileSync(npmCommand, ["exec", "puppeteer", "browsers", "install", "chrome"], {
        stdio: "inherit",
    });

    const installedPath = getExecutablePath();

    if (!installedPath || !fs.existsSync(installedPath)) {
        throw new Error("Chrome installation completed, but Puppeteer could not resolve the executable path.");
    }

    console.log(`Chrome installed at ${installedPath}.`);
}

ensureBrowser();
