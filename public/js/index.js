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
                    $('#searchResults').append(createProfileDIv(element));
                });
                var $container = $('#searchResults');
                createIsotope($container);
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
                    $('#viewResults').append(createProfileDIv(element));
                });
                var $container = $('#viewResults');
                createIsotope($container);
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
                    $('#likesResults').append(createProfileDIv(element));
                });
                var $container = $('#likesResults');
                createIsotope($container);
            }
        },
        error: (err) => {
            console.log(err);
        }
    });
});

$("#matchesTab").click(function () {
    $.ajax({
        url: "/matches",
        type: "GET",
        success: (result) => {
            if (result) {
                $('#matchResults').empty();
                var viewResults = document.getElementById('matchResults');
                result.forEach(element => {
                    var birthday = element.birthday.substring(0, 10);
                    $('#matchResults').append(createProfileDIv(element));
                });
                var $container = $('#matchResults');
                createIsotope($container);
            }
        },
        error: (err) => {
            console.log(err);
        }
    });
});

$("#suggestionsTab").click(function () {
    $.ajax({
        url: "/suggestions",
        type: "GET",
        success: (result) => {
            if (result) {
                $('#suggestionResults').empty();
                var suggestionResults = document.getElementById('suggestionResults');
                result.forEach(element => {
                    var birthday = element.birthday.substring(0, 10);
                    $('#suggestionResults').append(createProfileDIv(element));
                });
                var $container = $('#suggestionResults');
                createIsotope($container);
            }
        },
        error: (err) => {
            console.log(err);
        }
    });
});


function createIsotope($container) {
    $container.isotope();
    $container.isotope('destroy'); //destroying any previous isotope session
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false,
        },
        getSortData: {
            age: '.age',
            fame: '.fame',
            tags: '.tags',
            distance: '.distance',
        }
    });

    $('.filter-by-btn-group a').click(function () {
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false,
            }
        });
        return false;
    });

    $('.sort-by-btn-group').on( 'click', 'button', function() {
        var sortByValue = $(this).attr('data-sort-by');
        $container.isotope({ sortBy: sortByValue });
    });

}

function createProfileDIv(element) {

    var gridItem = '';

    if (element.age >= 18 && element.age <= 25) {
        gridItem = '<div class="grid-item ageGroup1 ';
    } else if (element.age > 25 && element.age <= 35) {
        gridItem = '<div class="grid-item ageGroup2 ';
    } else if (element.age > 35 && element.age <= 45) {
        gridItem = '<div class="grid-item ageGroup3 ';
    } else {
        gridItem = '<div class="grid-item ageGroup4 ';
    }

    if (element.fame <= 25) {
        gridItem += 'fameGroup1 ';
    } else if (element.fame > 25 && element.fame <= 50) {
        gridItem += 'fameGroup2 ';
    } else if (element.fame > 50 && element.fame <= 100) {
        gridItem += 'fameGroup3 ';
    } else {
        gridItem += 'fameGroup4 ';
    }

    if (element.distance <= 5) {
        gridItem += 'distanceGroup1 ';
    } else if (element.distance > 5 && element.distance <= 10) {
        gridItem += 'distanceGroup2 ';
    } else if (element.distance > 10 && element.distance <= 20) {
        gridItem += 'distanceGroup3 ';
    } else if (element.distance > 20 && element.distance <= 50) {
        gridItem += 'distanceGroup4 ';
    } else {
        gridItem += 'distanceGroup5 ';
    }
    if (element.commonTags.length >= 5) {
        gridItem += 'tagGroup1">';
    } else if (element.commonTags.length < 5 && element.commonTags.length > 1) {
        gridItem += 'tagGroup2">';
    } else if (element.commonTags.length == 1) {
        gridItem += 'tagGroup3">';
    } else {
        gridItem += 'tagGroup4">';
    }
    var profileDiv = gridItem + `
        <div class="searchResultCardImage">
            <img src="`+ element.profileimg + `" class="img-responsive">
        </div>
        <div class="searchResultCardInfo">
            <div class="searchResultName">
                <a href="/profile/`+ element.username + `" class="pull-left">
                    <h4>`+ element.username + `</h4>
                </a>
                <p class="myDate pull-right age">`+ element.age + `</p>
            </div>
            <p class="pull-left">Fame Rating</p>
            <p class="pull-right fame">` + element.fame + `</p>
            <br><br>
            <p class="pull-left">Distance</p>
            <p class="pull-right distance">Within ` + element.distance + ` KM's</p>
            <br>
        </div>
        <div class="searchResultCardTagLine">
            <p class="profileCardLabel">Common interests</p>
            <p class="tags">`+ element.commonTags + `</p>
        </div>
    </div>`;

    return profileDiv;
}