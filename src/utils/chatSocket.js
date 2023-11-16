const { decode } = require('./jwt');
const dbContext = require('./dbContext');

function getDatetime() {
    const now = new Date();
    now.setHours(now.getHours() + 7);

    return now;
}

module.exports = function (io) {
    io.on('connection', (socket) => {

        //new user connect
        socket.on('new-user', data => {
            //decode data
            let decoded = decode(data);
            
            if (decoded)
                socket.join(decoded.classId);
        })

        socket.on('listen-class', data => {

            //decode data
            let decoded = decode(data);
            let listClassId = decoded.listClassId;

            if(!listClassId) return;

            listClassId.array.forEach(classId => {
                socket.join(classId);
            });

        })

        socket.on('user-connect', data => {

            //decode data
            let decoded = decode(data);
            let userId = decoded.userId;

            socket.join('user:' + userId);

        })

        socket.on('noti-evaluated', data => {

            //decode data
            let decoded = data;
            let listUserId = data.listUserId.split(',');

            let emitData = {
                message: decoded.message,
                createdBy: decoded.createdBy,
                href: decoded.href,
            }

            console.log(emitData)
            //send to user
            for(let userId of listUserId)
                socket.to('user:' + userId).emit('noti-evaluated', emitData);

        })

        //user send message
        socket.on('send-chat-message', data => {
            //data : { username, message , classId}

            let decoded = decode(data);
            //check token
            if (decoded == null) return;
            console.log(decoded);

            let messageData = {
                username: decoded.username,
                message: decoded.message,
                sendtime: getDatetime()
            };

            //send to room same class id
            socket.to(decoded.classId).emit('receive-message', messageData);

            //save to db
            dbContext.updateOnePushMode('chat_class', {classId : decoded.classId}, {message: messageData});
        })
    });
};
