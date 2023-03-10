

let form = document.querySelector('form')
let submitButton = document.querySelector('button[type=submit]')
let error = document.querySelector('.error')
let results = document.querySelector('.result_container')

form.children[0].children[0].addEventListener('click', () => {
  form.children[0].children[0].style.background = ''
  form.children[0].children[0].style.border = ''
  error.style.display = 'none'
})

submitButton.addEventListener('click', async (e) => {
  e.preventDefault()

  if (!form.children[0].children[0].value) {
    form.children[0].children[0].style.background = '#ff8b8b'
    form.children[0].children[0].style.border = '2px solid red'
    error.style.display = 'block'
    return null;
  }

  let num = 10


  if (form.children[1].value) {
    num = form.children[1].value
  }

  let sub = form.children[0].children[0].value
  let res = []
  results.replaceChildren()



  await fetch(`https://api.github.com/search/repositories?q=${sub}&per_page=${num}&sort=stars&order=desc`)
    .then(response => response.json())
    .then(data => {
      res = data.items
    })
    .catch(error => console.error(error))


  if (res.length == 0) {
    document.querySelector('.total').innerHTML = `Ничего не найдено. Попробуйте изменить запрос`
  } else if (res.length != num) {
    document.querySelector('.total').innerHTML = `${res.length} из ${res.length} репозиториев`
  } else {
    document.querySelector('.total').innerHTML = `${res.length} из 100 репозиториев`
  }


  res.forEach((repo) => {
    let divRepo = document.createElement('div')
    divRepo.className = 'repo'

    let divImg = document.createElement('div')
    divImg.className = 'img'
    divImg.style.background = `url(${repo.owner.avatar_url})`
    divImg.style.backgroundPosition = `center`
    divImg.style.backgroundRepeat = `no-repeat`
    divImg.style.backgroundSize = `cover`

    divRepo.appendChild(divImg)

    let divInfo = document.createElement('div')
    divInfo.className = 'info'

    let aUrl = document.createElement('a')
    aUrl.href = repo.owner.html_url
    aUrl.target = '_blank'
    aUrl.innerHTML = repo.html_url
    divInfo.appendChild(aUrl)

    let h2Name = document.createElement('h2')
    h2Name.className = 'name'
    h2Name.innerHTML = `Owner: <span>${repo.owner.login}</span>`
    divInfo.appendChild(h2Name)

    let h3Score = document.createElement('h3')
    h3Score.className = 'score'
    h3Score.innerHTML = `Stars: ${repo.stargazers_count}`
    divInfo.appendChild(h3Score)

    divRepo.appendChild(divInfo)
    results.appendChild(divRepo)
  })

})
