// Assumes that all author elements from the Flickr API
// have the format of 'email@example.com ("FirstName LastName")'
function getAuthorName(authorData) {
  return authorData.split(" (\"")[1].replace("\")", "")
}

export default getAuthorName;
