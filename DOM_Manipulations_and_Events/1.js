window.addEventListener("load", solve);

function solve() {
    // initial arrange
    let ticketsNumberElement = document.getElementById('num-tickets')
    let seatingPreferenceElement = document.getElementById('seating-preference')
    let fullNameElement = document.getElementById('full-name')
    let emailElement = document.getElementById('email')
    let phoneNumberElement = document.getElementById('phone-number')

    let purchaseTicketsButton = document.getElementById('purchase-btn')

    let ticketPreviewElement = document.getElementById('ticket-preview')
    let ticketPurchatedElement = document.getElementById('ticket-purchase')
    let bottomContent = document.querySelector('body > div')

    purchaseTicketsButton.addEventListener('click', onPurchase)
    function onPurchase(e) {
        e.preventDefault();
        //Check for 1 or more empty input
        if (ticketsNumberElement.value == '' ||
            seatingPreferenceElement.value == '' ||
            fullNameElement.value == '' ||
            emailElement.value == '' ||
            phoneNumberElement.value == ''
        ) {
            return;
        }

        let ticketsPar = document.createElement('p')
        ticketsPar.textContent = `Count: ${ticketsNumberElement.value}`

        let seatingPrefPar = document.createElement('p')
        seatingPrefPar.textContent = `Preference: ${seatingPreferenceElement.value}`

        let fullNamePar = document.createElement('p')
        fullNamePar.textContent = `To: ${fullNameElement.value}`

        let emailPar = document.createElement('p')
        emailPar.textContent = `Email: ${emailElement.value}`

        let phoneNumPar = document.createElement('p')
        phoneNumPar.textContent = `Phone Number: ${phoneNumberElement.value}`

        let firstArticle = document.createElement('article')

        let firstLiElement = document.createElement('li')
        firstLiElement.setAttribute('class', 'ticket-purchase')

        let editButton = document.createElement('button')
        editButton.setAttribute('class', 'edit-btn')
        editButton.textContent = 'Edit'

        let nextButton = document.createElement('button')
        nextButton.setAttribute('class', 'next-btn')
        nextButton.textContent = 'Next'

        let firstDivContainer = document.createElement('div')
        firstDivContainer.setAttribute('class', 'btn-container')
        firstDivContainer.append(editButton, nextButton)

        //appening all chields
        firstArticle.append(ticketsPar, seatingPrefPar, fullNamePar, emailPar, phoneNumPar)
        firstLiElement.append(firstArticle, firstDivContainer)
        ticketPreviewElement.append(firstLiElement)

        //disabling
        purchaseTicketsButton.disabled = true;

        //saving vars
        let savedTicketsPar = ticketsNumberElement.value
        let savedSeatingPar = seatingPreferenceElement.value
        let savedFullNamePar = fullNameElement.value
        let savedEmailPar = emailElement.value
        let savedPhoneNumberPar = phoneNumberElement.value

        //clear input info
        ticketsNumberElement.value = ''
        seatingPreferenceElement.value = ''
        fullNameElement.value = ''
        emailElement.value = ''
        phoneNumberElement.value = ''


        editButton.addEventListener('click', onEdit)
        function onEdit() {
            purchaseTicketsButton.disabled = false;

            ticketsNumberElement.value = savedTicketsPar
            seatingPreferenceElement.value = savedSeatingPar
            fullNameElement.value = savedFullNamePar
            emailElement.value = savedEmailPar
            phoneNumberElement.value = savedPhoneNumberPar

            firstLiElement.remove()

        }

        nextButton.addEventListener('click', onNext)
        function onNext(){
            purchaseTicketsButton.disabled = true;

            let secondLiElement = document.createElement('li')
            secondLiElement.setAttribute('class', 'ticket-purchase')

            let secondArticle = document.createElement('article')
            secondArticle = firstArticle

            firstLiElement.remove()

            let buyButton = document.createElement('button')
            buyButton.setAttribute('class', 'buy-btn')
            buyButton.textContent = 'Buy'

            secondArticle.append(buyButton)

            secondLiElement.append(secondArticle)
            ticketPurchatedElement.append(secondLiElement)

            buyButton.addEventListener('click', onBuy)
            function onBuy(){
                secondLiElement.remove()
                ticketPreviewElement.remove();
                ticketPurchatedElement.remove();

                let h2 = document.createElement('h2')
                h2.textContent = 'Thank you for your purchase!'

                let backButton = document.createElement('button')
                backButton.setAttribute('class', 'back-btn')
                backButton.textContent = 'Back'

                bottomContent.append(h2, backButton)
                
                backButton.addEventListener('click', onBack)
                function onBack(){
                    window.location.reload();
                }

            }
        }

    }
}