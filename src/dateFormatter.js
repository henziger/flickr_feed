// From https://stackoverflow.com/a/13627586/3693793
function getOrdinal(day) {
  let j = day % 10, k = day % 100;
  if (j === 1 && k !== 11) {
    return day + "st";
  }
  if (j === 2 && k !== 12) {
    return day + "nd";
  }
  if (j === 3 && k !== 13) {
    return day + "rd";
  }
  return day + "th";
}

function formatDate(date) {
  let monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "June", "July",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return getOrdinal(day) + ' ' + monthNames[monthIndex] + ' ' + year + ' at ' + hours + ':' + minutes;
}

export default formatDate;
