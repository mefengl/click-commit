import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "click-commit" is now active!');

	const runAICCommand = vscode.commands.registerCommand('extension.runAIC', async () => {
		runCommandInTerminal('aic');
	});

	const runAIPCommand = vscode.commands.registerCommand('extension.runAIP', async () => {
		runCommandInTerminal('aip');
	});

	context.subscriptions.push(runAICCommand);
	context.subscriptions.push(runAIPCommand);
}

export function deactivate() { }

function runCommandInTerminal(command: string) {
	const currentWorkspace = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
	if (!currentWorkspace) {
		vscode.window.showErrorMessage('No workspace folder open');
		return;
	}

	const terminal = vscode.window.createTerminal(command);
	terminal.show();
	terminal.sendText(command);
}
