import * as nodemailer from 'nodemailer';

export default function sendPassword(email: string, senha: string){
    var remetente = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'Tuberc',
        port: 587,
        secure: true,
        auth: {
            user: 'tubercapp.fiocruz@gmail.com.br',
            pass: "tuberc123" }
    });

    var emailASerEnviado = {
        from: 'tubercapp.fiocruz@gmail.com.br',
        to: email,
        subject: "Sua nova senha no Tuberc!",
        text: `Sua nova senha para entrar no Tuberc é: ${Math.random().toString(36).slice(-8)}A!`,
    };  
    
    remetente.sendMail(emailASerEnviado, function(error: any){
        if (error) {
            alert('Erro ao enviar e-mail.');
        } else {
            alert('Email enviado com sucesso.');
        }
    });
}



