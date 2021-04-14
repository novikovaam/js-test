//'use strict'
import 'regenerator-runtime/runtime'

async function getData() {

    const request = await fetch("https://randomuser.me/api/?results=100")
    const res = await request.json()
    const startData = res.results
    const list = document.querySelector('#list')

    const renderList = (user) => {

        const div = document.createElement('wrapper')
        const gender = document.createElement('div')
        const country = document.createElement('div')
        const phone = document.createElement('div')
        const email = document.createElement('div')
        const image = document.createElement('img')
        const name = document.createElement('div')
        const age = document.createElement('div')

        name.innerHTML = user.name.first + ' ' + user.name.last
        gender.innerHTML = 'gender: ' + user.gender
        country.innerHTML = user.location.country
        phone.innerHTML = 'phone number: ' + user.cell
        email.innerHTML = user.email
        image.src = user.picture.medium
        age.innerHTML = 'age: ' + user.dob.age

        div.append(image)
        div.append(name)
        div.append(gender)
        div.append(country)
        div.append(phone)
        div.append(email)
        div.append(age)
        return div
    }

    let rerenderEntirePeoples = (arr = startData) => {
        arr.forEach(user => {
            list.append(renderList(user))
        })
    }
    rerenderEntirePeoples(startData)

    const clearPeopleArr = () => {
        list.innerHTML = '';
    }

    const sortByAgeUp = (arr) => {
        clearPeopleArr()
        const sortArrUp = arr.sort((a, b) => a.dob.age > b.dob.age ? 1 : -1)
        rerenderEntirePeoples(sortArrUp)
        return sortArrUp

    }

    const sortByAgeDown = (arr) => {
        clearPeopleArr()
        const sortArrDown = arr.sort((a, b) => a.dob.age < b.dob.age ? 1 : -1)
        rerenderEntirePeoples(sortArrDown)
        return sortArrDown
    }

    const sortWoman = (arr) => {
        clearPeopleArr()
        const womanArr = arr.filter(person => person.gender === "female")
        rerenderEntirePeoples(womanArr)
        return womanArr
    }


    const sortMan = (arr) => {
        clearPeopleArr()
        const manArr = arr.filter(person => person.gender === "male")
        rerenderEntirePeoples(manArr)
        return manArr
    }


    const resetArr = (arr) => {
        clearPeopleArr()
        rerenderEntirePeoples(arr)
        return arr
    }


    const searchPeople = (arr) => {
        let results = arr.filter((person) => {
            let firstName = (person.name.first)
            let lastName = (person.name.last)

            return (firstName.toLowerCase().indexOf(input.value.toLowerCase()) !== -1 || lastName.toLowerCase().indexOf(input.value.toLowerCase()) !== -1)
        })
        return results
    }

    const rerenderSortedByInput = () => {
        if (!input.value) {
            clearPeopleArr()
            rerenderEntirePeoples()
        } else {
            clearPeopleArr()
            const arr = searchPeopleFn()
            rerenderEntirePeoples(arr)
        }
    }


    let sortUp = sortByAgeUp.bind(null, startData)
    let sortDown = sortByAgeDown.bind(null, startData)
    let womanS = sortWoman.bind(null, startData)
    let manS = sortMan.bind(null, startData)
    let resetPeople = resetArr.bind(null, startData)
    let searchPeopleFn = searchPeople.bind(null, startData)


    const reset = document.getElementById('reset')
    reset.addEventListener('click', resetPeople)

    const btnUp = document.getElementById('btnUp')
    btnUp.addEventListener('click', sortUp)
    const btnDown = document.getElementById('btnDown')
    btnDown.addEventListener('click', sortDown)
    const woman = document.getElementById('woman')
    woman.addEventListener('click', womanS)
    const man = document.getElementById('man')
    man.addEventListener('click', manS)
    const input = document.getElementById('search')
    input.addEventListener('input', rerenderSortedByInput)


}

getData()

