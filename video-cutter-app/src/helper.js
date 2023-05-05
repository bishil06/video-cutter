export function sameVideo({videoFile: o}, {videoFile: t}) {
    if (o?.duration === t?.duration && o?.size === t?.size) {
        return true
    }
    return false
}

export function getHMS(duration) {
    var sec_num = duration; // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return [hours, minutes, seconds]
}

export function convertHMStoDuration(h, m, s) {
    return s+m*60+h*60*60
}