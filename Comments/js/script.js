
let commentsContainer = document.querySelector('.comments_container')
let form = document.querySelector('form')
let errors = document.querySelectorAll('.error')
let submitButton = document.querySelector('button[type=submit]')

let globalDate = new Date()

let comList = ['Комментарий', 'Комментария', 'Комментариев']

document.querySelector('.count-span').textContent = `${0} ${declOfNum(0, comList)}`

let inputName = form.attributes[0].ownerElement[0]
inputName.addEventListener('click', () => {
  inputName.style.border = ''
  inputName.style.background = ''
  errors[0].style.display = 'none'
})

let inputComment = form.attributes[0].ownerElement[1]
inputComment.addEventListener('click', () => {
  inputComment.style.border = ''
  inputComment.style.background = ''
  errors[1].style.display = 'none'
})

submitButton.addEventListener('click', (e) => {
  e.preventDefault()
  let nickFlag = true
  let commentFlag = true

  let nickName = inputName.value
  let comment = form.attributes[0].ownerElement[1].value
  let date = form.attributes[0].ownerElement[2].value

  let countSpan = document.querySelector('.count-span')

  if (date) {
    let day = date.slice(8)
    let month = date.slice(5, 7)
    let year = date.slice(0, 4)
    let nowDay = globalDate.getDate()
    let nowMonth = globalDate.getMonth() + 1
    let nowYear = globalDate.getFullYear()
    if (nowDay - day == 1 && nowMonth == month && nowYear == year) {
      date = `вчера, ${globalDate.getHours()}:${globalDate.getMinutes() < 10 ? '0' + globalDate.getMinutes() : globalDate.getMinutes()}`
    } else if (nowDay - day == 0 && nowMonth == month && nowYear == year) {
      date = `сегодня, ${globalDate.getHours()}:${globalDate.getMinutes() < 10 ? '0' + globalDate.getMinutes() : globalDate.getMinutes()}`
    } else {
      date = `${date}, ${globalDate.getHours()}:${globalDate.getMinutes() < 10 ? '0' + globalDate.getMinutes() : globalDate.getMinutes()}`
    }
  }

  if (!date) {
    let now = new Date()
    date = `сегодня, ${now.getHours()}:${now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()}`
  }

  if (!nickName && !comment) {
    inputName.style.border = '2px solid red'
    inputName.style.background = '#ff8b8b'

    errors[0].style.display = 'block'
    nickFlag = false
    inputComment.style.border = '2px solid red'
    inputComment.style.background = '#ff8b8b'
    errors[1].style.display = 'block'
    commentFlag = false
  } else if (!nickName) {
    inputName.style.border = '2px solid red'
    inputName.style.background = '#ff8b8b'
    errors[0].innerHTML = 'Поле не может быть пустым'
    errors[0].style.display = 'block'
    nickFlag = false
  } else if (!comment) {
    inputComment.style.border = '2px solid red'
    inputComment.style.background = '#ff8b8b'
    errors[1].style.display = 'block'
    commentFlag = false
  } else if (!nickName[0].match(/[a-zA-ZА-Яа-я]/i)) {
    inputName.style.border = '2px solid red'
    inputName.style.background = '#ff8b8b'
    errors[0].innerHTML = 'Имя должно начинаться с буквы'
    errors[0].style.display = 'block'
    nickFlag = false
  } else if (nickName.length < 2) {
    inputName.style.border = '2px solid red'
    inputName.style.background = '#ff8b8b'
    errors[0].innerHTML = 'Имя должно быть длинее двух символов'
    errors[0].style.display = 'block'
    nickFlag = false
  }

  if (nickFlag && commentFlag) {

    let divComment = document.createElement('div')
    divComment.className = 'comment'

    let divAvatar = document.createElement('div')
    divAvatar.className = 'avatar'
    divAvatar.innerHTML = nickName[0].toUpperCase()

    divComment.appendChild(divAvatar)

    let divCommentInfo = document.createElement('div')
    divCommentInfo.className = 'comment_info'

    let divCommentInfoTop = document.createElement('div')
    divCommentInfoTop.className = 'comment_info-top'

    let divName = document.createElement('div')
    divName.className = 'name'
    divName.innerHTML = nickName
    divCommentInfoTop.appendChild(divName)
    let divDelete = document.createElement('div')
    divDelete.className = 'delete'
    let imgDelete = document.createElement('img')
    imgDelete.className = 'delete-img'
    imgDelete.src = '../img/delete.svg'
    divDelete.appendChild(imgDelete)
    divCommentInfoTop.appendChild(divDelete)

    divCommentInfo.appendChild(divCommentInfoTop)

    let divDate = document.createElement('div')
    divDate.className = 'date'
    divDate.innerHTML = date

    divCommentInfo.appendChild(divDate)

    let pCommentText = document.createElement('p')
    pCommentText.className = 'comment-text'
    pCommentText.innerHTML = comment

    divCommentInfo.appendChild(pCommentText)

    let divLike = document.createElement('div')
    divLike.className = 'like'

    let imgLike = document.createElement('img')
    imgLike.src = '../img/favorite.svg'
    divLike.appendChild(imgLike)

    divCommentInfo.appendChild(divLike)

    divComment.appendChild(divCommentInfo)

    commentsContainer.appendChild(divComment)

    let value = countSpan.textContent.split(' ')[0];
    +value;
    value++;
    countSpan.textContent = `${value} ${declOfNum(value, comList)}`
    if (!commentsContainer.attributes[0].ownerElement.children.length == 1) {
      countSpan.textContent = `${1} ${declOfNum(1, comList)}`
    }



    imgLike.addEventListener('click', (e) => {
      if (e.target.classList.value == 'active') {
        e.target.classList.remove('active')
      } else {
        e.target.classList.add('active')
        e.target.style.width = '30px'
      }
    })


    imgDelete.addEventListener('click', (e) => {
      commentsContainer.removeChild(e.target.attributes[0].ownerElement.parentElement.parentElement.parentElement.parentElement)
      let countSpan = document.querySelector('.count-span')
      let value = countSpan.textContent.split(' ')[0];
      +value;
      value--;
      countSpan.textContent = `${value} ${declOfNum(value, comList)}`
    })
  }
})



function declOfNum(n, text_forms) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) { return text_forms[2]; }
  if (n1 > 1 && n1 < 5) { return text_forms[1]; }
  if (n1 == 1) { return text_forms[0]; }
  return text_forms[2];
}