// +++++++++++++++++++++++++++++ About Slider ++++++++++++++++++++++++++
var $status = $(".pageinfo");
var $slickElement = $(".about-slider");
$slickElement.on("init reInit afterChange", function (event, slick, currentSlide, nextSlide) {
	//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
	// if (!slick.$dots) {
	// 	return;
	// }

	var i = (currentSlide ? currentSlide : 0) + 1;
	$status.text(i);
});

$slickElement.slick({
	autoplay: true,
	arrows: true,
	appendArrows: $(".about-controls"),
	nextArrow: `<button>&gt;</button>`,
	prevArrow: `<button>&lt;</button>`,
	infinite: true,
	slidesToShow: 1,
});

// +++++++++++++++++++++++++++++++ Project Slider ++++++++++++++++++++++++++++++++++++
$(".projects-slider").slick({
	arrows: true,
	autoplay: true,

	dots: false,
	easing: "ease-in-out",
	infinite: true,
	// pauseOnHover: false,
	slidesToShow: 3,
	slidesToScroll: 1,
	// responsive: [
	// {
	// 	breakpoint: 1024,
	// 	settings: {
	// 		slidesToShow: 3,
	// 		infinite: true,
	// 	},
	// },
	// {
	// 	breakpoint: 600,
	// 	settings: {
	// 		slidesToShow: 2,
	// 		dots: true,
	// 	},
	// },
	// 	{
	// 		breakpoint: 1024,
	// 		settings: "unslick", // destroys slick
	// 	},
	// ],
});
// +++++++++++++++++++++++++++++++ Footer Slider ++++++++++++++++++++++++++++++++++++
$(".partners-slider").slick({
	arrows: false,
	autoplay: true,
	dots: false,
	infinite: true,
	pauseOnHover: false,
	slidesToShow: 5,
	slidesToScroll: 2,
});

window.addEventListener("load", function () {
	// +++++++++++++++++++++++++++++ Start with slide[0] in viewport ++++++++++++++++++++++++++
	const sliderAbout = document.querySelector(".about-slider");

	const sliderAboutOptions = {
		rootMargin: "-50% 0px 0px  0px",
	};

	const sliderAboutObserver = new IntersectionObserver(function (entries, sliderAboutObserver) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				$(".about-slider").slick("slickGoTo", 0);
			}
		});
	}, sliderAboutOptions);

	if (sliderAbout) {
		sliderAboutObserver.observe(sliderAbout);
	}
	// ++++++++++++++++++++++++++++++++++++++++++ Contact Page ++++++++++++

	let feedbackForm = document.querySelector(".feedback-form"),
		btnSend = document.querySelector(".feedback-form .js-btn-send-form"),
		btnOk = document.querySelector(".popup .btn"),
		btnClose = document.querySelector(".popup-close"),
		name = document.querySelector(".feedback-form #name"),
		email = document.querySelector(".feedback-form #email"),
		message = document.querySelector(".feedback-form #message"),
		regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
		popup = document.querySelector(".popup"),
		popupMsg = document.querySelector(".popup-text");

	if (name) {
		name.addEventListener("input", checkName);
	}
	if (email) {
		email.addEventListener("input", checkEmail);
	}
	if (message) {
		message.addEventListener("input", checkMessage);
	}
	if (feedbackForm) {
		feedbackForm.addEventListener("input", checkForm);
	}
	if (btnSend) {
		btnSend.addEventListener("click", sendForm);
	}

	function sendForm(e) {
		popupMsg.innerHTML = "";

		if (isFormValid()) {
			showPopupMsg("Your message was successfully sent!");
			feedbackForm.reset();
			btnSend.setAttribute("disabled", "disabled");
		}
		e.preventDefault();
	}

	function showPopupMsg(msg) {
		let msgText = document.createTextNode(msg);
		popupMsg.append(msgText);
		popup.classList.add("open");
	}

	function checkName(e) {
		let currentValue = e.target.value,
			formGroup = e.target.parentNode;

		if (!isNameValid(currentValue)) {
			formGroup.classList.add("error");

			clearAlert(formGroup, "alert");
			showAlert(formGroup, "alert", "Name is too short");
		} else {
			formGroup.classList.remove("error");
			clearAlert(formGroup, "alert");
		}
	}

	function checkEmail(e) {
		let currentValue = e.target.value,
			formGroup = e.target.parentNode;

		if (!isEmailValid(currentValue)) {
			formGroup.classList.add("error");

			clearAlert(formGroup, "alert");
			showAlert(formGroup, "alert", "Please enter valid email");
		} else {
			formGroup.classList.remove("error");
			clearAlert(formGroup, "alert");
		}
	}

	function checkMessage(e) {
		let currentValue = e.target.value,
			formGroup = e.target.parentNode;

		if (!isMessageValid(currentValue)) {
			formGroup.classList.add("error");

			clearAlert(formGroup, "alert");
			showAlert(formGroup, "alert", "Message is too short");
		} else {
			formGroup.classList.remove("error");
			clearAlert(formGroup, "alert");
		}
	}
	function checkForm(e) {
		if (isFormValid()) {
			btnSend.removeAttribute("disabled");
		} else {
			btnSend.setAttribute("disabled", "disabled");
		}
	}

	function isNameValid(inputValue) {
		if (inputValue.trim().length >= 2) return true;
		return false;
	}
	function isEmailValid(inputValue) {
		if (regExEmail.test(inputValue)) return true;
		return false;
	}
	function isMessageValid(inputValue) {
		if (inputValue.trim().length >= 10) return true;
		return false;
	}
	function isFormValid() {
		if (!isNameValid(name.value)) return false;
		if (!isEmailValid(email.value)) return false;
		if (!isMessageValid(message.value)) return false;
		return true;
	}

	function clearAlert(el, className) {
		if (el.nextElementSibling.classList.contains(className)) {
			el.nextElementSibling.remove();
		}
	}
	function showAlert(el, className, msg) {
		// create
		let div = document.createElement("div");
		div.appendChild(document.createTextNode(msg));
		div.classList.add(className);

		// insert
		feedbackForm.insertBefore(div, el.nextElementSibling);
	}

	// ------- close pop up --------
	if (btnOk) {
		btnOk.addEventListener("click", closePopup);
	}
	if (btnClose) {
		btnClose.addEventListener("click", closePopup);
	}
	if (popup) {
		popup.addEventListener("click", (e) => {
			if (!e.target.closest(".popup-content")) {
				closePopup(e);
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.which === 27) {
				closePopup(e);
			}
		});
	}

	function closePopup(e) {
		popup.classList.remove("open");
		e.preventDefault();
	}

	// ------ inputs animation ---------------

	if (feedbackForm) {
		let inputs = document.querySelectorAll(".feedback-form .text-input");

		inputs.forEach(function (input) {
			input.addEventListener("focus", toggleActiveFormGroup);
			input.addEventListener("blur", toggleActiveFormGroup);
		});
	}

	function toggleActiveFormGroup(e) {
		e.target.parentNode.classList.toggle("input-active");
		e.target.previousElementSibling.classList.toggle("input-active");
	}
});
