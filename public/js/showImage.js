function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#profileImg')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function readURL1(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img1')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function readURL2(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img2')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function readURL3(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img3')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function readURL4(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img4')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}