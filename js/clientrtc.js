//$(document).ready(function(){


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
            videosContainer.insertBefore(htmlElement, videosContainer.firstChild);
            htmlElement.play();
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


    var broadcastUI = broadcast(config);

    /* UI specific */
    var videosContainer = document.getElementById('videos-container') || document.body;
    var setupNewBroadcast = document.getElementById('setup-new-broadcast');
    var roomsList = document.getElementById('rooms-list');

    var broadcastingOption = document.getElementById('broadcasting-option');

    if (setupNewBroadcast) setupNewBroadcast.onclick = setupNewBroadcastButtonClickHandler;

    function hideUnnecessaryStuff() {
        var visibleElements = document.getElementsByClassName('visible'),
            length = visibleElements.length;
        for (var i = 0; i < length; i++) {
            visibleElements[i].style.display = 'none';
        }
    }

//});
