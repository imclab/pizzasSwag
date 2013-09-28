$(document).ready(function(){

	$('input', '.cuisine').click(function() {
		$(this).parent().toggleClass('checked');
		if($(this).hasClass('qc')) {
			showDrivers();
		}
	});
    
    $('#chewbie').click(function() {
        goToVroumVroum();
    });

});

function newOrderForCuisine() {
    $('#waitingOrderWindow').fadeOut('300');
    setTimeout(function() {
        $('#orderWindow').fadeIn().removeClass('hide');
    }, 500);
}

function goToKitchenCam() {
	$('#orderConfirmation').fadeOut('300');
	setTimeout(function() {
		$('#lstChecks').fadeIn().removeClass('hide');
	}, 500);	
}

function goToVroumVroum() {
	$('#orderWindow').fadeOut();
    setTimeout(function() {
        $('#vroomVroomWindow').fadeIn().removeClass('hide');
    }, 500);
}

function showDrivers() {
    $('#drivers').fadeIn().removeClass('hide');
}
