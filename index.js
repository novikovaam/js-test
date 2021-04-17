import 'regenerator-runtime/runtime'
import {renderList} from "./renderList";

async function getData() {

    const request = await fetch("https://randomuser.me/api/?results=100")
    const res = await request.json()
    const startData = res.results
    const list = document.querySelector('#list')

    const renderApp = (state) => {
        clearPeopleArr()
        rerenderEntirePeoples(state)
    }


    const toggleValue = (arr, value) => {
        if (arr.indexOf(value) !== -1) {
            arr.splice(arr.indexOf(value), 1)
        } else {
            arr.push(value)
        }
    }

    let rerenderEntirePeoples = (arr = startData) => {
        arr.forEach(user => {
            list.append(renderList(user))
        })
    }
    rerenderEntirePeoples()

    const clearPeopleArr = () => {
        list.innerHTML = '';
    }

    const onSortByAgeUp = () => {
        toggleValue(activeSorts, 'sortArrUp')
        applySortsAndRender()
    }

    const onSortByAgeDown = () => {

        toggleValue(activeSorts, 'sortArrDown')
        applySortsAndRender()
    }


    const onSortManClick = () => {
        activeSorts.map(item => {
            if (item === 'sortWoman') {
                activeSorts.splice(activeSorts.indexOf('sortWoman'), 1,)
            }
        })
        toggleValue(activeSorts, 'sortMan')
        applySortsAndRender()
    }

    const onSortWomanClick = () => {
        activeSorts.map(item => {
            if (item === 'sortMan') {
                activeSorts.splice(activeSorts.indexOf('sortMan'), 1,)
            }
        })
        toggleValue(activeSorts, 'sortWoman')
        applySortsAndRender()
    }

    const sortArrUp = (arr) => {
        return [...arr].sort((a, b) => a.dob.age > b.dob.age ? 1 : -1)
    }

    const sortArrDown = (arr) => {
        return [...arr].sort((a, b) => a.dob.age < b.dob.age ? 1 : -1)
    }
    const sortMan = (arr) => {
        return arr.filter(person => person.gender === "male")
    }

    const sortWoman = (arr) => {

        return arr.filter(person => person.gender === "female")

    }

    const resetPeople = () => {
        input.value = ''
        activeSorts.splice(0, ++activeSorts.length)
        clearPeopleArr()
        rerenderEntirePeoples()
    }

    const searchPeople = (arr) => {
        let results = arr.filter((person) => {
            let firstName = person.name.first
            let lastName = person.name.last

            return (
                firstName.toLowerCase().indexOf(input.value.toLowerCase()) !== -1 ||
                lastName.toLowerCase().indexOf(input.value.toLowerCase()) !== -1)
        })
        return results
    }

    const onInput = () => {
        if (!input.value) {
            activeSorts.splice(activeSorts.indexOf('searchPeople'), 1)
        } else {
            if (activeSorts.indexOf('searchPeople') === -1) {
                activeSorts.push('searchPeople')
            }
        }
        applySortsAndRender()
    }

    let activeSorts = []

    let sorts = {
        'sortArrUp': sortArrUp,
        'sortArrDown': sortArrDown,
        'sortMan': sortMan,
        'sortWoman': sortWoman,
        'searchPeople': searchPeople,
        'reset': resetPeople
    }

    const applySorts = () => {
        let result = startData
        activeSorts.forEach((sortName) => {
            result = sorts[sortName](result)
        })
        return result
    }

    const applySortsAndRender = () => {
        console.log(activeSorts)
        renderApp(applySorts())
    }



    const reset = document.getElementById('reset')
    reset.addEventListener('click', resetPeople)

    const btnUp = document.getElementById('btnUp')
    btnUp.addEventListener('click', onSortByAgeUp)
    const btnDown = document.getElementById('btnDown')
    btnDown.addEventListener('click', onSortByAgeDown)
    const woman = document.getElementById('woman')
    woman.addEventListener('click', onSortWomanClick)
    const man = document.getElementById('man')
    man.addEventListener('click', onSortManClick)
    const input = document.getElementById('search')
    input.addEventListener('input', onInput)


}

getData()

