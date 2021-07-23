import mongoose from 'mongoose';

function getStateMessage(type: number) {
    type statusOptions = {
        [key: number]: string;
    };
    const status: statusOptions = {
        0: 'Disconected',
        1: 'Conected',
        2: 'Connecting',
        3: 'Disconnecting',
    };

    return `Mongo Database Conection Status: ${status[type]}`;
}

const mongoSettings = {
    URI: 'mongodb://localhost/movies_app',
};

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

export default async function connect() {
    try {
        const conection = await mongoose.connect(
            mongoSettings.URI,
            mongoOptions
        );
        const conectionState = conection.connection.readyState;
        console.debug(getStateMessage(conectionState));
    } catch (error) {
        console.error(`Imposible to connect to Database, Error: ${error}.`);
    }
}
