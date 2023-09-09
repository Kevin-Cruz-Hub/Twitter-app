const React = require("react");
const DefaultLayout = require('./Layout/Default')
function New() {
	return (
		<DefaultLayout>
			<main>
				<h2>Create a new Tweet</h2>
				<form action="/api/tweets" method="POST">
					Title: <input type="text" name="title" required /><br/>
					Author: <input type="text" name="author" required /><br/>
					Tweet: <textarea name="body" required></textarea><br/>
					<input type="Submit" value="Tweet" />
				</form>
			</main>
		</DefaultLayout>
	);
}
module.exports = New;
