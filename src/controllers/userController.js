import { User } from '../models/UserModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';

export const GetAllUsers = async (req, res) => {
    const data = await User.findAll();
    res.send(data);   
}

export const CreateUser = async (req, res) => {
    const { name, lastname, email, password } = req.body;
    const errors = [];

    if (name.length < 3) errors.push('Nome deve ser maior ou igual a 3 caracteres.');
    if (lastname.length < 3) errors.push('Sobrenome deve ser maior ou igual a 3 caracteres.');
    if (!(validator.isEmail(email))) errors.push('Email inválido.');
    if(await User.findOne({ where: { email: email } })) errors.push('Email já utilizado.');
    if (password.length < 8) errors.push('Senha precisa ter pelo menos 8 caracteres.');
    if (req.session.user) errors.push('Saia de sua conta para poder criar um novo usuário');

    if (errors.length) {
        return res.status(400).send(errors);
    }

    const password_hash = await bcrypt.hash(password, 10);

    if(!password_hash) return res.status(500).send('Error: try again later.');

    const newUser = {
        name,
        lastname,
        email,
        password_hash,
    }
    
    try {
        // User.create(newUser).then(() => res.send(newUser));
        await User.create(newUser);

        const justCreatedUser = await User.findOne({ where: {email:email} })

        req.session.user = {
            user_id: justCreatedUser.id,
            username: justCreatedUser.name,
            loggedIn: true,
        }; 

        res.send('Conta criada com sucesso');
    } catch(err) {
        res.status(500).send('Erro ao criar usuário. Tente novamente mais tarde');
        console.log(err);
    }
}

export const LogUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).send('Campos vazios');
    if (!(validator.isEmail(email))) return res.status(400).send('Email inválido');

    const user = await User.findOne({ where: { email: email } });

    if (!user) return res.status(400).send('Email não registrado.');

    if(!(await bcrypt.compare(password, user.password_hash))) return res.status(400).send('Senha incorreta.');

    if (req.session.user) {
        console.log('Sessão já ativa.');
        return res.status(400).send('Já existe uma sessão ativa para este usuário.');
    }

    try {
        req.session.user = {
            user_id: user.id,
            username: user.name,
            loggedIn: true,
        };
    } catch (err) {
        console.log('ERRO: ' + err);
    }

    console.log(req.session.user);

    res.send('Usuário logado.');
}

export const Logout = async (req, res) => {
    if (!req.session.user) {
        return res.status(400).send('Usuário não está logado.');
    }

    try {
        await req.session.destroy();
        res.send('Você saiu');
    } catch(err) {
        res.status(500).send('Erro ao deslogar')
    }
}

export const SecuredData = async (req, res) => {
    const user = req.session.user;
    console.log(user);

    if (!user) return res.json({message: 'Usuário não está logado.'});

    res.json({
        message: `Dados seguros. Apenas usuários logados podem ver isso.`,
        user: user
    });
}

export const FindSession = async (req, res) => {
    if (req.session.user) {
        res.send(req.session.user);
    } else {
        res.status(404).send('Nenhuma sessão ativa');
    }
}