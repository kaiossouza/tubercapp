export interface User {
    email: string,
    senha: string
}

export default function login() {
    return new Promise<User>(resolve => {
        setTimeout(() => {
            resolve({
                    email: "email",
                    senha: "senha"
                } as User);
        }, 2000);
    });
}