$(document).ready(function(){

	$('input', '.cuisine').click(function() {
		$(this).parent().toggleClass('checked');
		if($(this).hasClass('qc')) {
			goToVroumVroum();
		}
	});


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