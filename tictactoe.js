
var coinFlip = () => Math.random() > 0.5;

const circleSVG = "<circle cx=\"50\" cy=\"50\" r=\"20\" stroke=\"#6ECEFF\" stroke-width=\"3\" fill=\"transparent\"/>";
const crossSVG  = "<line x1=\"30\" y1=\"30\" x2=\"70\" y2=\"70\" stroke=\"red\" stroke-width=\"3\" stroke-linecap=\"round\"/> \
    			   <line x1=\"70\" y1=\"30\" x2=\"30\" y2=\"70\" stroke=\"red\" stroke-width=\"3\" stroke-linecap=\"round\"/>";

var squares = document.querySelectorAll("svg");

for(var square of squares) {
	square.onclick = (e) => e.target.innerHTML = coinFlip() ? crossSVG : circleSVG;
}