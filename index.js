auto.waitFor();
device.keepScreenOn(30 * 24 * 60 * 60 * 1000); // 屏幕常亮
setInterval(() => {}, 1000);

var first = true; // 判断第一次，需要定义悬浮窗
var flag = false; // 悬浮窗遮蔽判断
var x;
var downTime;

if (hamibot.env.touch) {
    toastLog("已经屏蔽触摸");
} else {
    toastLog("未屏蔽触摸");
}
if (hamibot.env.start == 'b') { // 初始状态为熄屏时
    first = false;
    flag = true;
    x = floaty.rawWindow('<frame id="but" bg="#ff000000"/>');
    x.setSize(5000, 5000);
    x.setTouchable(hamibot.env.touch);
    x.setPosition(-100, -100);
}
//启用按键监听
events.observeKey();
var key = '';
if (hamibot.env.setting == "a") {
    toastLog("按压音量上键，熄屏与亮屏来回切换");
    toastLog("按压超过3s，则退出脚本");
    key = 'volume_up';
} else {
    toastLog("按压音量下键，熄屏与亮屏来回切换");
    toastLog("按压超过3s，则退出脚本");
    key = 'volume_down';
}
events.onKeyDown(key, function (event) {
    //	音量 按下
    downTime = new Date().getTime();
});
events.onKeyUp(key, function (event) {
    //	音量 抬起
    if (new Date().getTime() - downTime < 1000) {
        if (flag) {
            toastLog("再次按压则恢复熄屏，长按3s退出脚本");
            x.setPosition(5000, 5000);
            flag = false;
        } else {
            if (first) {
                x = floaty.rawWindow('<frame id="but" bg="#ff000000"/>');
                x.setSize(5000, 5000);
                x.setTouchable(hamibot.env.touch);
                first = false;
            }
            x.setPosition(-100, -100);
            flag = true;
        }
    } else if (new Date().getTime() - downTime > 3000) {
        toastLog("按压时间超过3s，脚本退出！！！");
        exit();
    }
});
