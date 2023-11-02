const { decode } = require('./jwt');
const dbConext = require('./dbContext');

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
            
            if (decoded.classId)
                socket.join(decoded.classId);
        })

        //user send message
        socket.on('send-chat-message', data => {
            //data : { username, message , classId}

            let decoded = decode(data);
            //check token
            if (decoded == null) return;

            let messageData = {
                username: decoded.username,
                message: decoded.message,
                sendtime: getDatetime()
            };

            //send to room same class id
            socket.to(decoded.classId).emit('receive-message', messageData);

            //save to db
            dbConext.updateOnePushMode('chat_class', {classId : decoded.classId}, {message: messageData});
        })
    });
};
