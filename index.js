auto.waitFor();

device.keepScreenOn(365 * 24 * 60 * 60 * 1000); // 屏幕常亮365天
var first = true; // 判断第一次，需要定义悬浮窗
var flag = false; // 悬浮窗遮蔽判断
var storage = storages.create('fakeScreen'); // 定义
storage.put('light', flag);
var x; // 悬浮窗
var downTime; // 记录按下的时间

if (hamibot.env.touch) {
    toastLog("选择了熄屏屏蔽触摸");
}
if (hamibot.env.start == 'b') { // 初始状态为熄屏时
    storage.put('light', true);
    first = false;
    flag = true;
    x = floaty.rawWindow('<frame id="but" bg="#ff000000"/>');
    x.setSize(5000, 5000);
    x.setTouchable(hamibot.env.touch);
    x.setPosition(-1000, -1000);
}
//启用按键监听  无障碍权限
events.observeKey();
var key = '';
if (hamibot.env.setting == "a") {
    toastLog("按压音量上键，熄屏与亮屏来回切换");
    key = 'volume_up';
} else {
    toastLog("按压音量下键，熄屏与亮屏来回切换");
    key = 'volume_down';
}
toastLog("按压超过3s,则退出脚本");
events.onKeyDown(key, function (event) {
    //	音量 按下
    downTime = new Date().getTime();
});
events.onKeyUp(key, function (event) {
    //	音量 抬起
    change(false);
});

function change(i) { // 切换熄屏亮屏状态
    if (i || new Date().getTime() - downTime < 1000) {
        if (flag) {
            toastLog("再次按压则恢复熄屏, 长按3s退出脚本");
            x.setPosition(5000, 5000);
        } else {
            if (first) { // 第一次运行，需要定义悬浮窗
                x = floaty.rawWindow('<frame id="but" bg="#ff000000"/>');
                x.setSize(5000, 5000);
                x.setTouchable(hamibot.env.touch);
                first = false;
            }
            x.setPosition(-1000, -1000);
        }
        flag = !flag;
        storage.put('light', flag);
    } else if (new Date().getTime() - downTime > 3000) {
        toastLog("按压时间超过3s,脚本退出！！！");
        exit();
    }
}
setInterval(() => {
    if (flag != storage.get('light')) { // 其他脚本改变storage
        change(true);
    }
}, 3000);
