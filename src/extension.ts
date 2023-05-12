import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

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

	const successFile = path.join(vscode.workspace.rootPath || '', '.vscode_success');
	fs.watch(successFile, async (event, filename) => {
		if (event === 'rename' && fs.existsSync(successFile)) { // file was created
			fs.unlinkSync(successFile); // delete the file
			// The command completed successfully. Close the terminal.
			await vscode.commands.executeCommand('workbench.action.terminal.toggleTerminal');
		}
	});
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
	terminal.sendText(`${command} && touch .vscode_success`);
}
