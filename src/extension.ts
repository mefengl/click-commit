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

async function runCommandInTerminal(command: string) { const currentWorkspace = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
	if (!currentWorkspace) {
		vscode.window.showErrorMessage('No workspace folder open');
		return;
	}

	const terminal = vscode.window.createTerminal(command);
	terminal.show();
	terminal.sendText(command);

	// Wait for the command to execute then close the terminal
	setTimeout(async () => {
		terminal.dispose(); // Dispose the terminal instance
		await vscode.commands.executeCommand('workbench.action.terminal.toggleTerminal'); // Toggle terminal view
	}, 5000); // Adjust the timeout as needed
}
