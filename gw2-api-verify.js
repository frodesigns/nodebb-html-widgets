// add to /public/src/client/register.js

var registerBtnParent = $("#register").parent();
var registerBtn = $("#register").clone();
$("#register").remove();
$("#email, #username, #password, #password-confirm").prop("disabled", true);
var okWorlds = [1005];
var api_key = $('#apiKey');
var errorElem = api_key.parents(".form-group").find(".input-group-addon");
var helpElem = api_key.parents(".form-group").find(".help-block");

api_key.on('blur', function() {
	keyCheck(api_key.val());
});

function keyCheck(apikey) {
	if (apikey != "") {
		if (apikey.length == 72) {
			var url = "https://api.guildwars2.com/v2/account?access_token=" + apikey;

			$.ajax({
				url: url,
				type: "GET",
				dataType: "json",
				cache: true,
				timeout: 10000,
				success: function(data) {
					if (data.id) {
						var world = data.world;

						if (okWorlds.indexOf(world) != -1) {
							errorElem.addClass('alert-success').removeClass('alert-danger').html('<i class="fa fa-check"></i>');
							helpElem.removeClass('alert-danger').html('<a href="https://account.arena.net/applications" target="_blank">Get one here</a>. Required to prove your acocunt is on the Maguuma server.');
							registerBtnParent.append(registerBtn);
							$("#email, #username, #password, #password-confirm").prop("disabled", false);
						} else {
							errorElem.addClass('alert-danger').removeClass('alert-success').html('Error');
							helpElem.addClass('alert-danger').html('Your world is not authorized.');
							$("#register").remove();
							$("#email, #username, #password, #password-confirm").prop("disabled", true);
						}
					} else {
						errorElem.addClass('alert-danger').removeClass('alert-success').html('Error');
						helpElem.addClass('alert-danger').html('GW2 account API error.');
						$("#register").remove();
						$("#email, #username, #password, #password-confirm").prop("disabled", true);
					}
				},
				error: function() {
					errorElem.addClass('alert-danger').removeClass('alert-success').html('Error');
					helpElem.addClass('alert-danger').html('GW2 account API error.');
					$("#register").remove();
					$("#email, #username, #password, #password-confirm").prop("disabled", true);
				}
			});
		} else {
			errorElem.addClass('alert-danger').removeClass('alert-success').html('Error');
			helpElem.addClass('alert-danger').html('Invalid GW2 API Key.');
			$("#register").remove();
			$("#email, #username, #password, #password-confirm").prop("disabled", true);
		}
	} else {
		errorElem.addClass('alert-danger').removeClass('alert-success').html('Error');
		helpElem.addClass('alert-danger').html('Invalid GW2 API Key.');
		$("#register").remove();
		$("#email, #username, #password, #password-confirm").prop("disabled", true);
	}
}
