const React = require("react");
const DefaultLayout = require('./Layout/Default')
// This form is going to be preloaded with a default value of the index
function Edit({ tweet }) {
	console.log(tweet);
	return (
		<DefaultLayout>
			<main>
				<h2>Edit Tweet by: {tweet.author} </h2>
				<form action={`/api/tweets/${tweet._id}?_method=PUT`} method="POST">
					Title:{" "}
					<input type="text" name="title" defaultValue={tweet.title} required />
					<br />
					{/* Author: <input type='text' name='author'/><br/> */}
					Body:{" "}
					<textarea name="body" defaultValue={tweet.body} required></textarea>
					<br />
					Sponsored?{" "}
					<input
						type="checkbox"
						name="sponsored"
						defaultChecked={tweet.sponsored}
					/>
					<br />
					<input type="submit" value="Edit Tweet" />
				</form>
			</main>
		</DefaultLayout>
	);
}
module.exports = Edit;
