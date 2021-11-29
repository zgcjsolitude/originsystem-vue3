const shapeClassOpt1 = `background: #93efa5;
background: 
    linear-gradient(135deg, transparent 15px, #93efa5 0) top left,
    linear-gradient(-135deg, transparent 15px, #93efa5 0) top right,
    linear-gradient(-45deg, transparent 15px, #93efa5 0) bottom right,
    linear-gradient(45deg, transparent 15px, #93efa5 0) bottom left; background-size: 50% 50%;
background-repeat: no-repeat;`;

const shapeClassOpt2 = `background: #93efa5;
background:
    radial-gradient(circle at top left,
    transparent 15px, #93efa5 0) top left,
    radial-gradient(circle at top right,
    transparent 15px, #93efa5 0) top right,
    radial-gradient(circle at bottom right,
    transparent 15px, #93efa5 0) bottom right,
    radial-gradient(circle at bottom left,
    transparent 15px, #93efa5 0) bottom left;
background-size: 50% 50%;
background-repeat: no-repeat;`;

const shapeClassOpt3 = `& {
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
    position: relative;
    z-index: 1;
}
&:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: #93efa5;
    transform: skew(45deg);
}`;

const shapeClassOpt4 = `width: 200px;
height: 50px;
line-height: 50px;
text-align: center;
color: #ffffff;
background: #93efa5;
clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);`;

export default {
    shapeClassOpt1,
    shapeClassOpt2,
    shapeClassOpt3,
    shapeClassOpt4
}