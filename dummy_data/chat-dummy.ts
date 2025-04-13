import { faker } from '@faker-js/faker';
import { writeFileSync } from 'fs';

const ROW_COUNT = 10000
const NUMBER_OF_USERS = 100


const usersId = Array.from({ length: NUMBER_OF_USERS }, (_, index) => (faker.string.uuid()));

const chatDummyData = Array.from({ length: ROW_COUNT }, (_, index) => {
    const recipientId = faker.number.int({ min: 0, max: NUMBER_OF_USERS });
    const senderId = faker.number.int({ min: 0, max: NUMBER_OF_USERS });
    return ({
        recipientId: usersId[recipientId],
        senderId: usersId[senderId == recipientId ? (recipientId + 1) % NUMBER_OF_USERS : senderId],
        content: faker.lorem.sentence(),
    })
});


const headers = Object.keys(chatDummyData[0]).join(",") + "\n";
const rows = chatDummyData.map(chat => Object.values(chat).join(",")).join("\n");

writeFileSync("output.csv", headers + rows);
