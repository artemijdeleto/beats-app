export default function Snackbar(content)
{
	let snackbar = document.createElement('div');
	snackbar.className = 'snackbar';
	snackbar.innerHTML = '<div class="snackbar-content">\
								<span>' + content + '</span>\
							</div>';

	document.body.appendChild(snackbar);

	setTimeout(function()
	{
		snackbar.parentNode.removeChild(snackbar);
	}, 9000);
}

/*function Dialog(title, content)
{
	let dialog = document.createElement('div');
	dialog.className = 'dialog';
	dialog.innerHTML = '<div><h1>' + title + '</h1>\
						<p>' + content + '</p>\
						<button class="button">OK</button></div>';

	dialog.querySelector('button').addEventListener('click', function (e)
	{
		dialog.parentNode.removeChild(dialog);
	});

	document.body.appendChild(dialog);
}*/