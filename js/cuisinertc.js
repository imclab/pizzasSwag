//$(document).ready(function(){
    // VIDEO
    var config = {
        openSocket: function (config) {
            var SIGNALING_SERVER = 'https://www.webrtc-experiment.com:8553/',
            defaultChannel = location.hash.substr(1) || 'webrtc-oneway-broadcasting';

            var channel = config.channel || defaultChannel;
            var sender = Math.round(Math.random() * 999999999) + 999999999;

            io.connect(SIGNALING_SERVER).emit('new-channel', {
                channel: channel,
                sender: sender
            });

            var socket = io.connect(SIGNALING_SERVER + channel);
            socket.channel = channel;
            socket.on('connect', function() {
                if (config.callback) config.callback(socket);
            });

            socket.send = function(message) {
                socket.emit('message', {
                    sender: sender,
                    data: message
                });
            };

            socket.on('message', config.onmessage);
        },
        onRemoteStream: function (htmlElement) {
        },
        onRoomFound: function (room) {
            var alreadyExist = document.querySelector('button[data-broadcaster="' + room.broadcaster + '"]');
            if (alreadyExist) return;

            if (typeof roomsList === 'undefined') roomsList = document.body;

            var broadcaster = room.broadcaster;
            var roomToken = room.broadcaster;
            broadcastUI.joinRoom({
                roomToken: roomToken,
                joinUser: broadcaster
            });
        },
        onNewParticipant: function (numberOfViewers) {
            document.title = 'Viewers: ' + numberOfViewers;
        }
    };

    function setupNewBroadcastButtonClickHandler() {
        captureUserMedia(function () {
            var shared = 'video';
            broadcastUI.createRoom({
                roomName: 'pizzaswag',
                isAudio: shared === 'audio'
            });
        });
        hideUnnecessaryStuff();
    }

    function captureUserMedia(callback) {
        var constraints = {
            audio: false,
            video: true
        };

        var htmlElement = document.createElement('video');
        htmlElement.id = 'videoCaca';
        htmlElement.setAttribute('autoplay', true);
        videosContainer.insertBefore(htmlElement, videosContainer.firstChild);

        var mediaConfig = {
            video: htmlElement,
            onsuccess: function (stream) {
                config.attachStream = stream;
                callback && callback();

                htmlElement.setAttribute('muted', true);
            },
            onerror: function () {
                if (option === 'Only Audio') alert('unable to get access to your microphone');
                else if(option === 'Screen') {
                    if(location.protocol === 'http:') alert('Please test this WebRTC experiment on HTTPS.');
                    else alert('Screen capturing is either denied or not supported. Are you enabled flag: "Enable screen capture support in getUserMedia"?');
                }
                else alert('unable to get access to your webcam');
            }
        };
        if (constraints) mediaConfig.constraints = constraints;
        getUserMedia(mediaConfig);
    }

    var broadcastUI = broadcast(config);

    /* UI specific */
    var videosContainer = document.getElementById('videos-container') || document.body;
    var roomsList = document.getElementById('rooms-list');

    var broadcastingOption = document.getElementById('broadcasting-option');

    function hideUnnecessaryStuff() {
        var visibleElements = document.getElementsByClassName('visible'),
            length = visibleElements.length;
        for (var i = 0; i < length; i++) {
            visibleElements[i].style.display = 'none';
        }
    }





//});
