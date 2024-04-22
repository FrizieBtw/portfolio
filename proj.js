const filterList = document.querySelectorAll('.filtre')
const retexListElement = document.querySelector('#retexlist')
const retexAff = document.querySelector('.retex-aff')
let actualFilter;
let projList;
let counter = 1;
let nbSchemas = 0;
let track = 0;

async function getProjList() {
    const projFetchResponse = await fetch("proj.json")
    const projList = await projFetchResponse.json()
    return projList
}

function closeOverlay() {
    document.querySelector('.retex-fen').style.display = 'none'
    retexAff.style.display = 'none'
    document.body.style.overflow = 'visible'
    track = 0;
    counter = 1;
}

retexAff.addEventListener('click', (event) => {
    if (!document.querySelector('.retex-fen').contains(event.target)){
        closeOverlay();
    }
})

document.addEventListener('keydown', (event) => {
    const pressedKey = event.key;
    if (pressedKey === 'Escape') {
        closeOverlay();
    }
});

filterList.forEach((element) => {
    element.addEventListener('click', () => {
        filterList.forEach((filter) => {
            filter.style.textDecoration = 'none'  
        })
        actualFilter = element.className.substring(7)
        console.log(actualFilter)
        const retexList = document.querySelectorAll(".retex")
        retexList.forEach((rtx) => {
            if (!rtx.className.includes(actualFilter)) {
                rtx.style.display = 'none'
            } else {
                rtx.style.display = 'flex'
            }
        })
        element.style.textDecoration = 'underline'
    })
})

function imageFromLanguage(language) {
    switch(language.toLowerCase()) {
        case "java":
            return "java.png"
        case "javascript":
        case "js":
            return "js.png"
        case "csharp":
        case "c#":
            return "csharp.png"
        case "html":
            return "html.png"
        case "css":
            return "css.png"
        case "python":
        case "py":
            return "python.png"
        case "bash":
        case "sh":
        case "shell":
            return "bash.png"
        case "sf":
        case "symfony":
            return "symfony.png"
        case "androidstudio":
            return "android-studio.png"
        default:
            return ""
    }
}

async function init() {
    projList = (await getProjList()).projects.reverse()
    projList.forEach((project) => {addToHtml(project)})
}

function addToHtml(project) {
    //Création de la div de retex
    projDiv = document.createElement("div")
    //Ajout des class
    classStr = "retex all " + project.context.toLowerCase()
    project.tools.forEach((tool) => {classStr += " " + tool.toLowerCase()})
    projDiv.className = classStr
    //Ajout de l'image de couverture
    projCover = document.createElement("img")
    projCover.loading = "lazy"
    projCover.className = "cover"
    projCover.src = "images/" + project.cover
    projCover.alt = project.name
    projDiv.appendChild(projCover)
    //Création de la barre avec le nom, le contexte et l'année
    projBar = document.createElement("div")
    projBar.className = "name"
    //Ajout de l'image du contexte
    projContext = document.createElement("img")
    projContext.loading = "lazy"
    projContext.src = "images/"
    switch(project.context) {
        case "personal":
            projContext.src += "personnel.svg"
            projContext.alt = "personnel"
            break;
        case "scolar":
            projContext.src += "scolaire.svg"
            projContext.alt = "personnel"
            break;
        default:
            projContext.src += "personnel.svg"
            projContext.alt = "personnel"
            break;
    }
    projBar.appendChild(projContext)
    //Ajout du nom du projet
    projName = document.createElement("p")
    projName.innerText = project.name
    projBar.appendChild(projName)
    //Ajout de l'année du projet
    projYear = document.createElement("p")
    projYear.innerText = project.year
    projBar.appendChild(projYear)
    //Ajout de la barre
    projDiv.appendChild(projBar)
    //Ajout de la prévisualisation du retex à l'affichage
    retexListElement.appendChild(projDiv)
    //Ajout de l'affichage de résumé du projet
    projDiv.addEventListener("click", () => {
        //Suppression de tous les éléments déjà présents dans l'affichage de description du projet
        document.querySelector(".retex-aff").innerText = ""
        //Création de la fenêtre d'affichage
        rtxFenDiv = document.createElement("div")
        rtxFenDiv.className = "retex-fen"
        //Création du schema
        rtxSchemaDiv = document.createElement("div")
        rtxSchemaDiv.className = "schema"
        //Vérification s'il ya plusieurs images de schema
        nbSchemas = project.schema.length
        if (nbSchemas > 1) {
            //Création du carousel avec toutes les images et les boutons de défilement
            schemaCarousel = document.createElement("div")
            schemaCarousel.className = "carousel"
            //Création du conteneur du carousel en lui-même
            rtxCarouselContainer = document.createElement("div")
            rtxCarouselContainer.className = "rtx-carousel-container"
            //Création du conteneur d'imagess
            rtxImageContainer = document.createElement("div")
            rtxImageContainer.className = "rtx-image-container"
            //Ajout de chaque image au conteneur d'images
            project.schema.forEach((schema) => {
                //Création du wrapper d'image
                imgWrapper = document.createElement("div")
                imgWrapper.className = "image-wrapper"
                //Vérification si le schema est le premier du carousel, alors le wrapper est indiqué comme tel
                if (project.schema.indexOf(schema) == 0) {
                    imgWrapper.className += " wrapper-1"
                }
                //Création et ajout de l'image correspondante au wrapper
                imgWrapperImage = document.createElement("img")
                imgWrapperImage.loading = "lazy"
                imgWrapperImage.alt = "Schema " + project.name + " " + (project.schema.indexOf(schema) + 1)
                imgWrapperImage.src = "images/" + schema
                imgWrapperImage.className = "carousel-image"
                imgWrapper.appendChild(imgWrapperImage)
                //Ajout du wrapper au conteneur d'images
                rtxImageContainer.appendChild(imgWrapper)
            })
            //Ajout du conteneur d'images
            rtxCarouselContainer.appendChild(rtxImageContainer)
            //Création du conteneur des boutons de défilement
            carouselButtons = document.createElement("div")
            carouselButtons.className = "carousel-buttons"
            //Création et ajout des deux boutons
            leftButton = document.createElement("button")
            leftButton.className = "carousel-left carousel-button"
            leftButtonImg = document.createElement("img")
            leftButtonImg.loading = "lazy"
            leftButtonImg.src = "images/angle-left-solid.svg"
            leftButtonImg.alt = "Left"
            leftButton.appendChild(leftButtonImg)
            //Ajout de l'eventListener pour le défilement gauche du carousel
            leftButton.addEventListener('click', () => {
                if (counter > 1) {
                    counter--;
                    track = track + 100;
                    document.querySelector('.wrapper-1').style.marginLeft = `${track}%`;
                }
            })
            carouselButtons.appendChild(leftButton)
            rightButton = document.createElement("button")
            rightButton.className = "carousel-right carousel-button"
            rightButtonImg = document.createElement("img")
            rightButtonImg.loading = "lazy"
            rightButtonImg.src = "images/angle-right-solid.svg"
            rightButtonImg.alt = "Right"
            rightButton.appendChild(rightButtonImg)
            //Ajout de l'eventListener pour le défilement droit du carousel
            rightButton.addEventListener('click', () => {
                if (counter < nbSchemas) {
                    counter++;
                    track = track - 100;
                    document.querySelector('.wrapper-1').style.marginLeft = `${track}%`;
                }
            })
            carouselButtons.appendChild(rightButton)
            //Ajout du conteneur de boutons
            rtxCarouselContainer.appendChild(carouselButtons)
            //Ajout du carousel
            schemaCarousel.appendChild(rtxCarouselContainer)
            rtxSchemaDiv.appendChild(schemaCarousel)
        } else {
            //Ajout de l'unique image
            rtxSchemaImg = document.createElement("img")
            rtxSchemaImg.loading = "lazy"
            rtxSchemaImg.alt = "Schema " + project.name
            rtxSchemaImg.src = "images/" + project.schema[0]
            rtxSchemaDiv.appendChild(rtxSchemaImg)
        }
        //Ajout du schema à la fenêtre de description du projet
        rtxFenDiv.appendChild(rtxSchemaDiv)
        document.querySelector(".retex-aff").appendChild(rtxFenDiv)
        //TODO: Création + ajout de: desc. + langages + "voir plus"
        projDescription = document.createElement("div")
        projDescription.className = "pres"
        //Création du texte de description
        projDescriptionTextDiv = document.createElement("div")
        projDescriptionText = document.createElement("p")
        projDescriptionText.innerText = project.description
        projDescriptionTextDiv.appendChild(projDescriptionText)
        //Ajout du texte de la description
        projDescription.appendChild(projDescriptionTextDiv)
        //Création de la division de langages
        languagesDiv = document.createElement("div")
        languagesDiv.className = "langages"
        project.tools.forEach((tool) => {
            imgSrc = "images/" + imageFromLanguage(tool)
            if (imgSrc != "images/") {
                languageImg = document.createElement("img")
                languageImg.loading = "lazy"
                languageImg.alt = tool
                languageImg.src = imgSrc
                languagesDiv.appendChild(languageImg)
            }  
        })
        //Ajout de la division de langages
        projDescription.appendChild(languagesDiv)
        //Ajout de la description à la fenêtre de présentation du projet
        rtxFenDiv.appendChild(projDescription)
        //Création de la div contenant le lien pour en savoir plus
        knowMoreDiv = document.createElement("div")
        knowMoreDiv.className = "plus"
        knowMoreLink = document.createElement("a")
        knowMoreLink.target = "_blank"
        knowMoreLink.href = project.link
        if (project.link.includes("pdf")) {
            knowMoreLink.innerText = "En savoir plus +"
        } else {
            knowMoreLink.innerText = "Voir le projet +"
        }
        knowMoreDiv.appendChild(knowMoreLink)
        rtxFenDiv.appendChild(knowMoreDiv)
        //Affichage de la description de projet
        document.querySelector(".retex-fen").style.display = "flex"
        document.querySelector(".retex-aff").style.display = "flex"
        //Suppression du scroll de la page
        document.body.style.overflow = 'hidden'
    })
}

init()