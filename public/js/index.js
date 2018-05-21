function search() {
    $('#searchButton').html('Searching');
    $('#searchResults').empty();
    var search = {
        preference: document.getElementById('searchPreference').value,
        fromAge: document.getElementById('searchFromAge').value,
        toAge: document.getElementById('searchToAge').value,
        distance: document.getElementById('searchDistance').value
    };
    $.ajax({
        url: "/search",
        type: "POST",
        data: {
            'preference': search.preference,
            'fromAge': search.fromAge,
            'toAge': search.toAge,
            'distance': search.distance
        },
        success: (result) => {
            if (result) {
                $('#searchButton').html('Search');
                var searchResult = document.getElementById('searchResult');
                result.forEach(element => {
                    var birthday = element.birthday.substring(0, 10);
                    $('#searchResults').append(`
                        <div class="searchResultCard">
                            <div class="searchResultCardImage">
                                <img src="`+ element.profileimg + `" class="img-responsive img-circle">
                            </div>
                            <div class="searchResultCardInfo text-center">
                                <a href="/profile/`+ element.username + `">
                                    <h3>`+ element.username + `</h3>
                                </a>
                                <p class="myDate">`+ element.age + `, ` + element.city + `</p>
                            </div>
                            <div class="searchResultCardTagLine">
                                <p>`+ element.bio + `</p>
                                <p class="profileCardLabel">Interests</p>
                                <p>`+ element.interests + `</p>
                            </div>
                        </div>`
                    );
                });
            }
        },
        error: (err) => {
            console.log(err);
        }
    });
}

$("#viewsTab").click(function () {
    $.ajax({
        url: "/views",
        type: "GET",
        success: (result) => {
            if (result) {
                $('#viewResults').empty();
                var viewResults = document.getElementById('viewResults');
                result.forEach(element => {
                    var birthday = element.birthday.substring(0, 10);
                    $('#viewResults').append(`
                        <div class="searchResultCard">
                            <div class="searchResultCardImage">
                                <img src="`+ element.profileimg + `" class="img-responsive img-circle">
                            </div>
                            <div class="searchResultCardInfo text-center">
                                <a href="/profile/`+ element.username + `">
                                    <h3>`+ element.username + `</h3>
                                </a>
                                <p class="myDate">`+ element.age + `, ` + element.city + `</p>
                            </div>
                            <div class="searchResultCardTagLine">
                                <p>`+ element.bio + `</p>
                                <p class="profileCardLabel">Interests</p>
                                <p>`+ element.interests + `</p>
                            </div>
                        </div>`
                    );
                });
            }
        },
        error: (err) => {
            console.log(err);
        }
    });
});

$("#likesTab").click(function () {
    $.ajax({
        url: "/likes",
        type: "GET",
        success: (result) => {
            if (result) {
                $('#likesResults').empty();
                var likesResults = document.getElementById('likesResults');
                result.forEach(element => {
                    var birthday = element.birthday.substring(0, 10);
                    $('#likesResults').append(`
                        <div class="searchResultCard">
                            <div class="searchResultCardImage">
                                <img src="`+ element.profileimg + `" class="img-responsive img-circle">
                            </div>
                            <div class="searchResultCardInfo text-center">
                                <a href="/profile/`+ element.username + `">
                                    <h3>`+ element.username + `</h3>
                                </a>
                                <p class="myDate">`+ element.age + `, ` + element.city + `</p>
                            </div>
                            <div class="searchResultCardTagLine">
                                <p>`+ element.bio + `</p>
                                <p class="profileCardLabel">Interests</p>
                                <p>`+ element.interests + `</p>
                            </div>
                        </div>`
                    );
                });
            }
        },
        error: (err) => {
            console.log(err);
        }
    });
});