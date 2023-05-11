const matchesListButton = async (event) => {
    event.stopPropagation();

    console.log(event.target.dataset.match_id)

    document.location.replace(`/matches/${event.target.dataset.match_id}`)
}

document.querySelector('.matchesList').addEventListener('click', matchesListButton)