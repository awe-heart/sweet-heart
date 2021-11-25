onload = function () {
    setInterval(auto_chenge,3000);
    initDate();
};


// 统计表格展示区切换按钮
function chenge(url) {

    // 按钮变化
    let allElement = event.target.parentElement.children;
    for(let i of allElement){
        i.style.backgroundColor = `rgb(242,242,242)`;
        i.style.boxShadow = `none`;
    }
    event.target.style.backgroundColor = `white`;
    event.target.style.boxShadow = `white 0px 3px 0px 0px`;

    // 图表变化
    let image = event.target.parentElement.nextElementSibling;
    image.src = url;

    if(url.indexOf('png') !== -1){
        image.style.transform = "scale(0.94,0.7)";
    }else{
        image.style.transform = "scale(1,1)";
    }

}

// 轮播图切换按钮
function chengeImg(index) {

    //按钮变化
    let allElement = event.target.parentElement.children;
    for(let i of allElement){
        if(i.src){
            i.src = "img/point.png";
        }
    }
    event.target.src = "img/current.png";
    //图像变化
    let img_list = ['img/01.jpg','img/02.jpg','img/03.jpg'];

    event.target.parentElement.previousElementSibling.src = img_list[index];
}

// 轮播图自动切换函数
function auto_chenge() {

    let current_button = 0;
    let button_list = [];
    let parent_content = document.querySelector("#top_left > div").children;
    for(let i of parent_content){
        if(i.src){
            button_list.push(i);
        }
    }
    for(let i in button_list){
        if(button_list[i].src.indexOf("current") !==-1){
            current_button = i;
            current_button++;
            if(current_button < 0 || current_button > 2){
                current_button = 0;
            }
        }
    }

    button_list[current_button].click();

}



// 日历月份切换按钮
function calendarButton(num) {

    // 月份变换
    let span = document.querySelector("#top_right > div:nth-child(1) > span:nth-child(3)");
    let oldDate = span.innerText;
    let oldDateList = oldDate.split(/(年|月)/gim);
    let newDateYear = Number(oldDateList[0]);
    let newDateMonth = Number(oldDateList[2])+num;
    if(newDateMonth > 12 || newDateMonth < 1){
        newDateMonth = 1;
        if(num < 0){
            newDateMonth = 12;
        }
        newDateYear += num;
    }
    let newDate = newDateYear + "年" + newDateMonth + "月";
    span.innerHTML = newDate;
    document.querySelector("#top_right > div:nth-child(3) > span:nth-child(1)").innerHTML = "建国"+(newDateYear-1949)+"周年";
    // 年份显示
    event.target.src = 'img/calendar_arrow_black.png';

    // 日历表变换
    // let newCalendarDate = new Date(newDateYear+'-'+newDateMonth+'-01');
    // let calendarDate = calendarCells(newCalendarDate);
    // let total = 1;
    // let sum = 31;
    // for(let i of calendarDate){
    //     for(let j of i.cells){
    //         j.innerHTML = total;
    //         total++;
    //         if(total > sum){
    //             break;
    //         }
    //     }
    // }

}

// 日历点击变换
function chengeDown() {
    event.target.src = 'img/calendar_arrow_grey.png';
}

// 当前年月份
function initDate() {

    let date = new Date();
    let span = document.querySelector("#top_right > div:nth-child(1) > span:nth-child(3)");
    span.innerHTML = date.getFullYear()+"年"+(date.getMonth()+1)+"月";
    document.querySelector("#top_right > div:nth-child(3) > span:nth-child(1)").innerHTML = "建国"+(date.getFullYear()-1949)+"周年";

}

// 获取日历表格函数
function calendarCells(weekday) {
    let oldRows = document.querySelector("#top_right > table").rows;
    let newRows = [[],oldRows[2],oldRows[3],oldRows[4],oldRows[5]];

    for(let i=weekday-1;i++;i<7){
        newRows[0].push(oldRows[1][i])
    }
    return newRows;
}