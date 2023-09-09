const React = require("react");
const DefaultLayout = require("./Layout/Default");

function Main({ tweets }) {
	return (
		// title can be anything, it is whats displayed on the tabs
		// DefaultLayout is similar to a div in the sense that everything within is considered a child of the default layout
		<DefaultLayout title="Tweets">
			{/* Any JSX code passed in here is going to go to the children prop inside the default.jsx file */}
			<nav>
				{/* Link to create a new tweet */}
				<a href="/tweets/new">Create a new Tweet</a>
			</nav>
			<ul>
				{/* List of tweets */}
				{tweets.map((tweet) => {
					return (
						<li key={tweet._id} className="border p-5">
							<a href={`/tweets/${tweet._id}`}>{tweet.title}</a>
							<p>{tweet.body}</p>
							<p>{tweet.author}</p>
							<div>
								{/* add the api route to increase */}
								<a href={`/api/tweets/addLike/${tweet._id}`}>Like: <span>{tweet.likes}</span> </a>
								
							</div>
							<span>{tweet.sponsored ? "Sponsored" : ""}</span>

							<br />
							{/* Edit the tweet */}
							<a href={`/tweets/${tweet._id}/edit`}>Edit</a>

							{/* updating the map method with a form*/}
							<form
								method="POST"
								// The method override looks for the method in action, because the form by default can only do GET and POST
								action={`/api/tweets/${tweet._id}?_method=DELETE`}
							>
								{/* form and input is used because we are going to use a npm package that will allow us to delete and update*/}
								<input type="submit" value="Delete" />
							</form>
							<p>
								Last updated: {new Date(tweet.updatedAt).toLocaleDateString()}
							</p>
						</li>
					);
				})}
			</ul>
		</DefaultLayout>
	);
}
module.exports = Main;
