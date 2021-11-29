import { merge, cloneDeep } from 'lodash';

// 统一设置
const basicOptions = {
    title: {
        show: false,  // 不使用echarts自带的title
    },
    legend: {
        type: 'scroll',  // 使用滚动图例
        left: 'center',  // 位置默认底部居中
        top: 'bottom',
    },
    grid: {
        left: 10,
        top: 30,
        right: 20,
        bottom: 30,
        containLabel: true,  // grid 区域包含坐标轴
    },
}

// 线柱图基础设置
const barOptions = {
    xAxis: {
        type: "category",  // 类目轴，适用于离散的类目数据
        axisLine: {
            show: true,
            lineStyle: {
                width: 1,
                type: "line"
            },
        },
        axisTick: {  // 坐标轴刻度设置
            show: false,
        },
        axisLabel: {  // 坐标轴刻度标签设置
            fontSize: 12,
        },
    },
    yAxis: {
        type: 'value',
        nameTextStyle: {
            padding: [0, 0, 0, 0],
            fontSize: 14
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: "dashed"
            }
        },
        axisTick: {
            show: true,
            lineStyle: {
                width: 1
            },
        },
        axisLabel: {
            fontSize: 12
        },
        axisLine: {
            show: true,
            lineStyle: {
                width: 1,
                type: "line"
            },
        },
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }  
    },
    series: {
        type: "bar",
        barMaxWidth: "auto",
        barWidth: 30,
        label: {
            show: true,
            position: "top",
        }
    }
}

// 线柱图基础设置 - 夜间模式
const barNightOptions = {
    legend: {
        textStyle: {
            color: '#c0c3cd'
        }
    },
    xAxis: {
        axisLine: {
            lineStyle: {
                color: "#384267",
            },
        },
        axisLabel: {
            color: "#c0c3cd",
        }
    },
    yAxis: {
        type: 'value',
        nameTextStyle: {
            color: "#c0c3cd",
        },
        splitLine: {
            lineStyle: {
                color: "#384267",
            }
        },
        axisTick: {
            lineStyle: {
                color: "#384267",
            },
        },
        axisLabel: {
            color: "#c0c3cd",  // Y轴文字
        },
        axisLine: {
            lineStyle: {
                color: "#384267",
            },
        },
    },
    series: {
        itemStyle: {
            color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: "linear",
                global: false,
                colorStops: [{
                    offset: 0,
                    color: "#00FCFF",
                }, {
                    offset: 1,
                    color: "#0B1A39"
                }]
            }
        },
        label: {
            color: '#c0c3cd'
        }
    },
    color: ["#00FCFF","#FFDF1C","#5AB72C","#FF715A","#2F9BFF"],  // 自定义默认色彩序列
}

// 基础线柱图 - 获取基础配置
export function getBarOptions(theme = 'day', styleType = 'default') {
    if (theme === 'day') {
        return merge({}, basicOptions, barOptions);
    } else {
        return merge({}, basicOptions, barOptions, barNightOptions);
    }
}

// 基础线柱图 - legend 设置
export function initBarLegend(arr = [], theme = 'night') {
    let legendOpt = {};
    if (Array.isArray(arr) && arr.length) {
        if (theme === 'day') {

        } else {
            legendOpt = merge(basicOptions.legend, barNightOptions.legend);
        }
        
        legendOpt.data = [];
        
        arr.forEach(el => {
            legendOpt.data.push({
                name: el.name,
                icon: el.icon || 'rect'
            });
        });

        return legendOpt
    }
}

// 基础线柱图 - Series 配置
export function initBarSeries(arr = [], theme = 'night') {
    if (Array.isArray(arr) && arr.length > 0) {
        return arr.map(el => {
            if (!el.type) {
                return {}
            }

            if (el.type === 'bar') {
                if (theme === 'day') {
                    return {}
                } else {
                    return merge({}, barOptions.series, barNightOptions.series, el)
                }
                
            } else if (el.type === 'line') {
                return {}
            }
        });
    }

    return {}
}

// 基础线柱图 - xAxis 配置
export function initBarxAxis(arr = [], theme = 'night') {
    
}

// 基础线柱图 - 生成完整配置和数据
export class BarOptBuilder {
    constructor(option = {}, styleType = 'default') {
        this.option = option;
        this.styleType = styleType;
    }

    getNightOption() {
        let option = {};

        option = merge(basicOptions, barOptions, barNightOptions, this.option);

        return option
    }
}