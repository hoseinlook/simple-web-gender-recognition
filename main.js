NAME = ""
NAME_LIST = {}

console.log('hi')


function print_error(msg) {
    document.getElementById('error').style.visibility = 'visible'
    document.getElementById('error').innerText = msg

    window.setTimeout(() => {
        document.getElementById('error').style.visibility = 'hidden'
    }, 4000)
}

function load_names_from_storage() {
    genders = window.localStorage.getItem('genders')
    if (genders != null) {
        NAME_LIST = JSON.parse(genders)
        console.log(genders)
        let value = ''
        for (var e in NAME_LIST) {
            value += e + ' ' + NAME_LIST[e] + '\n'
        }


        document.getElementById('names_list').value = value
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
        NAME = ''
        return
    }
    fetch(`https://api.genderize.io/?name=${NAME}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.gender == null) {
                print_error(`${NAME} has not gender`)
                return
            }
            document.getElementById('predict_gender').innerText = result.gender
            document.getElementById('predict_value').innerText = result.probability

            if (NAME in NAME_LIST) {
                document.getElementById('predict_value').innerText += " Duplicate"
            }
        })
        .catch(error => print_error(error.toString()));
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
        NAME_LIST[NAME] = gender
        window.localStorage.setItem('genders', JSON.stringify(NAME_LIST))

    }
    load_names_from_storage()
    clear_radio()

}

function remove_local_storage() {

    window.localStorage.setItem('genders', JSON.stringify({}))
    load_names_from_storage()
}

function remove() {
    filed_name = document.getElementById('name_field').value
    if (filed_name.length <= 2) {
        print_error('name length <2')
        return
    }

    if (filed_name in NAME_LIST) {
        console.log('hast')
        delete NAME_LIST[filed_name]
        window.localStorage.setItem('genders', JSON.stringify(NAME_LIST))
        load_names_from_storage()
    }

}