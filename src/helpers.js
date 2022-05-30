const fs = require('fs');
const path = require('path');
const marked = require('marked');
const decode = require('html-entities').decode;

let postDateFormat = /^\d{4}\-\d{2}\-\d{2}\-?/;

// Generate the "nice to read" version of date
let getPostDate = (slug) => {
	if (postDateFormat.test(slug.slice(0, 10))){
		let monthSlice = slug.slice(5, 7);
		let month = "";
		switch (monthSlice){
			case "01": month = "January"; break;
			case "02": month = "February"; break;
			case "03": month = "March"; break;
			case "04": month = "April"; break;
			case "05": month = "May"; break;
			case "06": month = "June"; break;
			case "07": month = "July"; break;
			case "08": month = "August"; break;
			case "09": month = "September"; break;
			case "10": month = "October"; break;
			case "11": month = "November"; break;
			case "12": month = "December"; break;
			default: console.warn(`"${monthSlice}" in "${slug}" is not a valid month! Please double-check so that it will display properly.`);
		}

		// Generate ordinal form (1st, 2nd, etc)
		let daySlice = slug.slice(8, 10);
		let day = "";
		if (daySlice.slice(-1) === "1" && daySlice !== "11"){ day = daySlice+"st"; }
		else if (daySlice.slice(-1) === "2" && daySlice !== "12"){ day = daySlice+"nd"; }
		else if (daySlice.slice(-1) === "3" && daySlice !== "13"){ day = daySlice+"rd"; }
		else { day = daySlice+"th"; }
		
		return `${month} ${day}, ${slug.slice(0,4)}`;
	} else {
		return "";
	}
}

// Get the readable post name. E.g. changes "2020-10-10-My-First-Post.html" to "My First Post", or grabs a custom title from the first line if it exists.
let getPostTitle = (slug, file) => {
	let firstLine = fs.readFileSync(file).toString().split('\n')[0];
	if (/^<title>.*<\/title>$/.test(firstLine)){
		return firstLine.replace(/^<title>(.*)<\/title>$/, '$1');
	} else {
		if (postDateFormat.test(slug.slice(0, 10))){
			return slug.slice(11).replace(/-/g, ' ');
		} else {
			return slug.replace(/-/g, ' ');
		}
	}
}

let getPostContents = (file) => {
	let contents = fs.readFileSync(file).toString();

	// Parse markdown if it has the proper file extension
	if (file.slice(-3) === '.md'){
		contents = marked.parse(contents);
	}

	// Remove custom title if it exists
	let firstLine = contents.split('\n')[0];
	if (/^<title>.*<\/title>$/.test(firstLine)){
		contents = contents.split('\n').slice(1).join('\n');
	}

	return contents;
}

// Fetch post contents from cache, or generate and store it if missing.
let cachePostContents = (file, cache) => {
	let body = cache.get(file);
	if (!body){
		body = getPostContents(file);
		cache.set(file, body);
	}
	return body;
}

let getPostSummary = (contents, truncateAt) => {
	// Take post contents -> Remove HTML tags -> Remove blank lines -> Remove spaces from start and end of each line -> Decode HTML encoded symbols -> Join lines with 2 spaces in between
	let text = contents.replace(/<[^>]+>/g, '').split('\n').filter(line => line.length > 0).map(line => decode(line.replace(/(^\s+|\s+$)/g, ''))).join('  ');

	// Cut length if needed and add ellipsis (280 characters total or whatever you specify in the config)
	truncateAt = truncateAt || 280
	if (text.length > truncateAt-3){
		return text.slice(0, truncateAt-3) + '...';
	}
	return text;
}

let getPostList = () => {
	let files = fs.readdirSync('posts').reverse();
	let posts = [];
	for (var file of files){
		let fileExtPos = file.lastIndexOf('.');
		let slug = file.slice(0, fileExtPos); // shortened path used for the URL
		file = path.join('posts', file); // the complete file path including extension

		posts.push({
			slug, file,
			title: getPostTitle(slug, file),
			date: slug.slice(0, 10),
			niceDate: getPostDate(slug)
		});
	}
	return posts;
}

let getIndex = (slug, posts) => {
	let index = -1;
	for (var i=0; i < posts.length; i++){
		if (posts[i].slug === slug){
			index = i;
			break;
		}
	}
	return index;
}

module.exports = {
	getPostDate,
	getPostTitle,
	getPostContents,
	cachePostContents,
	getPostSummary,
	getPostList,
	getIndex,
}
