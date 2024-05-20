const form = document.querySelector('#searchForm')

const container = document.querySelector('#container')

const subContainer = document.querySelector('#sub_container')


form.addEventListener('submit', async function (e) {
    e.preventDefault()

    const userInput = form.elements.query.value

    subContainer.innerText = '';

    // whatever we add in params object, will be added automatically to the query string. 

    const config = { params: { q: userInput } }
    const req = await axios.get(`https://api.tvmaze.com/search/shows`, config)

    showPosters(req)
    form.elements.query.value = ''
})


const showPosters = (req) => {
    for (let i = 0; i < req.data.length; i++) {
        const img = document.createElement('IMG')
        img.src = req.data[i].show.image.medium
        img.classList.add('img_display')
        subContainer.append(img)


        const div2 = document.createElement('DIV')

        const span = document.createElement('span')
        span.append(`Rating: ${parseFloat(req.data[i].score * 10).toPrecision(3)}/10`)
        span.classList.add('span')
        div2.append(span)


        const span2 = document.createElement('span')
        span2.append(`Language: ${req.data[i].show.language}`)
        span2.classList.add('span')
        div2.append(span2)


        const p = document.createElement('p')
        p.innerHTML = req.data[i].show.summary
        p.classList.add('p')
        div2.append(p)

        div2.classList.add('display')
        subContainer.append(div2)

        container.append(subContainer)
    }
}


