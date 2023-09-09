const React = require("react");
const DefaultLayout = require('./Layout/Default')
function Show({ tweet }) {
	console.log(tweet);
	return (
		<DefaultLayout>
			<main>
				<nav>
					<a href="/tweets">Other tweets</a>
				</nav>
				<br />
				<div>Title: {tweet.title}</div>
				<div>Made by: {tweet.author}</div>
				<div>Tweet: {tweet.body}</div>
				<div>{tweet.sponsored ? "Sponsored" : ""}</div>
				<div>Created on: {new Date(tweet.createdAt).toLocaleDateString()} </div>
				{/* toLocaleDateString(): shows the date only */}
				{/* .toISOString(): shows the date with the time, hms */}
				{/* Comments Mapping */}
				<div>
					{tweet.comments.length &&
						tweet.comments.map((comment) => {
							return(
								<div key={comment._id}>
									<div>{comment.author}</div>
									<div>{comment.body}</div>
			
								</div>
							)
						})}
				</div>
				{/* Comments Form */}
				<div>
					<h3>Comments</h3>
					<form
						method="POST"
						action={`/api/tweets/addComment/${tweet._id}?_method=PUT`}
					>
						Author: <input type="text" name="author" />
						<br />
						Comment: <input type="text" name="body" />
						<br />
						<input type="submit" value="Add Comment" />
					</form>
				</div>
			</main>
		</DefaultLayout>
	);
}
module.exports = Show;
