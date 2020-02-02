var CID = '';

const form = document.querySelector('#login-form');
var userType = 'users';
form.addEventListener('submit', (e) => {

	e.preventDefault();
	$("#display_loading").css('visibility', 'visible');
	const email = form.email.value;
	const password = form.password.value;
	form.reset();
	var path = '/api/users/login';
	if (email.split('@')[1] === 'tnp.com') {
		path = '/api/admin/login';
		userType = 'admin';
	}
	$.ajax({
		method: 'POST',
		dataType: "json",
		data: {
			"email": email,
			"password": password
		},
		url: path,
		success: function (result) {
			console.log(result.token)
			sessionStorage.setItem('userType', userType);
			sessionStorage.setItem('SessionID', result.token);
			window.location.href = '/dashboard';
		}
	});
});

function signUp() {
	window.location.href = "./signup";
}