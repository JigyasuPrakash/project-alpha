const formlogin = document.querySelector('#login-form');
const formsignup = document.querySelector('#signup-form');

if (formlogin != null) {
	formlogin.addEventListener('submit', (e) => {
		e.preventDefault();
		var userType = 'users';
		$("#display_loading").css('visibility', 'visible');
		const email = formlogin.email.value;
		const password = formlogin.password.value;
		formlogin.reset();
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
				localStorage.setItem('userType', userType);
				localStorage.setItem('name', result.name);
				localStorage.setItem('email', result.email);
				localStorage.setItem('SessionID', result.token);
				window.location.href = '/dashboard';
			}
		});
	});
}

if (formsignup != null) {
	formsignup.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = formsignup.firstName.value + ' ' + formsignup.lastName.value;
		const email = formsignup.email.value;
		const password = formsignup.password.value;
		formsignup.reset();

		//signUp method goes here
		var path = '/api/users/register';
		var userType = 'users';
		$.ajax({
			method: 'POST',
			dataType: "json",
			data: {
				"name": name,
				"email": email,
				"password": password
			},
			url: path,
			success: function (result) {
				if (result.success === true) {
					alert(result.message);
					window.location.href = '/login';
				} else {
					alert(result.message);
					window.location.reload;
				}
			}
		});
	})
}

function signUp() {
	window.location.href = "./signup";
}

function Login() {
	window.location.href = "./login"
}
