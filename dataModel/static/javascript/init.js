var selectedOne = false;
var stage = new Kinetic.Stage({
	container : 'container',
	width : 500,
	height : 300
});
var birdsLayer = new Kinetic.Layer();
var spotsLayer = new Kinetic.Layer();

var birdsGroup = new Kinetic.Group();
var spotsGroup = new Kinetic.Group();


var colors = ["red", "orange", "yellow", "green", "blue", "purple", "black", "white"];
var bird = new Array();
var spot = new Array();

for(var i = 0; i < 8; i++) {
	// anonymous function to induce scope
	bird[i] = new Kinetic.Circle({
		name: colors[i],
		x: i * 50 + 50,
		y: 50,
		fill: colors[i],
		stroke: "808080",
		strokeWidth: 4,
		radius: 20
	});
	spot[i] = new Kinetic.Circle({
		name: "spot" + i,
		x: i * 50 + 50,
		y: 150,
		stroke: "black",
		strokeWidth: 2,
		radius: 25
	});

	birdsGroup.add(bird[i]);
	spotsGroup.add(spot[i]);
}

birdsGroup.on('click tap', function(evt) {
	var shape = evt.targetNode;
	if (selectedOne != false && selectedOne.getName() != shape.getName()) {
		//unselect the previously selected and select new one
		selectedOne.setStroke("808080");
		shape.setStroke("4DD8EE");
		selectedOne = shape;
	} else if (selectedOne != false && selectedOne.getName() == shape.getName()) {
		//unselect the previously selected
		shape.setStroke("808080");
		selectedOne = false;
	} else {
		//select new one
		shape.setStroke("4DD8EE");
		selectedOne = shape;
	}
	birdsLayer.draw();
});

spotsGroup.on('click tap', function(evt) {
	var shape = evt.targetNode;
	if (selectedOne != false) {
		selectedOne.setStroke("808080");
		/*selectedOne.transitionTo({
			x: shape.getX(),
			y: shape.getY(),
			duration: 0.1
		});*/
		var tween = new Kinetic.Tween({
	        node: selectedOne, 
	        duration: 0.1,
	        x: shape.getX(),
	        y: shape.getY(),
	    });
		tween.play();
		selectedOne = false;
	}
	birdsLayer.draw();
});

birdsGroup.on("mouseover", function(e) {
	document.body.style.cursor = "pointer";
});
birdsGroup.on("mouseout", function(e) {
	document.body.style.cursor = "default";
});

spotsGroup.on("mouseover", function(e) {
	document.body.style.cursor = "pointer";
});
spotsGroup.on("mouseout", function(e) {
	document.body.style.cursor = "default";
});

birdsLayer.add(birdsGroup);
birdsLayer.draw();
spotsLayer.add(spotsGroup);
spotsLayer.draw();
//sequence matters
stage.add(spotsLayer);
stage.add(birdsLayer);