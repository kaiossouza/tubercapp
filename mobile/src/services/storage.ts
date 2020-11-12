import AsyncStorage from '@react-native-community/async-storage';
import DiaryEntry from '../models/Diary';
import { User } from '../models/user';

export async function addUser(user: User): Promise<User> {
    if(!user.id) {
        user.id = generateId();
    }

    await AsyncStorage.setItem(`${user.email}${user.password}`, JSON.stringify(user));

    return user;
}

export async function getUser(email: string, password: string): Promise<User> {
    let user = await AsyncStorage.getItem(`${email}${password}`);

    return JSON.parse(user || "{}");
}

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

function generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}