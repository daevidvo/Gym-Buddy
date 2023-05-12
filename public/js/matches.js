// This code block creates a function named "matchesListButton" that is called when the user clicks a match item on the "matchesList" element. It redirects the user to the match details page for the selected match.
const matchesListButton = async (event) => {
    event.stopPropagation(); // Stop the event from bubbling up the DOM tree

    // Redirect the user to the match details page for the selected match using the match ID stored in the data attribute of the clicked element
    document.location.replace(`/matches/${event.target.dataset.match_id}`)
}
// Example usage: Add an event listener to the "matchesList" element that calls the matchesListButton function when a match item is clicked
document.querySelector('.matchesList').addEventListener('click', matchesListButton)