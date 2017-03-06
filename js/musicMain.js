$(document).ready(function() {
    log('ready')
    _main()
})

// 补全时间
const zfill = function(time) {
    if (time.length<2) {
        return "0" + time
    } else {
        return time
    }
}

// 时间函数
const labelFromTime = function(time) {
    let minutes = zfill(String(Math.floor(time / 60)))
    // console.log(Math.floor(time / 60));
    let seconds = zfill(String(Math.floor(time % 60)))
    // console.log(seconds);
    let t = `${minutes}:${seconds}`
    return t
}

// 歌单
var songs = ["./mp3/1.mp3",
            "./mp3/2.mp3",
            "./mp3/3.mp3",
            ]

// 切换
const playNext = function() {
    var audio = e('#id-audio-player')
    var song = audio.src.slice(-5)
    // log('song', song)
    for (var i = 0; i < songs.length; i++) {
        // log('song[i]', songs[i])
        if (songs[i].includes(song)) {
            var active = i
            var next = (active + 1) % songs.length
            log('a', songs[next])
            audio.src = songs[next]
            var id = event.target.id
            playOrPause(id)
            break
        }
    }
}

// 切换 play 和 pause
const playOrPause = function(id) {
    var play = e('.music-play')
    var pause = e('.music-pause')
    var audio = e('#id-audio-player')
    if (id === 'id-img-pause') {
        // 去掉默认参数
        removeClassAll('no-showed')
        toggleClass(pause, 'no-showed')
        audio.pause()
        //动画暂停
        var cover = e('.music-cover')
        cover.style['animation-play-state'] = 'paused'
    } else {
        removeClassAll('no-showed')
        toggleClass(play, 'no-showed')
        audio.play()
        //动画启动
        var cover = e('.music-cover')
        cover.style['animation-play-state'] = 'running'
    }
}

const bindEventPlayOrPause = function() {
    var selector = '.control-playOrPause'
    bindAll(selector, 'click' ,function(event) {
        // log('click on')
        var id = event.target.id
        // log(id)
        playOrPause(id)
    })
}

const bindEventLast = function() {
    var btnLast = e('#id-img-last')
    bindEvent(btnLast, 'click', function(evnet) {
        log('ready last')
        var audio = e('#id-audio-player')
        var song = audio.src.slice(-5)
        // log('song', song)
        for (var i = 0; i < songs.length; i++) {
            // log('song[i]', songs[i])
            if (songs[i].includes(song)) {
                var active = i
                var last = (active + 2) % songs.length
                log('a', songs[last])
                audio.src = songs[last]
                var id = event.target.id
                playOrPause(id)
                break
            }
        }
    })
}

const bindEventNext = function() {
    var btnLast = e('#id-img-next')
    bindEvent(btnLast, 'click', function(evnet) {
        log('ready next')
        playNext()
    })
}

// 循环
const bindEventRepeat = function() {
    var btnLast = e('#id-img-repeat')
    bindEvent(btnLast, 'click', function(evnet) {
        var active = 0
        var audio = e('#id-audio-player')
        log('click on repeat')
        audio.addEventListener('ended', function() {
            log('active', active)
            active = (active + 1) % songs.length
            var song = songs[active]
            log('song', song)
            audio.src = song
            audio.play()
        })
    })
}

const bindEventCategory = function() {
    var btnLast = e('#id-img-category')
    bindEvent(btnLast, 'click', function(evnet) {
        log('ready category')
    })
}

// 监听播放时间 改变滑条
const bindAudioEvents = function() {
    $('#id-audio-player').on('timeupdate', function(e){
        let player = $('#id-audio-player')[0]
        let value = player.currentTime / player.duration
        let v = value * 194
        let m = v - 11
        // console.log(v);
        $('.timelist-ing').css('width', v)
        $("#id-img-process").css('margin-left', m)
        // 设置当前时间 time
        let time = labelFromTime(player.currentTime)
        $('.timelist-start').text(time)
    })

    // 音乐播放完了之后的事件
    $("#id-audio-player").on('ended', function(){
        // console.log("播放结束");
        // 根据按钮样式来播放下一首
        let img = $("#id-img-repeat").attr("src")
        let loop = "./img/repeat.png"
        // log('img', img)
        if (img == loop) {
            // console.log('下一首');
            playNext()
        } else {
            // console.log('循环');
            $('#id-audio-player')[0].loop = true
        }
    })


    // 加载音乐后的事件
    $('#id-audio-player').on('canplay', function(e){
        let player = e.target
        // console.log('can play', player.duration)
        let time = labelFromTime(player.duration)
        // 滑条归位， 时间重置
        $('.timelist-ing').css('width', 0)
        $('.timelist-start').text('00:00')
        $('.timelist-end').text(time)
    })
}

// 监听process click
const bindProcess = function() {
    $('.timelist-slider').on('input', function(e){
        let target = $(e.target)
        // console.log(target);
        let sWidth = target.css('width')
        let sLen = parseInt(sWidth)
        // console.log(sLen);
        let max = target.attr('max')
        let divLen = sLen * (target.val() / max)
        // console.log('divLen', divLen)
        $('.timelist-ing').css('width', divLen)
        $('#id-img-process').css('margin-left', divLen-11)

        let processIng = divLen / sLen
        // console.log("processIng",processIng);
        let player = $('#id-audio-player')[0]
        player.currentTime = player.duration * processIng
    })
}
// 监听
const bindEventListener = function() {
    bindEventPlayOrPause()
    bindEventLast()
    bindEventNext()
    bindEventCategory()
    bindEventRepeat()
    bindAudioEvents()
    bindProcess()
}

// 主函数
const _main = function() {
    bindEventListener()

}
