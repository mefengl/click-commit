// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "click-commit" is now active!');

	let disposable = vscode.commands.registerCommand('extension.runAIC', async () => {
		const currentWorkspace = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
		if (!currentWorkspace) {
			vscode.window.showErrorMessage('No workspace folder open');
			return;
		}
	
		const terminal = vscode.window.createTerminal('aic');
		terminal.show();
		terminal.sendText('aic');
	});
	
	context.subscriptions.push(disposable);
	
}

// This method is called when your extension is deactivated
export function deactivate() {}
