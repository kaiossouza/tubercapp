import AsyncStorage from '@react-native-community/async-storage';
import DiaryEntry from '../models/Diary';
import { User } from '../models/user';

export async function setDiary(entry: DiaryEntry) {
    await AsyncStorage.setItem(new Date(entry.date.toString()).toDateString(), JSON.stringify(entry));

    return entry;
}

export async function getEntry(key: string): Promise<DiaryEntry> {
    let entry = await AsyncStorage.getItem(key);

    if(entry) {
        return JSON.parse(entry || "{}");
    } else {
        return new DiaryEntry();
    }
}

export async function getCurrentEntry() {
    let currentKey = new Date().toDateString();

    return getEntry(currentKey);
}


export async function listUsers(): Promise<User[]> {
    let user = await AsyncStorage.getItem(`users`);
    return JSON.parse(user || "[]") as User[];
}

export async function addUser(user: User): Promise<User> {
    if(!user.id) {
        user.id = generateId();
    }

    var listOfUsers = await listUsers();
    listOfUsers.push(user);
    await AsyncStorage.setItem(`users`, JSON.stringify(listOfUsers));

    return user;
}

export async function updateUser(user: User): Promise<User | null> {
    var dbUser = await getUser(user.email, user.password);

    if(dbUser) {
        dbUser.id = user.id;
        dbUser.name = user.name;
        dbUser.nasc = user.nasc;
        dbUser.email = user.email;
        dbUser.gender = user.gender;
        dbUser.role = user.role;
        dbUser.canSendNews = user.canSendNews;
        dbUser.canNotify = user.canNotify;
        dbUser.password = user.password;
        dbUser.picture = user.picture;
        dbUser.treatmentStart = user.treatmentStart;
        dbUser.treatmentDuration = user.treatmentDuration;
        dbUser.diary = user.diary;

        let listOfUsers = await listUsers();
        let filteredListOfUsers = listOfUsers.filter((u) => {
            return u.email != user.email && u.password != user.password;
        });
        filteredListOfUsers.push(dbUser);

        await AsyncStorage.setItem(`users`, JSON.stringify(filteredListOfUsers));
        return dbUser;
    } else {
        return null;
    }
}

export async function getUser(email: string, password: string): Promise<User | null> {
    var listOfUsers = await listUsers();

    var dbUser = listOfUsers.filter((u) => {
        return u.email.toLowerCase() == email.toLowerCase() && u.password == password;
    });

    if(dbUser) {
        return dbUser[0];
    } else {
        return null;
    }
}

function generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}