const borderClassOpt1 = `border: 10px solid hsla(0, 0%, 100%, 0.5);
background: white;
background-clip: padding-box;`;

const borderClassOpt2 = `background-color: #fff;
box-shadow: 0 0 0 10px #27c079, 0 0 0 15px #12f3d5;
margin: 15px;`;

const borderClassOpt3 = `background-color: #fff;
border: 10px solid #27c079;
outline: 5px solid #12f3d5;
outline-offset: 10px;
margin: 15px;`;

const borderClassOpt4 = `background: #fff;
border-radius: 10px;
box-shadow: 0 0 0 10px #4eccbb;
outline: 10px solid #4eccbb;
margin: 10px;`;

export default {
    borderClassOpt1,
    borderClassOpt2,
    borderClassOpt3,
    borderClassOpt4
}