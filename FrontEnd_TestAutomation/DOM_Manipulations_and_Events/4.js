window.addEventListener('load', solve);

function solve() {
    //initial arrange
    let timeElement = document.getElementById('time')
    let dataElement = document.getElementById('date')
    let placeElement = document.getElementById('place')
    let eventElement = document.getElementById('event-name')
    let contactsElement = document.getElementById('email')

    let lastCheckField = document.querySelector('#check-list')
    let thirdField = document.querySelector('#upcoming-list')
    let lastField = document.querySelector('#finished-list')

    let clearButton = document.getElementById('clear')
    let addButton = document.getElementById('add-btn')

    addButton.addEventListener('click', onAdd)
    function onAdd(e){
        e.preventDefault()
        if(timeElement.value == '' ||
            dataElement.value == '' ||
            placeElement.value == '' ||
            eventElement.value == '' ||
            contactsElement.value == ''
         ){
            return
        }

        let liElement = document.createElement('li')
        liElement.setAttribute('class', 'event-content')
        
        let articleElement = document.createElement('article')

        let timePar = document.createElement('p')
        timePar.textContent = timeElement.value
        
        let datePar = document.createElement('p')
        datePar.textContent = dataElement.value

        let placePar = document.createElement('p')
        placePar.textContent = placeElement.value

        let eventPar = document.createElement('p')
        eventPar.textContent = `Event: ${eventElement.value}`

        let contractPar = document.createElement('p')
        contractPar.textContent = contactsElement.value

        let editButton = document.createElement('button')
        editButton.setAttribute('class', 'edit-btn')
        editButton.textContent = 'Edit'

        let continueButton = document.createElement('button')
        continueButton.setAttribute('class', 'continue-btn')
        continueButton.textContent  = 'Continue'

        //Append
        // all paragraphs to the article
        // buttons to the li
        // article to liElement
        // liElement to field

        articleElement.append(timePar, datePar, placePar, eventPar, contractPar)
        liElement.append(articleElement, editButton, continueButton)
        lastCheckField.append(liElement)

        addButton.disabled = true;

        //saving vars
        let savedTimePar = timeElement.value
        let savedDatePar = dataElement.value
        let savedPlacePar = placeElement.value
        let savedEventPar = eventElement.value
        let savedContractPar = contactsElement.value

        //clear input info
            timeElement.value = '' 
            dataElement.value = '' 
            placeElement.value = '' 
            eventElement.value = '' 
            contactsElement.value = ''

            editButton.addEventListener('click', onEdit)
            function onEdit(){
                addButton.disabled = false;
                timeElement.value = savedTimePar
                dataElement.value =  savedDatePar
                placeElement.value = savedPlacePar
                eventElement.value = savedEventPar
                contactsElement.value = savedContractPar

                liElement.remove()
            }

            continueButton.addEventListener('click', onContinue)
            function onContinue(){
                addButton.disabled = false;

                let liElementSecond = document.createElement('li')
                liElementSecond.setAttribute('class', 'event-content')

                let secondArticle = document.createElement('article')
                secondArticle = articleElement

                let moveToButton = document.createElement('button')
                moveToButton.setAttribute('class', 'finished-btn')
                moveToButton.textContent = 'Move to Finished'

                
                liElementSecond.append(secondArticle, moveToButton)
                thirdField.appendChild(liElementSecond);

                liElement.remove();

                

        

                moveToButton.addEventListener('click', onFinish)
                function onFinish(){   
                         liElement.remove();
                         addButton.disabled = false;
                         let lastLi = document.createElement('li')
                         lastLi.setAttribute('class', 'event-content')

                         let lastArticle = document.createElement('article')
                         lastArticle = secondArticle

                         lastLi.append(lastArticle)
                         lastField.append(lastLi)

                         liElementSecond.remove();

                         clearButton.addEventListener('click', WTF)
                         function WTF(){
                            lastLi.remove();
                         }

                }

                

            }

    }

}


    
    
