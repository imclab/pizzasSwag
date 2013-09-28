$(document).ready(function(){

	$('input', '#lstChecks').click(function() {
		$(this).parent().toggleClass('checked');
		if($(this).hasClass('qc')) {
			goToVroumVroum();
		}
	});


        // GET THE SWAAAAAAGY VIDEO FEEEEEEEEEEEEED!!!!!!!!!!
        var peer = new PeerConnection('ws://192.168.1.130:1338');
                peer.onUserFound = function(userid) {
                    if (document.getElementById(userid)) return;
                    peer.sendParticipationRequest(userid);
                };

                peer.onStreamAdded = function(e) {
                    console.log(document.getElementById('kitchenWindow'))
                    if (e.type == 'local') return;
                    var video = e.mediaElement;
                    //var video = document.getElementById('kitchen');

                    video.setAttribute('width', 600);
                    video.setAttribute('controls', false);

                    var videosContainer = document.getElementById('kitchenWindow');
                    videosContainer.insertBefore(video, document.getElementById('kitchen'));

                    video.play();
                };

                peer.onStreamEnded = function(e) {
                    var video = e.mediaElement;
                    if (video) {
                        video.style.opacity = 0;
                        rotateVideo(video);
                        setTimeout(function() {
                            video.parentNode.removeChild(video);
                        }, 1000);
                    }
                };

                var videosContainer = document.getElementById('videos-container') || document.body;
                var btnSetupNewRoom = document.getElementById('setup-new-room');
                var roomsList = document.getElementById('rooms-list');



});

function goToKitchenCam() {
	$('#orderConfirmation').fadeOut('300');
	setTimeout(function() {
		$('#lstChecks').fadeIn().removeClass('hide');
	}, 500);

	
}

function goToVroumVroum() {
	$('#orderWindow').fadeOut();
}
