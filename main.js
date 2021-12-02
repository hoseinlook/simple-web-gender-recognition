NAME = ""
NAME_LIST = ''
console.log('hi')


function print_error(msg) {
    document.getElementById('error').style.visibility = 'visible'
    document.getElementById('error').innerText = msg

    window.setTimeout(() => {
        document.getElementById('error').style.visibility = 'hidden'
    },4000)
}

function load_names_from_storage() {
    genders = window.localStorage.getItem('genders')
    if (genders != null) {
        NAME_LIST = genders
        console.log(genders)

        document.getElementById('names_list').value = genders
    }
}

load_names_from_storage()

function submit() {
    var requestOptions = {
        method: 'GET',
        // redirect: 'follow'
    };
    NAME = document.getElementById('name_field').value
    console.log(NAME)
    if (NAME.length <= 2) {
        print_error('name length <2')
        return
    }
    fetch(`https://api.genderize.io/?name=${NAME}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.gender==null){
                print_error(`${NAME} has not gender`)
                return
            }
            document.getElementById('predict_gender').innerText = result.gender
            document.getElementById('predict_value').innerText = result.probability
        })
        .catch(error => console.log('error', error));
}

function clear_radio() {
    NAME = ''
    document.getElementById('name_field').value = ''

}

function save() {
    let radio_value = document.getElementsByName('radio_group')
    let gender = 'male'
    radio_value.forEach(element => {
        if (element.checked === true) {
            gender = element.value
        }
    })
    if (NAME !== '') {
        NAME_LIST += NAME + ' ' + gender + '\n'
        window.localStorage.setItem('genders', NAME_LIST)
    }
    load_names_from_storage()
    clear_radio()

}

function remove_local_storage() {

    window.localStorage.setItem('genders', '')
    load_names_from_storage()
}
