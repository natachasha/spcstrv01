window.addEventListener("load", function () {
	// +++++++++++++++++++++++++++++ About Slider ++++++++++++++++++++++++++
	var $status = $(".pageinfo");
	var $slickElement = $(".about-slider");
	$slickElement.on("init reInit afterChange", function (event, slick, currentSlide, nextSlide) {
		//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
		// if (!slick.$dots) {
		// 	return;
		// }

		var i = (currentSlide ? currentSlide : 0) + 1;
		$status.text("< " + i + " >");
	});

	$slickElement.slick({
		autoplay: true,
		arrows: true,
		/*appendArrows: $(".about-controls"),*/
		/*nextArrow: `<button>&gt;</button>`,
			prevArrow: `<button>&lt;</button>`,*/
		infinite: true,
		slidesToShow: 1,
	});

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
		responsive: [
			{
				breakpoint: 840,
				settings: "unslick", // destroys slick
			},
		],
	});
	// +++++++++++++++++++++++++++++++ Footer Slider ++++++++++++++++++++++++++++++++++++
	/*$(".partners-slider").slick({
			arrows: false,
			autoplay: true,
			dots: false,
			infinite: true,
			pauseOnHover: false,
			slidesToShow: 5,
			slidesToScroll: 2,
		});*/

	// ---- intersection observer for elements animation fade-in

	let options = {
		root: null,
		rootMargin: "0px",
		threshold: 0.1,
	};

	let callback = function (entries, observer) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("io-fadein");
				observer.unobserve(entry.target);
			}
		});
	};

	let observer = new IntersectionObserver(callback, options);
	let query = `.hero-content *:not(.btn), 
					.services-item, 
					.features *,
					.about .title,
					.about-body,
					.projects .title,
					.ptojects-slider,
					.call,
					.footer-logo,
					.connection-description,
					.connection-process,
					.footer h5,
					.footer .list,
					.connection-nav,
					.footer .copy,
					.footer .partners`;

	let elements = [...document.querySelectorAll(query)];

	if (elements[0] !== null) {
		elements.forEach((el) => {
			observer.observe(el);
		});
	}

	//show menu

	let menuIcon = document.querySelector(".menu-icon");
	console.log(menuIcon);

	menuIcon.addEventListener("click", showHeaderNavigation);
	document.querySelector(".menu").addEventListener("click", closeNav);

	let lis = document.querySelectorAll(".menu ul li");

	for (let i = 1; i < lis.length; i++) {
		lis[i].addEventListener("click", closeNav);
	}

	function showHeaderNavigation() {
		document.querySelector(".menu").style.top = "0";
	}

	function closeNav() {
		document.querySelector(".menu").style.top = "-2000px";
	}

	let showMore = document.querySelector(".show-more");

	if (showMore) {
		showMore.addEventListener("click", showMoreText);
	}

	let showed = false;

	function showMoreText() {
		showed = !showed;
		let texts = document.querySelectorAll(".about-text p:nth-child(n+3)");

		for (let i = 0; i < texts.length; i++) {
			texts[i].style.display = "block";
		}

		if (!showed) {
			showMore.classList.remove("rotate");
			for (let i = 0; i < texts.length; i++) {
				texts[i].style.display = "none";
			}
			showMore.innerText = "читать еще";
		} else {
			showMore.classList.add("rotate");
			for (let i = 0; i < texts.length; i++) {
				texts[i].style.display = "block";
			}
			showMore.innerText = "скрыть";
		}
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
	function sendClbForm(e) {
		popupMsg.innerHTML = "";

		if (isClbFormValid()) {
			showPopupMsg("Your message was successfully sent!");
			callbackForm.reset();
			btnClbSend.setAttribute("disabled", "disabled");
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
			formGroup = e.target.parentNode,
			parent = e.target.closest(".form");

		if (!isNameValid(currentValue)) {
			formGroup.classList.add("error");

			clearAlert(formGroup, "alert");
			showAlert(formGroup, "alert", "Name is too short", parent);
		} else {
			formGroup.classList.remove("error");
			clearAlert(formGroup, "alert");
		}
	}

	function checkEmail(e) {
		let currentValue = e.target.value,
			formGroup = e.target.parentNode,
			parent = e.target.closest(".form");

		if (!isEmailValid(currentValue)) {
			formGroup.classList.add("error");

			clearAlert(formGroup, "alert");
			showAlert(formGroup, "alert", "Please enter valid email", parent);
		} else {
			formGroup.classList.remove("error");
			clearAlert(formGroup, "alert");
		}
	}

	function checkTel(e) {
		let currentValue = e.target.value.trim(),
			formGroup = e.target.parentNode,
			parent = e.target.closest(".form");

		if (!isTelValid(currentValue)) {
			formGroup.classList.add("error");

			clearAlert(formGroup, "alert");
			showAlert(formGroup, "alert", "Please enter valid phone number", parent);
		} else {
			formGroup.classList.remove("error");
			clearAlert(formGroup, "alert");
		}
	}

	function checkMessage(e) {
		let currentValue = e.target.value,
			formGroup = e.target.parentNode,
			parent = e.target.closest(".form");

		if (!isMessageValid(currentValue)) {
			formGroup.classList.add("error");

			clearAlert(formGroup, "alert");
			showAlert(formGroup, "alert", "Message is too short", parent);
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

	function checkClbForm(e) {
		// console.log(e.target);
		if (isClbFormValid()) {
			btnClbSend.removeAttribute("disabled");
		} else {
			btnClbSend.setAttribute("disabled", "disabled");
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
	function isTelValid(inputValue) {
		if (regExTel.test(inputValue)) return true;
		return false;
	}

	function isFormValid() {
		if (!isNameValid(name.value)) return false;
		if (!isEmailValid(email.value)) return false;
		if (!isMessageValid(message.value)) return false;
		return true;
	}

	function isClbFormValid() {
		if (!isNameValid(nameClb.value)) return false;
		if (!isTelValid(telClb.value)) return false;

		return true;
	}

	function clearAlert(el, className) {
		if (el.nextElementSibling.classList.contains(className)) {
			el.nextElementSibling.remove();
		}
	}
	function showAlert(el, className, msg, parent) {
		// create
		let div = document.createElement("div");
		div.appendChild(document.createTextNode(msg));
		div.classList.add(className);

		// insert
		parent.insertBefore(div, el.nextElementSibling);
	}

	// ------- close pop up --------
	if (btnOk) {
		btnOk.addEventListener("click", closePopupMsg);
	}
	if (btnClose) {
		btnClose.addEventListener("click", closePopupMsg);
	}
	if (popup) {
		popup.addEventListener("click", (e) => {
			if (!e.target.closest(".popup-content")) {
				closePopupMsg(e);
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.which === 27) {
				popup.classList.remove("open");
			}
		});
	}

	function closePopupMsg(e) {
		e.target.closest(".open").classList.remove("open");
		e.preventDefault();
	}

	// ------------------- CALLBACK POPUP -----------------------
	const callbackForm = document.querySelector(".callback-form"),
		nameClb = document.querySelector(".callback-form #name-clb"),
		telClb = document.querySelector(".callback-form #tel-clb"),
		btnsClbOpen = document.querySelectorAll(".btn-callback"),
		btnClbClose = document.querySelector(".callbackpop-close"),
		btnClbSend = document.querySelector(".js-btn-send-clb"),
		regExTel = /([0-9\+\-\(\)\ ])/,
		popupClb = document.querySelector(".callbackpop");

	if (nameClb) {
		nameClb.addEventListener("input", checkName);
	}
	if (telClb) {
		telClb.addEventListener("input", checkTel);
	}
	if (callbackForm) {
		callbackForm.addEventListener("input", checkClbForm);
	}
	if (btnClbSend) {
		btnClbSend.addEventListener("click", sendClbForm);
	}

	if (btnsClbOpen) {
		btnsClbOpen.forEach((btn) => {
			btn.addEventListener("click", openClbForm);
		});
	}

	function openClbForm(e) {
		popupClb.classList.add("open");
		document.querySelector("body").classList.add("lock");
		e.preventDefault();
	}

	// -------------------- FEEDBACK CALLBACK POP ---------------
	const btnFdbOpen = document.querySelector(".btn-feedbackpop"),
		popupFdb = document.querySelector(".feedbackpop"),
		btnFdbClose = document.querySelector(".feedbackpop-close");

	if (btnFdbOpen) {
		btnFdbOpen.addEventListener("click", openFdbForm);
	}

	function openFdbForm(e) {
		popupFdb.classList.add("open");
		document.querySelector("body").classList.add("lock");
		e.preventDefault();
	}

	// ------- close callback and feedback pop up --------
	if (popupClb) {
		popupClb.addEventListener("click", (e) => {
			if (!e.target.closest(".callbackpop-content")) {
				closePopupForm(e);
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.which === 27) {
				popupClb.classList.remove("open");
				document.querySelector("body").classList.remove("lock");
			}
		});
	}
	if (popupFdb) {
		popupFdb.addEventListener("click", (e) => {
			if (!e.target.closest(".feedbackpop-content")) {
				closePopupForm(e);
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.which === 27) {
				popupFdb.classList.remove("open");
				document.querySelector("body").classList.remove("lock");
			}
		});
	}

	if (btnClbClose) {
		btnClbClose.addEventListener("click", closePopupForm);
	}
	if (btnFdbClose) {
		btnFdbClose.addEventListener("click", closePopupForm);
	}

	function closePopupForm(e) {
		e.target.closest(".open").classList.remove("open");
		document.querySelector("body").classList.remove("lock");
		e.preventDefault();
	}
	// ------ inputs animation ---------------
	const formAny = document.querySelector(".form");

	if (formAny) {
		let inputs = document.querySelectorAll(".text-input");

		inputs.forEach(function (input) {
			input.addEventListener("focus", toggleActiveFormGroup);
			input.addEventListener("blur", toggleActiveFormGroup);
		});
	}
	// if (feedbackForm) {
	// 	let inputs = document.querySelectorAll(".feedback-form .text-input");

	// 	inputs.forEach(function (input) {
	// 		input.addEventListener("focus", toggleActiveFormGroup);
	// 		input.addEventListener("blur", toggleActiveFormGroup);
	// 	});
	// }

	function toggleActiveFormGroup(e) {
		e.target.parentNode.classList.toggle("input-active");
		e.target.previousElementSibling.classList.toggle("input-active");
	}

	// -----------  BTN TO TOP --------------------

	$(".totop").click(function () {
		$("html, body").animate({ scrollTop: 0 }, 800);
		return false;
	});

	const btnToTop = document.querySelector(".totop");

	if (btnToTop) {
		window.addEventListener("scroll", toggleBtnToTop);
	}

	function toggleBtnToTop() {
		if (window.pageYOffset > 900) {
			btnToTop.classList.add("visible-js");
		} else {
			btnToTop.classList.remove("visible-js");
		}
	}

	// ------------- 	ACCORDION VACANCY PAGE -------------
	const itemsOffer = document.querySelectorAll(".offers-item");

	if (itemsOffer) {
		itemsOffer.forEach((item) => item.addEventListener("click", openItem));
	}

	// ver 01
	// function openItem(e) {
	// 	const parent = e.target.closest(".offers-item");
	// 	if (!parent.classList.contains("open")) {
	// 		itemsOffer.forEach((item) => {
	// 			item.classList.remove("open");
	// 		});
	// 	}
	// 	parent.classList.toggle("open");
	// }

	// ver 02
	function openItem(e) {
		const offersBody = Array.from(document.querySelectorAll(".offers-body")),
			parent = e.target.closest(".offers-item"),
			childs = Array.from(parent.children);

		if (!parent.classList.contains("open")) {
			itemsOffer.forEach((item) => {
				item.classList.remove("open");
			});
			offersBody.forEach((offer) => {
				offer.style.maxHeight = "0px";
			});

			childs.forEach((child) => {
				if (child.classList.contains("offers-body")) {
					child.style.maxHeight = child.scrollHeight + "px";
				}
			});
		} else {
			childs.forEach((child) => {
				if (child.classList.contains("offers-body")) {
					child.style.maxHeight = "0px";
				}
			});
		}

		parent.classList.toggle("open");
	}
});
