var id;
var url;
var img;
var notes = 0;
var totalNotes = 0;
var total = 10000;


$.ajax({
	url: "http://api.tumblr.com/v2/blog/femme-de-lettres.tumblr.com/posts?api_key=mkdH2Jxsmj7Ha7DG8BmlrmCPk1su0PE7ioBfARmftmS6ykluJK&reblog_info=true&notes_info=true",
	dataType: 'jsonp',
	success: function(results, status, xhr){
		document.getElementById("BlogName").innerHTML = results.response.blog.title;
		document.getElementById("BlogPosts").innerHTML = results.response.blog.posts + " posts, with 47,596 followers";
		total = results.response.blog.posts;
		processPosts(results.response.posts, 0);
	}
});


function processPosts(posts, offset) {
	for (i = 0; i < posts.length; i++) {
		totalNotes += posts[i].note_count;
		if (posts[i].note_count > notes) {
			id = posts[i].id;
			url = posts[i].post_url;
			notes = posts[i].note_count;
			img = posts[i].photos[0].alt_sizes[0].url;
		}
	}
	if ((offset + 1)*20 < total) {
		$.ajax({
			url: "http://api.tumblr.com/v2/blog/femme-de-lettres.tumblr.com/posts?api_key=mkdH2Jxsmj7Ha7DG8BmlrmCPk1su0PE7ioBfARmftmS6ykluJK&reblog_info=true&notes_info=true&offset=" + (offset + 1)*20,
			dataType: 'jsonp',
			success: function(results, status, xhr){
				processPosts(results.response.posts, (offset + 1));
			}
		});
	} else {
		document.getElementById("BlogSamplePost").innerHTML = "<a href='" + url + "' target='_blank'><img src='" + img + "' alt='sample blog post image' id='blogsample'>";
		document.getElementById("BlogPostStats").innerHTML = "The post about the above image <br />received " + notes + " likes and responses";
		document.getElementById("loading").style.display = "none";
	}
}