const graphElement = document.getElementById('graph');
const nodeDimensions = {width: 32, height: 24};
fetch('./data/dataset.json')
	.then(res => res.json())
	.then(data => {
		data.nodes.map(node => {
			const img = new Image();
			img.src = `./images/${node.title}.png`;
			node.image = img;
			return node;
		});

		const Graph = ForceGraph()(graphElement)
			.nodeCanvasObject(({ image, x, y }, ctx) => {
        		const size = 12;
        		ctx.drawImage(image, x - nodeDimensions.width / 2, y - nodeDimensions.height / 2, nodeDimensions.width, 24);
      		})
      		.nodePointerAreaPaint((node, color, ctx) => {
        		const size = 12;
        		ctx.fillStyle = color;
        		ctx.fillRect(node.x - nodeDimensions.width / 2, node.y - nodeDimensions.height / 2, nodeDimensions.width, 24);
      		})
			.graphData(data)
			.linkDirectionalParticles(2)
			.nodeLabel('title')
			.nodeId('worldId')
		;
	});
	
