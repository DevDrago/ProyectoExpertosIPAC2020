window.onload = function() {

    var path = window.location.pathname;

    if(path == '/whois') {
        $('#home').removeClass('active');
        $('#whois').addClass('active');
        $('#docs').removeClass('active');
        $('#contact').removeClass('active');
    }
    else if(path == '/docs') {
        $('#home').removeClass('active');
        $('#whois').removeClass('active');
        $('#docs').addClass('active');
        $('#contact').removeClass('active');
    }
    else if(path == '/contact') {
        $('#home').removeClass('active');
        $('#whois').removeClass('active');
        $('#docs').removeClass('active');
        $('#contact').addClass('active');
    }


};