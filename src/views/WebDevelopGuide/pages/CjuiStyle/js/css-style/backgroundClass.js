const bgClassOpt1 = `background: linear-gradient(#93efa5 50%, #537d8e 0);
background-size: 100% 30px;`;

const bgClassOpt2 = `background: linear-gradient(#93efa5 33.3%, #537d8e 0, #58a 66.6%, #63c328 0);
background-size: 100% 30px;`;

const bgClassOpt3 = `background: linear-gradient(45deg, #93efa5 25%, #537d8e 0, #537d8e 50%, #93efa5 0, #93efa5 75%, #537d8e 0);
background-size: 30px 30px;`;

const bgClassOpt4 = `background: repeating-linear-gradient(45deg, #93efa5, #93efa5 15px, #537d8e 0, #537d8e 30px);`;

const bgClassOpt5 = `background: #76ca86;
background-image: repeating-linear-gradient(30deg, hsla(0,0%,100%,.1), hsla(0,0%,100%,.1) 15px, transparent 0, transparent 30px);`;

const bgClassOpt6 = `background: #93efa5;background-image: linear-gradient(white 1px, transparent 0), linear-gradient(90deg, white 1px, transparent 0);
background-size: 30px 30px;`;

const bgClassOpt7 = `background: #93efa5;
background-image: linear-gradient(white 2px, transparent 0), 
    linear-gradient(90deg, white 2px, transparent 0), 
    linear-gradient(hsla(0,0%,100%,.3) 1px, transparent 0),
    linear-gradient(90deg, hsla(0,0%,100%,.3) 1px, transparent 0);
background-size: 75px 75px, 75px 75px, 15px 15px, 15px 15px;`;

const bgClassOpt8 = `background: #537d8e;
background-image: radial-gradient(#93efa5 30%, transparent 0), radial-gradient(#93efa5 30%, transparent 0);
background-size: 30px 30px;
background-position: 0 0, 15px 15px;`;

const bgClassOpt9 = `background: #eee;
background-image:
    linear-gradient(45deg, rgba(0,0,0,.25) 25%, transparent 0, transparent 75%, rgba(0,0,0,.25) 0),
    linear-gradient(45deg, rgba(0,0,0,.25) 25%, transparent 0, transparent 75%, rgba(0,0,0,.25) 0);
background-position: 0 0, 15px 15px;
background-size: 30px 30px;`;

const bgClassOpt10 = `background: #eee url('data:image/svg+xml, 
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25">
        <rect x="50" width="50" height="50" />
        <rect y="50" width="50" height="50" />
    </svg>');
background-size: 30px 30px;`;

const bgClassOpt11 = `background: hsl(20, 40%, 90%);
background-image:
    linear-gradient(90deg, #fb3 11px, transparent 0),
    linear-gradient(90deg, #ab4 23px, transparent 0),
    linear-gradient(90deg, #655 41px, transparent 0);
background-size: 41px 100%, 61px 100%, 83px 100%;  /* 平铺贴片重合的尺寸 41×61×83=207583 px */`;

export default {
    bgClassOpt1,
    bgClassOpt2,
    bgClassOpt3,
    bgClassOpt4,
    bgClassOpt5,
    bgClassOpt6,
    bgClassOpt7,
    bgClassOpt8,
    bgClassOpt9,
    bgClassOpt10,
    bgClassOpt11
}