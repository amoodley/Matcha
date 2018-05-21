function editProfile() {

    var profile = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        birthday: document.getElementById('myDate').value,
        city: document.getElementById('city').value,
        gender: document.getElementById('gender').value,
        preference: document.getElementById('preference').value,
        bio: document.getElementById('bio').value,
        interests: document.getElementById('interests').value
    };
    var message = {
        firstName: '',
        lastName: '',
        birthday: '',
        city: '',
        gender: '',
        preference: ''
    };
    document.getElementById('successMessage').hidden = true;
    document.getElementById('firstNameMessage').innerHTML = '';
    document.getElementById('lastNameMessage').innerHTML = '';
    document.getElementById('birthdayMessage').innerHTML = '';
    document.getElementById('cityMessage').innerHTML = '';
    document.getElementById('genderMessage').innerHTML = '';
    document.getElementById('preferenceMessage').innerHTML = '';

    if (profile.firstName == '') {
        message.firstName = 'Required';
    }
    if (profile.lastName == '') {
        message.lastName = 'Required';
    }
    if (profile.birthday == '') {
        message.birthday = 'Required';
    }
    if (profile.city == '') {
        message.city = 'Required';
    }
    if (profile.gender == '') {
        message.gender = 'Required';
    }
    if (profile.preference == '') {
        message.preference = 'Required';
    }

    if ((message.firstName == '') && (message.lastName == '') && (message.birthday == '') && (message.city == '') && (message.gender == '') && (message.preference == '')) {
        $.ajax({
            url: "/profile/editprofile",
            type: "POST",
            data: {
                'firstName': profile.firstName,
                'lastName': profile.lastName,
                'birthday': profile.birthday,
                'city': profile.city,
                'gender': profile.gender,
                'preference': profile.preference,
                'bio': profile.bio,
                'interests': profile.interests
            },
            success: (result) => {
                if (result == 'Success'){
                    document.getElementById('successMessage').hidden = false;
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    } else {
        document.getElementById('firstNameMessage').innerHTML = message.firstName;
        document.getElementById('lastNameMessage').innerHTML = message.lastName;
        document.getElementById('birthdayMessage').innerHTML = message.birthday;
        document.getElementById('cityMessage').innerHTML = message.city;
        document.getElementById('genderMessage').innerHTML = message.gender;
        document.getElementById('preferenceMessage').innerHTML = message.preference;
    }
}

function editLocation() {
    var profile = {
        latitude: document.getElementById('latitude').value,
        longitude: document.getElementById('longitude').value
    };
    var message = {
        latitude: '',
        longitude: ''
    };
    
    document.getElementById('successMessage2').hidden = true;
    document.getElementById('latitudeMessage').innerHTML = '';
    document.getElementById('longitudeMessage').innerHTML = '';

    if (profile.latitude == '') {
        message.latitude = 'Required';
    }
    if (profile.longitude == '') {
        message.longitude = 'Required';
    }

    if (message.latitude == '' && message.longitude == '') {
        $.ajax({
            url: "/profile/editlocation",
            type: "POST",
            data: {
                'latitude': profile.latitude,
                'longitude': profile.longitude
            },
            success: (result) => {
                if (result == 'Success'){
                    console.log(result);
                    document.getElementById('successMessage2').hidden = false;
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    } else {
        document.getElementById('latitudeMessage').innerHTML = message.latitude;
        document.getElementById('longitudeMessage').innerHTML = message.longitude;
    }
}