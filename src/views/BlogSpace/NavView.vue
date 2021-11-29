<template>
  	<div class="BlogSpaceNavView">
    	<div class="header">
    	  	<div class="container-xl">
    	  	  	<nav class="navbar navbar-expand-lg navbar-dark">
    	  	  	  	<a class="navbar-brand" @click="titleEvent">{{ title }}</a>
    	  	  	  	<button class="navbar-toggler" type="button"
    	  	  	  	  	data-toggle="collapse"
    	  	  	  	  	data-target="#navbarSupportedContent"
    	  	  	  	  	aria-controls="navbarSupportedContent"
    	  	  	  	  	aria-expanded="false"
    	  	  	  	  	aria-label="Toggle navigation"
    	  	  	  	  	>
    	  	  	  	  	<span class="navbar-toggler-icon"></span>
    	  	  	  	</button>

    	  	  	  	<div class="collapse navbar-collapse" id="navbarSupportedContent">
    	  	  	  	  	<ul class="navbar-nav mr-auto">
    	  	  	  	  	  	<li class="nav-item" v-for="(item, i) in navList" :key="i" :class="$route.path.includes(item.path) && item.active? 'active': ''">
                                <a class="nav-link" @click="$router.push(item.path)">{{ item.name }}</a>
    	  	  	  	  	  	</li>
    	  	  	  	  	</ul>
    	  	  	  	  	<form class="form-inline my-2 my-lg-0">
    	  	  	  	  	  	<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
    	  	  	  	  	  	<button class="btn btn-outline-white my-2 my-sm-0" type="submit">Search</button>
    	  	  	  	  	</form>
    	  	  	  	</div>
    	  	  	</nav>
    	  	</div>
    	</div>

    	<div class="banner">
			<slot name="banner">
    	 		<div class="container-xl">
    	 		  	<h1>{{ bannerTitle? bannerTitle: title }}</h1>
    	 		  	<p>{{ bannerText }}</p>
    	 		</div>
			</slot>
    	</div>

        <div class="canvas-wrap">
            <canvas id="myblogCanvas"></canvas>
        </div>

        <el-backtop target=".BlogSpaceNavView"></el-backtop>

        <div class="body">
            <slot></slot>
        </div>
  	</div>
</template>

<script>
export default {
  	name: 'BlogSpaceNavView',
	components:{
	},
	props: {
		title: {
			type: String,
			default: '标题'
		},
		navList: {
			type: Array,
			default: []
		},
		bannerTitle: {
			type: String,
			default: ''
		},
		bannerText: {
			type: String,
			default: 'Web前端技术博客，多人加入，共同编写，记录技术点点滴滴。'
		}
	},
  	data() {
    	return {
            cvs: null,
            ctx: null,
            waves: [],
            waveHeight: 30,
            colours: ["#f00", "#0f0", "#00f"],
            scrollH: 0,
            topH: 0,
            timer: null
    	};
	},
	methods: {
        init() {
            this.cvs = document.getElementById("myblogCanvas");
            this.ctx = this.cvs.getContext("2d");
            this.resizeCanvas(this.cvs);

            for (let i = 0; i < 3; i++) {
                this.wave(this.colours[i], 1, 5);
            }
            this.timer = setInterval(this.update, 16);
        },
        resizeCanvas(canvas, width, height) {
            if (width && height) {
                canvas.width = width;
                canvas.height = height;
            } else {
                if (window.innerHeight > 1920) {
                    canvas.width = window.innerWidth;
                } else {
                    canvas.width = 1920;
                }

                canvas.height = this.waveHeight;
            }
        },
        wave(colour, lambda, nodes) {
            let nodeList = [];
            for (let i = 0; i <= nodes + 2; i++) {
                let temp = [
                    ((i - 1) * this.cvs.width) / nodes,
                    0,
                    Math.random() * 200,
                    0.3,
                ];
                nodeList.push(temp);
            }
            this.waves.push({
                colour: colour,
                lambda: lambda,
                nodes: nodeList,
            });
        },
        update() {
            let fill = window
                .getComputedStyle(document.querySelector(".banner"), null)
                .getPropertyValue("background-color");
            this.ctx.fillStyle = fill;
            this.ctx.globalCompositeOperation = "source-over";
            this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
            this.ctx.globalCompositeOperation = "screen";
            for (let i = 0; i < this.waves.length; i++) {
                for (let j = 0; j < this.waves[i].nodes.length; j++) {
                    this.bounce(this.waves[i].nodes[j]);
                }
                this.drawWave(this.waves[i]);
                //drawLine(waves[i].nodes);
                //drawNodes(waves[i].nodes);
            }
            this.ctx.globalCompositeOperation = "hue";
            this.ctx.fillStyle = fill;
            //ctx.fillRect(0,0,cvs.width,cvs.height);
        },
        bounce(node) {
            node[1] =
                (this.waveHeight / 2) * Math.sin(node[2] / 20) + this.cvs.height / 2;
            node[2] = node[2] + node[3];
        },
        drawWave(obj) {
            var diff = function (a, b) {
                return (b - a) / 2 + a;
            };
            this.ctx.fillStyle = obj.colour;
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.cvs.height);
            this.ctx.lineTo(obj.nodes[0][0], obj.nodes[0][1]);
            for (let i = 0; i < obj.nodes.length; i++) {
                if (obj.nodes[i + 1]) {
                    this.ctx.quadraticCurveTo(
                        obj.nodes[i][0],
                        obj.nodes[i][1],
                        diff(obj.nodes[i][0], obj.nodes[i + 1][0]),
                        diff(obj.nodes[i][1], obj.nodes[i + 1][1])
                    );
                } else {
                    this.ctx.lineTo(obj.nodes[i][0], obj.nodes[i][1]);
                    this.ctx.lineTo(this.cvs.width, this.cvs.height);
                }
            }
            this.ctx.closePath();
            this.ctx.fill();
        },
		titleEvent() {
		  	this.$emit('titleEvent');
		},
	},
    mounted() {
      	this.init();
    },
    beforeUnmount() {
        clearInterval(this.timer);
    }
}
</script>

<style lang="scss" scoped>
.BlogSpaceNavView {
    font-family: "Lato", sans-serif;
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
}
.header {
  	background-color: #3edfa5;
  	border-bottom: 1px solid #40cead;
  	position: fixed;
  	top: 0;
  	left: 0;
  	right: 0;
  	z-index: 1;

  	a {
  	  	cursor: pointer;
  	}
}
.banner {
  	background-color: #41c7af;
  	background-image: linear-gradient(to bottom, rgba(58, 249, 153, 0.5), transparent);
  	padding: 2rem;
  	color: #fff;
  	text-align: center;
  	margin-top: 57px;
}
.canvas-wrap {
  	max-width: 100%;
  	overflow: hidden;
  	position: relative;
	  
	canvas {
  		display: block;
	}
}

:deep(.el-backtop) {
  	color: #41c7af;
}

// ======btn-outline-white
.btn-outline-white {
  	& {
  	  	color: #ffffff;
  	  	border-color: #ffffff;
  	}
  	&:hover {
  	  	background: #ffffff;
  	  	color: #54e38e;
  	}
  	&:focus {
  	  	box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.2);
  	}
}
</style>
