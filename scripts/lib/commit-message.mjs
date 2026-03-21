export const commitMessagePattern = /^(feat|fix|docs|style|refactor|test|chore): [^\s].+$/u;

export function normalizeCommitMessage(message) {
    return message.trim();
}

export function isValidCommitMessage(message) {
    return commitMessagePattern.test(normalizeCommitMessage(message));
}
