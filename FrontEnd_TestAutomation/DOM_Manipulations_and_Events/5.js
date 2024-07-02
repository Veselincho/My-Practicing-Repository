window.addEventListener('load', solution);

function solution() {
  //Initial arrange
  let employeeField = document.querySelector('#employee')
  let categoryField = document.querySelector('#category')
  let teamField = document.querySelector('#team')
  let urgencyField = document.querySelector('#urgency')
  let descriptionField = document.querySelector('#description')

  let previewField = document.querySelector('.preview-list')
  let pendingField = document.querySelector('.pending-list')
  let resolveField = document.querySelector('.resolved-list')


  let addButton = document.querySelector('#add-btn')

  addButton.addEventListener('click', onNext)

  function onNext(e) {
    e.preventDefault();

      if (employeeField.value == '' ||
        categoryField.value == '' ||
        teamField.value == '' ||
        urgencyField.value == '' ||
        descriptionField.value == ''
      ) {
        return
      }

      let liElement = document.createElement('li')
      liElement.setAttribute('class', 'problem-content')

      let articleElement = document.createElement('article')

      let editButton = document.createElement('button')
      editButton.textContent = 'Edit'
      editButton.setAttribute('class', 'edit-btn')

      let continueButton = document.createElement('button')
      continueButton.textContent = 'Continue'
      continueButton.setAttribute('class', 'continue-btn')


      let employeePar = document.createElement('p')
      employeePar.textContent = `Employee: ${employeeField.value}`

      let categoryPar = document.createElement('p')
      categoryPar.textContent = categoryField.value

      let teamPar = document.createElement('p')
      teamPar.textContent = teamField.value

      let urgencyPar = document.createElement('p')
      urgencyPar.textContent = urgencyField.value

      let descriptionPar = document.createElement('p')
      descriptionPar.textContent = descriptionField.value

      articleElement.appendChild(employeePar)
      articleElement.appendChild(categoryPar)
      articleElement.appendChild(teamPar)
      articleElement.appendChild(urgencyPar)
      articleElement.appendChild(descriptionPar)

      liElement.appendChild(articleElement)
      liElement.appendChild(editButton)
      liElement.appendChild(continueButton)


      previewField.appendChild(liElement)
      addButton.disabled = true;

      //saving vars
      let edittedemployeeField = employeeField.value
      let edittedCat = categoryField.value
      let edittedTeam = teamField.value
      let edittedUrg = urgencyField.value
      let edittedDescr = descriptionField.value

      employeeField.value = ''
      categoryField.value = ''
      teamField.value = ''
      urgencyField.value = ''
      descriptionField.value = ''



      editButton.addEventListener('click', onEdit)
      function onEdit(){
      addButton.disabled = false;

      employeeField.value = edittedemployeeField;
      categoryField.value = edittedCat
      teamField.value = edittedTeam
      urgencyField.value = edittedUrg
      descriptionField.value = edittedDescr

      liElement.remove();
      }

      continueButton.addEventListener('click', onContinue)
      function onContinue(){
        addButton.disabled = false;


        let liElementContinue = document.createElement('li')
        liElementContinue.setAttribute('class', 'problem-content')

        let articleElementContinue = document.createElement('article')
        articleElementContinue = articleElement

        let resolveButton = document.createElement('button')
        resolveButton.setAttribute('class', 'resolve-btn')
        resolveButton.textContent = 'Resolve'

        liElementContinue.append(articleElement)
        liElementContinue.append(resolveButton)

        liElement.remove();

        pendingField.appendChild(liElementContinue)

        resolveButton.addEventListener('click', onResolve)
        function onResolve(){
          addButton.disabled = false;


          let liElementResolve = document.createElement('li')
          liElementResolve.setAttribute('class', 'problem-content')

          let articleElementResolve = document.createElement('article')
          articleElementResolve = articleElementContinue
          
          let clearButton = document.createElement('button')
          clearButton.setAttribute('class', 'clear-btn')
          clearButton.textContent = 'Clear'
          
         
          liElementResolve.append(articleElementResolve)
          liElementResolve.append(clearButton)

          resolveField.append(liElementResolve)

          liElementContinue.remove();

          clearButton.addEventListener('click', reset)
          function reset(){
            liElementResolve.remove()
          }


        }



      }

      
    }


  }