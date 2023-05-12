// match functionality

const matchFunction = (id) => {
    let connect_id = id
    const response = fetch('/api/match/', { // make a POST request to '/api/match/'
        method: 'POST',
        body: JSON.stringify({connect_id}), // send 'connect_id' in the request body
        headers: { "Content-Type": "application/json" }
    })
     // if the response status is not 200 (OK), show an alert with the error message
    if (!response.status == 200) {
        alert(`Please try again \n Error: ${response.statusText}`)
    }
}


// hammerjs
// initialize the card deck
let allCards = document.querySelectorAll('.userCard')

function initCards(card, index) {
    let newCards = document.querySelectorAll('.userCard:not(.removed')

    newCards.forEach((card, index) => { // Set the stacking order of cards
        card.style.zIndex = allCards.length - index; // set the z-index of each card
        card.style.transform = 'scale(' + (10 - index) / 10 + ') translateY(-' + 60 * index + 'px)'; // set the scale and vertical position of each card
        card.style.opacity = (10 - index) / 10; // set the opacity of each card
    })

    document.querySelector('.users').classList.add('loaded') // add the 'loaded' class to the 'users' element
}

initCards(); // initialize the card deck

// add HammerJS listeners to each card
allCards.forEach((el) => {
    let hammerjs = new Hammer(el)

    // when a user starts dragging a card, add the 'moving' class to the card
    hammerjs.on('pan', (event) => {
        el.classList.add('moving')
    })
    // when a user drags a card, adjust its position and rotation
    hammerjs.on('pan', (event) => {
        if (event.deltaX === 0) {
            return;
        }

        if (event.center.x === 0 && event.center.y === 0) {
            return;
        }

        let xDisplacement = event.deltaX * 0.1
        let yDisplacement = event.deltaY / 80
        let cardRotation = xDisplacement * yDisplacement

        event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + cardRotation + 'deg)';
    })

    // when a user finishes dragging a card, remove the 'moving' class and determine if the card should be kept or discarded
    hammerjs.on('panend', (event) => {
        el.classList.remove('moving')
        // Determine if the card should be kept or discarded
        const moveOutWidth = document.body.clientWidth
        let keepCard = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        // Toggle the 'removed' class on the card depending on whether it should be kept or discarded
        event.target.classList.toggle('removed', !keepCard)

         // if the card should be kept, reset its position and scale
        if (keepCard) {
            event.target.style.transform = '';
        } else {
              // if the card should be discarded, calculate the position and rotation for the discard animation
            let endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
            let toX = event.deltaX > 0 ? endX : -endX;
            let endY = Math.abs(event.velocityY) * moveOutWidth;
            let toY = event.deltaY > 0 ? endY : -endY;
            let xDisplacement = event.deltaX * 0.03;
            let yDisplacement = event.deltaY / 80;
            let rotate = xDisplacement * yDisplacement;

            // Apply the ending position and rotation to the card
            event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
            initCards()

             // Reinitialize the cards to create the cascade effect
            if(toX > 0) {
                const connect_id = event.target.querySelector('[data-id]').dataset.id

                matchFunction(connect_id)
            }

        }
    })
})

// Event listener for the like and dislike buttons

document.querySelector('.users').addEventListener('click', (event) => {
    event.stopPropagation(); // Stop the event from bubbling up to parent elements

    let userCards = document.querySelectorAll('.userCard:not(.removed)') // Get all the user cards that are not marked as removed
    const moveOutWidth = document.body.clientWidth// Calculate the width of the window
    let card; // Initialize a variable to store the card that was clicked on

    // Iterate over all the user cards to find the one that was clicked on
    for (let x=0;x<userCards.length;x+=1) {
        if ((event.target === userCards[x].children[1].children[0].children[0]) || (event.target === userCards[x].children[1].children[0].children[1])) {
            card = userCards[x]
            break;
        }
    }

    // If the like button was clicked, call the 'matchFunction', mark the card as removed, and move it off the screen
    if (event.target.dataset.like) {
        const connect_id = event.target.dataset.like
        matchFunction(connect_id)

        // If there are no more user cards, return
        if (!userCards.length) {
            return;
        }

        // Mark the card as removed and move it off the screen
        card.classList.add('removed')
        card.style.transform = `translate(${moveOutWidth}px)`


        // Initialize the next card
        initCards();
    } else if (event.target.dataset.dislike) { // If the dislike button was clicked, mark the card as removed and move it off the screen
        card.classList.add('removed')
        card.style.transform = `translate(-${moveOutWidth}px)` // Move the card off the screen to the left by setting the 'transform' property to a negative value of 'moveOutWidth' pixels.
        initCards();
    }
})

