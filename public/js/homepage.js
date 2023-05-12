// hammerjs

let allCards = document.querySelectorAll('.userCard')

function initCards(card, index) {
    let newCards = document.querySelectorAll('.userCard:not(.removed')

    newCards.forEach((card, index) => {
        card.style.zIndex = allCards.length - index;
        card.style.transform = 'scale(' + (10 - index) / 10 + ') translateY(-' + 60 * index + 'px)';
        card.style.opacity = (10 - index) / 10;
    })

    document.querySelector('.users').classList.add('loaded')
}

initCards();

allCards.forEach((el) => {
    let hammerjs = new Hammer(el)

    hammerjs.on('pan', (event) => {
        el.classList.add('moving')
    })

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

    hammerjs.on('panend', (event) => {
        el.classList.remove('moving')

        let moveOutWidth = document.body.clientWidth
        let keepCard = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        event.target.classList.toggle('removed', !keepCard)

        if (keepCard) {
            event.target.style.transform = '';
        } else {
            let endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
            let toX = event.deltaX > 0 ? endX : -endX;
            let endY = Math.abs(event.velocityY) * moveOutWidth;
            let toY = event.deltaY > 0 ? endY : -endY;
            let xDisplacement = event.deltaX * 0.03;
            let yDisplacement = event.deltaY / 80;
            let rotate = xDisplacement * yDisplacement;

            event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
            initCards()

            if(toX > 0) {
                const connect_id = event.target.querySelector('[data-id]').dataset.id

                const response = fetch('/api/match/', {
                    method: 'POST',
                    body: JSON.stringify({connect_id}),
                    headers: { "Content-Type": "application/json" }
                })
        
                if (!response.status == 200) {
                    alert(`Please try again \n Error: ${response.statusText}`)
                }
            }

        }
    })
})