window.addEventListener("load", solve);

function solve() {
  let snowmanNameElement = document.getElementById("snowman-name");
  let snowmanHeightElement = document.getElementById("snowman-height");
  let locationElement = document.getElementById("location");
  let creatorNameElement = document.getElementById("creator-name");
  let attributeElement = document.getElementById("special-attribute");
  let addbtnElement = document.querySelector(".add-btn");
  let snowListElement = document.querySelector(".snowman-preview");
  let showSnowmanElement = document.querySelector(".snow-list");
  let main = document.getElementById("hero");
  let bodyElement = document.querySelector(".body");
  let backImg = document.getElementById('back-img');

  addbtnElement.addEventListener("click", onAdd);

  function onAdd(e) {
    e.preventDefault();
    if (
      snowmanNameElement.value == "" ||
      snowmanHeightElement.value == "" ||
      locationElement.value == "" ||
      creatorNameElement.value == "" ||
      attributeElement.value == ""
    ) {
      return;
    }

    let articleElementInfo = document.createElement("article");
    let liElementInfo = document.createElement("li");
    liElementInfo.setAttribute("class", "snowman-info");
    let btnContainer = document.createElement("div");
    btnContainer.setAttribute("class", "btn-container");

    let snowmanName = document.createElement("p");
    snowmanName.textContent = `Name: ${snowmanNameElement.value}`;

    let snowmanHeght = document.createElement("p");
    snowmanHeght.textContent = `Height: ${snowmanHeightElement.value}`;

    let location = document.createElement("p");
    location.textContent = `Location: ${locationElement.value}`;

    let creator = document.createElement("p");
    creator.textContent = `Creator: ${creatorNameElement.value}`;

    let attribute = document.createElement("p");
    attribute.textContent = `Attribute: ${attributeElement.value}`;

    let editBtn = document.createElement("button");
    editBtn.setAttribute("class", "edit-btn");
    editBtn.textContent = "Edit";

    let nextBtn = document.createElement("button");
    nextBtn.setAttribute("class", "next-btn");
    nextBtn.textContent = "Next";

    articleElementInfo.appendChild(snowmanName);
    articleElementInfo.appendChild(snowmanHeght);
    articleElementInfo.appendChild(location);
    articleElementInfo.appendChild(creator);
    articleElementInfo.appendChild(attribute);

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(nextBtn);

    liElementInfo.appendChild(articleElementInfo);
    liElementInfo.appendChild(btnContainer);

    snowListElement.appendChild(liElementInfo);

    let editedSnowmanName = snowmanNameElement.value;
    let editedHeght = snowmanHeightElement.value;
    let editedLocation = locationElement.value;
    let editedCreator = creatorNameElement.value;
    let editedAttribute = attributeElement.value;

    snowmanNameElement.value = "";
    snowmanHeightElement.value = "";
    locationElement.value = "";
    creatorNameElement.value = "";
    attributeElement.value = "";

    addbtnElement.disabled = true;

    editBtn.addEventListener("click", onEdit);

    function onEdit() {
      snowmanNameElement.value = editedSnowmanName;
      snowmanHeightElement.value = editedHeght;
      locationElement.value = editedLocation;
      creatorNameElement.value = editedCreator;
      attributeElement.value = editedAttribute;

      liElementInfo.remove();
      addbtnElement.disabled = false;
    }

    nextBtn.addEventListener("click", onNext);

    function onNext() {
      let article = document.createElement('article')

      let snowManName = document.createElement('p')
      snowManName = snowmanName

      let snowManHeight = document.createElement('p')
      snowManHeight = snowmanHeght

      let snowManLocation = document.createElement('p')
      snowManLocation = location

      let snowmanCreator = document.createElement('p')
      snowmanCreator = creator

      let snowmanAtt = document.createElement('p')
      snowmanAtt = attribute

      let sendButton = document.createElement('button')
      sendButton.setAttribute('class', 'send-btn')
      sendButton.textContent = 'Send'

      article.style.display = 'flex'
      article.append(snowManName, snowManHeight, snowManLocation, snowmanCreator, snowmanAtt, sendButton)
      showSnowmanElement.append(article)

      sendButton.addEventListener('click', onDone)
      function onDone() {
        main.remove();
        backImg.hidden = false;
        let backButton = document.createElement('button');
        backButton.textContent = 'Back'
        bodyElement.append(backButton)

        backButton.addEventListener('click', onReload)
        function onReload() {
          window.location.reload();
        }

      }

    }

  }
}
