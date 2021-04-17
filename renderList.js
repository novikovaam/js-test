export const renderList = (user) => {

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