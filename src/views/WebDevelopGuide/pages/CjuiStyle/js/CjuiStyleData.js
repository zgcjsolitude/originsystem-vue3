import shapeClass from './css-style/shapeClass';
import borderClass from './css-style/borderClass';
import backgroundClass from './css-style/backgroundClass';

export const updateLogOpt = {
    "name": "cjui-style",
    "version": "1.0.0",
    "dependencies": [],
    "updateLog": [
        {
            "title": "cjui-style@1.1.0",
            "date": "2021/7/17",
            "textList": [
                "1. 文档界面增加了右侧锚点功能。",
                "2. 文档界面增加了全屏展示功能。",
            ]
        },
        {
            "title": "cjui-style@1.0.0",
            "date": "2021/7/10",
            "textList": [
                "1. 正式发布了cjui-style板块，内含渐变、滤镜、形状、边框、背景合计5个子模块。",
            ]
        },
    ]
}

export const colorOpt = {
    routerPath: '/CjuiStyle/colorStyle',
    list: [
        {
            title: '浅亮色系',
            anchor: 'colorLight',
            intro: '',
            list: [
                // {
                //     name: "background: linear-gradient(45deg, #F78FAD, #FDEB82);",
                //     color: "",
                // },
            ]
        },
    ]
}

export const gradientstOpt = {
    routerPath: '/CjuiStyle/gradientStyle',
    list: [
        {
            title: '浅色渐变',
            anchor: 'gradientsLight',
            intro: '',
            list: [
                {
                    name: "background: linear-gradient(45deg, #F78FAD, #FDEB82);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #F9957F, #F2F5D0);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #99E5A2, #D4FC78);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #0CCDA3, #C1FCD3);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #EAD6EE, #A0F1EA);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #EAE5C9, #6CC6CB);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #ABC7FF, #C1E3FF);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #6CACFF, #8DEBFF);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #F5CCF6, #F1EEF9);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #F0EFF0, #FAF8F9);",
                    color: "color:#333;",
                },
            ]
        },
        {
            title: '明亮渐变',
            anchor: 'gradientsBright',
            intro: '',
            list: [
                {
                    name: "background: linear-gradient(45deg, #FF0078, #F6EFA7);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #F254A8, #DAFEA4);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #849B5C, #BFFFC7);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #7DC387, #DBE9EA);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #6DE195, #C4E759);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #41C7AF, #54E38E);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #07A3B2, #D9ECC7);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #9FA5D5, #E8F5C8);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #5583EE, #41D8DD);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #0C7BB3, #F2BAE8);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #9600FF, #AEBAF8);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #A16BFE, #DEB0DF);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #BB73E0, #FF8DDB);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #D279EE, #F8C390);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #AE8BA1, #F2ECB6);",
                    color: "",
                },
            ],      
        },
        {
            title: '深色渐变',
            anchor: 'gradientsDarken',
            intro: '',
            list: [
                {
                    name: "background: linear-gradient(45deg, #E65758, #771D32);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #A96F44, #F2ECB6);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #E27C39, #E3FF73);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #50D587, #067D68);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #AF6480, #C3CEE5);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #58126A, #F6B2E1);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #A43AB2, #E13680);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #9D2E7D, #E16E93);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #BC3D2F, #A16BFE);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(45deg, #121317, #323B42);",
                    color: "color:#eee;",
                },
            ],  
        },
        {
            title: '色差渐变',
            anchor: 'gradientsAberration',
            intro: '',
            list: [
                {
                    name: "background: linear-gradient(-45deg, #CCFBFF, #EF96C5);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(-45deg, #5FFAE0, #C22ED0);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(-45deg, #64B5F6, #F403D1);",
                    color: "",
                },
                {
                    name: "background: linear-gradient(-45deg, #24FF72, #9A4EFF);",
                    color: "",
                },
            ],
        }
    ]
}

export const filterOpt = {
    routerPath: '/CjuiStyle/filterStyle',
    list: [
        {
            title: '滤镜样式收藏',
            anchor: 'filterAberration',
            intro: '',
            list: [
                {
                    name: "filter: grayscale(50%);",
                    color: ""
                },
                {
                    name: "filter: saturate(360%);",
                    color: ""
                },
                {
                    name: "filter: sepia(100%);",
                    color: ""
                },
                {
                    name: "filter: invert(100%);",
                    color: ""
                },
                {
                    name: "filter: opacity(50%);",
                    color: ""
                },
                {
                    name: "filter: brightness(120%);",
                    color: ""
                },
                {
                    name: "filter: contrast(160%);",
                    color: ""
                },
                {
                    name: "filter: hue-rotate(160deg);",
                    color: ""
                },
                {
                    name: "filter: blur(2px);",
                    color: ""
                },
            ]
        }
    ]
}

export const shapeOpt = {
    routerPath: '/CjuiStyle/shapeStyle',
    list: [
        {
            title: '切角',
            anchor: 'shape1',
            intro: '',
            style: shapeClass.shapeClassOpt1,
            className: 'shape_class1'
        },
        {
            title: '内凹角',
            anchor: 'shape2',
            intro: '',
            style: shapeClass.shapeClassOpt2,
            className: 'shape_class2'
        },
        {
            title: '平行四边形',
            anchor: 'shape3',
            intro: '',
            style: shapeClass.shapeClassOpt3,
            className: 'shape_class3'
        },
        {
            title: '菱形',
            anchor: 'shape4',
            intro: '',
            style: shapeClass.shapeClassOpt4,
            className: 'shape_class4'
        },
    ]
}

export const borderOpt = {
    routerPath: '/CjuiStyle/borderStyle',
    list: [
        {
            title: '半透明边框',
            anchor: 'border1',
            intro: '',
            list: [
                {
                    intro: '半透明边框',
                    style: borderClass.borderClassOpt1,
                    className: 'border_class1'
                }
            ]
        },
        {
            title: '多重边框',
            anchor: 'border2',
            list: [
                {
                    intro: '多重边框1',
                    style: borderClass.borderClassOpt2,
                    className: 'border_class2'
                }, 
                {

                    intro: '多重边框2',
                    style: borderClass.borderClassOpt3,
                    className: 'border_class3'
                }
            ]
        },
        {
            title: '边框内圆角',
            anchor: 'border3',
            list: [
                {
                    intro: '边框内圆角',
                    style: borderClass.borderClassOpt4,
                    className: 'border_class4'
                }
            ]
        },
    ]
}

export const backgroundOpt = {
    routerPath: '/CjuiStyle/backgroundStyle',
    list: [
        {
            title: '条纹',
            anchor: 'background1',
            list: [
                {
                    intro: '利用渐变完成效果，其中渐变参数位置值设置为 0 ，那它的位置为前一色标的位置值。',
                    style: backgroundClass.bgClassOpt1,
                    className: 'bg_class1'
                },
                {
                    intro: '创建多条。',
                    style: backgroundClass.bgClassOpt2,
                    className: 'bg_class2'
                },
                {
                    intro: '斜向45度。',
                    style: backgroundClass.bgClassOpt3,
                    className: 'bg_class3'
                },
                {
                    intro: '斜向条纹加强版，任意角度。',
                    style: backgroundClass.bgClassOpt4,
                    className: 'bg_class4'
                },
                {
                    intro: '同色系条纹。',
                    style: backgroundClass.bgClassOpt5,
                    className: 'bg_class5'
                },
            ]
        },
        {
            title: '网格',
            anchor: 'background2',
            list: [
                {
                    intro: '',
                    style: backgroundClass.bgClassOpt6,
                    className: 'bg_class6'
                },
                {
                    intro: '多网格重叠',
                    style: backgroundClass.bgClassOpt7,
                    className: 'bg_class7'
                },
            ]
        },
        {
            title: '波点',
            anchor: 'background3',
            list: [
                {
                    intro: '',
                    style: backgroundClass.bgClassOpt8,
                    className: 'bg_class8'
                },
            ]
        },
        {
            title: '棋盘',
            anchor: 'background4',
            list: [
                {
                    intro: '',
                    style: backgroundClass.bgClassOpt9,
                    className: 'bg_class9'
                },
                {
                    intro: '引入',
                    style: backgroundClass.bgClassOpt10,
                    className: 'bg_class10'
                },
            ]
        },
        {
            title: '伪随机背景',
            anchor: 'background5',
            list: [
                {
                    intro: '通过相对质数进行重复贴片尺寸最大化。',
                    style: backgroundClass.bgClassOpt11,
                    className: 'bg_class11'
                },
            ]
        },
    ]
}

export const cjuiStyleList = [
    colorOpt,
    gradientstOpt, 
    filterOpt,
    shapeOpt,
    borderOpt,
    backgroundOpt,
]
