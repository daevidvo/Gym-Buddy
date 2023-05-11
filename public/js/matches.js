const matchesListButton = async (event) => {
    event.stopPropagation();

    document.location.replace(`/matches/${event.target.dataset.match_id}`)
}

document.querySelector('.matchesList').addEventListener('click', matchesListButton)