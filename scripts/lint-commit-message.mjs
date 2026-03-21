import { execFileSync } from "node:child_process";
import process from "node:process";
import { isValidCommitMessage, normalizeCommitMessage } from "./lib/commit-message.mjs";

function getMessageFromArguments(argumentsList) {
    const messageFlag = argumentsList.find((argument) => argument.startsWith("--message="));

    if (messageFlag) {
        return messageFlag.slice("--message=".length);
    }

    return execFileSync("git", ["log", "-1", "--pretty=%B"], { encoding: "utf8" });
}

const message = normalizeCommitMessage(getMessageFromArguments(process.argv.slice(2)));

if (!isValidCommitMessage(message)) {
    console.error(`Invalid commit message: "${message}"`);
    console.error('Expected format: "<type>: <description>" where <type> is feat, fix, docs, style, refactor, test, or chore.');
    process.exit(1);
}

console.log(`Commit message format passed: ${message}`);
