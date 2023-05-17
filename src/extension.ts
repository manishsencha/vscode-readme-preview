// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import markdown, { getCodeString } from '@wcj/markdown-to-html';
import * as fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// console.log('Congratulations, your extension "readme-preview" is now active!');

	let disposable = vscode.commands.registerCommand('readme-preview.showPreview', () => {
		var view: vscode.WebviewPanel;
		console.log(vscode);
		console.log(vscode.window);
		vscode.window.onDidChangeActiveTextEditor((event) => {
			console.log(event);
			if (event) {
				console.log(event);
				let filePath: string = event.document.fileName;
				let isReadme = filePath && filePath.toLocaleLowerCase().endsWith("md");
				let data: string = '';
				let interval;
				let parsedData: string = '';
				console.log(filePath);
				if (isReadme) {
					console.log("ISREADME : ", isReadme);
					console.log(view);
					if (!view) {
						view = vscode.window.createWebviewPanel('readmePreview', 'Preview', vscode.ViewColumn.Two, {});
					}
					interval = setInterval(() => {
						data = fs.readFileSync(filePath).toString();
						parsedData = markdown(data).toString();
						if (view) {
							view.webview.html = parsedData;
						}
					}, 2000);
				}
				else {
					console.log("here");
					if (view) {
						view.dispose();
						console.log("DISPOSED!!");
					}
					if (interval) {
						clearInterval(interval);
					}
				}
			}
		});

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
