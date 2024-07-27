const vscode = require('vscode');

function activate(context) {
	console.log('Inline Commenter extension is now active!');

	let disposable = vscode.commands.registerCommand('extension.inlineCommenter', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);
			const isCommented = /^(\s?\/\*).*(\*\/\s?)$/g.test(selectedText);

			const commentedText = isCommented
				? selectedText.trim().replace(/^\/\*\s?|\s?\*\/$/g, '')
				: `/* ${selectedText} */`;

			editor.edit(editBuilder => {
				editBuilder.replace(selection, commentedText);
			});
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
};
