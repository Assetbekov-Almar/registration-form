const $form = $('form#registration-form'),
      $passwordSection = $form.find('.registration-password'),
      $passwordConfirmSection = $form.find('.registration-password-confirm'),
      $password = $form.find('#password'),
      $passwordConfirm = $form.find('#password-confirm'),
      $passwordBtn = $form.find('.password-btn'),
      $serverErrorMessages = $form.find('.custom-error-message'),
      inputNamesErrorMessagesArray = [],
      customErrorsClasses = ['login-taken-or-reserved', 'password-invalid',
                             'invitation-code-wrong-or-used','capcha-code-wrong'],
      $inputDetails = $('.registration-input-details')

function assignCustomErrors(formInput, errorList) {
	if (!formInput.is(':input') || !formInput.closest($inputDetails) ||
	    !Array.isArray(errorList)) return

	const formItem = formInput.closest($inputDetails)
	formItem.find($serverErrorMessages).addClass('d-none')
	formInput.removeClass('is-invalid-custom')

	errorList.forEach(function(errorClass) {
		formItem.find($('.' + errorClass)).removeClass('d-none')
	})

	if (errorList.length > 0) formInput.addClass('is-invalid-custom')
}

$passwordBtn.on('click',function() {
	if ($password.attr('type') === 'password') {
		$password.attr('type', 'text')
		$passwordConfirm.prop('disabled', true)
		$passwordSection.addClass('show-password-mode')
		$passwordConfirmSection.addClass('show-password-mode')
		                       .removeClass('required-field')
	} 
	else {
		$password.attr('type', 'password')
		$passwordConfirm.prop('disabled', false)
		$passwordSection.removeClass('show-password-mode')
		$passwordConfirmSection.removeClass('show-password-mode')
		                       .addClass('required-field')
	}
})

$form.on('submit', function(event) {
	$(this).addClass('form-loading')
	event.preventDefault()
	event.stopPropagation()

	if (!$(this)[0].checkValidity()) {
		$(this).removeClass('form-loading').addClass('was-validated')
		return
	}

	if (!$passwordSection.hasClass('show-password-mode') && 
	    $password.val() !== $passwordConfirm.val()) {
		assignCustomErrors($passwordConfirm, ['passwords-match-error'])
		return
	}
	else {
		assignCustomErrors($passwordConfirm, [])
	}

	customErrorsClasses.forEach(className => {
		const customClass = $('.' + className),
		      input = customClass.closest($inputDetails).find('input')
		inputNamesErrorMessagesArray.push([input,className])
	}) 

	const randomInputNamesErrorMessagesArray = inputNamesErrorMessagesArray[Math.floor(Math.random() *
	                                           inputNamesErrorMessagesArray.length)]
	assignCustomErrors(randomInputNamesErrorMessagesArray[0],
	                  [randomInputNamesErrorMessagesArray[1]])


	
	// const url = $(this).attr('action'),
	//       type = $(this).attr('method'),
	//       randomErrorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)]

	// $.ajax({
	// 	url: url,
	// 	type: type,
	// 	error: function(response) {
	// 		alert(randomErrorMessage)
	// 	}
	// })
	return false
})

