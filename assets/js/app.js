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

sliderAboutObserver.observe(sliderAbout);
