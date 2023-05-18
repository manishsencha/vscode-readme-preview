// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import markdown, { getCodeString } from '@wcj/markdown-to-html';
import * as fs from 'fs';
import * as path from 'path';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// console.log('Congratulations, your extension "readme-preview" is now active!');

	let disposable = vscode.commands.registerCommand('readme-preview.showPreview', () => {
		var view: vscode.WebviewPanel | undefined = undefined;

		let filePath = vscode.window.activeTextEditor?.document.fileName;
		let interval: any;
		if (filePath && filePath.toLocaleLowerCase().endsWith(".md")) {
			if (!view) {
				view = vscode.window.createWebviewPanel('readmePreview', 'Preview', vscode.ViewColumn.Two, {});
			}
			interval = setInterval(() => {
				if (filePath && filePath.toLocaleLowerCase().endsWith(".md")) {
					let data = fs.readFileSync(filePath).toString();
					console.log("DATA : ", data);
					let parsedData = markdown(data).toString();
					if (view) {
						console.log("VIEW : ", view);
						view.webview.html = parsedData;
					}
				}
				else {
					clearInterval(interval);
				}
			}, 2000);
		}
		view?.onDidDispose(e => {
			clearInterval(interval);
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
