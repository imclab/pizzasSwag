var isClient = false;

$(document).ready(function(){

    	$(document).on('click', 'input', function(e) {
            if (!isClient) {
                console.log('input' + $(e.target).val())
                $(e.target).parent().toggleClass('checked');
                connection.send('input' + $(e.target).val());
        		if($(e.target).val() == 3) {
        			showDrivers();
        		}
            }
	   });

        $(document).on('click', '#chewbie', function() {
            if (!isClient) {
                connection.send('vroumvroum');
                goToVroumVroum();
            }
        });

});

function newOrderForCuisine() {
    $('#waitingOrderWindow').fadeOut('300');
    setTimeout(function() {
        $('#orderWindow').fadeIn().removeClass('hide');
        setupNewBroadcastButtonClickHandler();
    }, 500);
}

function goToKitchenCam() {
    connection.send('newOrder');
	$('#orderConfirmation').fadeOut('300');
	setTimeout(function() {
		$('#lstChecks').fadeIn().removeClass('hide');
	}, 500);	
}

function goToVroumVroum() {
	$('#orderWindow').fadeOut();
    setTimeout(function() {
        $('#vroomVroomWindow').fadeIn().removeClass('hide');

        // client hack
        if (!isClient) {

            // Grab elements, create settings, etc.
            var canvas = document.getElementById("canvasRoadPics"),
                contextZizi = canvas.getContext("2d"),
                videoChibre = document.getElementById("videoCaca"),
                videoObj = { "video": true },
                errBack = function(error) {
                    console.log("Video capture error: ", error.code); 
                };


            // // Put video listeners into place
            // if(navigator.getUserMedia) { // Standard
            //     navigator.getUserMedia(videoObj, function(stream) {
            //         videoChibre.src = stream;
            //         videoChibre.play();
            //     }, errBack);
            // } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
            //     navigator.webkitGetUserMedia(videoObj, function(stream){
            //         videoChibre.src = window.webkitURL.createObjectURL(stream);
            //         videoChibre.play();
            //     }, errBack);
            // }

            setInterval(function() {
                contextZizi.drawImage(videoChibre, 0, 0, canvas.width, canvas.height);
                //send image
                connection.send(canvas.toDataURL());
            }, 4000);

        } else {
            var canvas = document.getElementById("canvasRoadPics"),
                contextZizi = canvas.getContext("2d");
            var video = $('video')[0];
            setInterval(function() {
                contextZizi.drawImage(video, 0, 0, canvas.width, canvas.height);
                $('#roadPics').append('<img src="' + canvas.toDataURL() +'" class="img-thumbnail"/>'); 
            }, 4000);
        }

    }, 500);
}

function showDrivers() {
    $('#drivers').fadeIn().removeClass('hide');
}

var testBase64Image = 'data:image/png;base64,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';


function onReceiveNewPic(base64Image) {
    if (base64Image != null && base64Image.data != null) {
        if (base64Image.data.slice(0, 4) != 'data') {
            base64Image.data = 'data:image/png;base64,' + base64Image.data;
        }
        console.log(base64Image.data);
        console.log(base64Image.data.length);
        $('#roadPics').append('<img src="' + base64Image.data +'" class="img-thumbnail"/>'); 
    }
}

$(document).on('click', '#roadPics', function (e){
    e.preventDefault();
    $('img', '#picsModal').attr('src', e.target.src);
    $('#picsModal').modal('show');
});




// CHAT + PHOTO
var roomid = 'pizzaswag2txt';
var connection = new DataConnection();

// on data connection opens
connection.onopen = function(e) {
    console.log('open connection txt');

    connection.onmessage = function(message, userid) {
        console.log(userid + '   | msg:   ' + message);
        if (message == 'hello') {return}
        else if (message == 'newOrder') {
            newOrderForCuisine();
        } else if (message.length > 0 && message.slice(0, 5) == 'input') {
            $('label:eq(' + message[message.length - 1] + ')', '#lstChecks').toggleClass('checked');
        } else if (message == 'vroumvroum') {
            goToVroumVroum();
        } else if (message == 'ObamaCall') {
            callObamaClient();
        } else {
            // onReceiveNewPic(message);
        }
    }
};

// on data connection error
connection.onerror = function(e) {
    console.debug('Error in data connection. Target user id', e.userid, 'Error', e);
};

connection.onclose = function(e) {
    console.debug('Data connection closed. Target user id', e.userid, 'Error', e);
};

// using firebase for signaling
connection.firebase = 'signaling';

// check pre-created data connections
connection.check(roomid);

$(document).ready(function() {
    setTimeout(function() {
        console.log('setup');
        connection.setup(roomid);

        setInterval(function() {
            connection.send('hello');
        }, 2000);
    }, 2000);
});



function goClient() {
    isClient = true;
    loadContent('client');
}

function goCuisine() {
    loadContent('cuisine');
}

function loadContent(link) {
    $('#homeButtons').fadeOut();
    $.ajax({
        url: "templates/" + link + ".html",
        type: "GET",
        dataType: "html",
        success:function(data){
            $('#content').html(data);
            $('#content').fadeIn().removeClass('hide');
        }
    });
}


function callObamaClient() {
    $('#orderWindow').removeClass('hide');
    $('#orderWindow').css('display', 'block');
    $('#orderWindow').css('z-index', 12);
    $('#orderConfirmation').addClass('hide');
    $('#lstChecks').addClass('hide');
    $('h1', '#kitchenWindow').addClass('hide');
}

function callObamaCuisine() {
}



// CAll obama
$(document).on('click', '#call-obama', function() {
    connection.send('ObamaCall');
    callObamaCuisine();
});
