import { Pigeon } from '../models/PigeonModel.js';
import cloudinary from '../../config/cloudinary.js';

export const GetAllPigeons = async (req, res) => {
    try {
        const data = await Pigeon.findAll();
        return res.send({ entries: data });   
    } catch(err) {
        console.log(err);
        res.send({ error: 'Não foi possível buscar dados agora'})
    }
}

export const CreatePigeon = async (req, res) => {
    const { anilha } = req.body;

    const photo = req.file;

    console.log(anilha, photo);

    const errors = [];

    if (!anilha || anilha.length > 20) errors.push('Adicione um valor válido para anilha');
    if (!photo) errors.push('Adicione uma foto');

    if (errors.length) {
        return res.status(400).send({ errors: errors });
    }
    
    const uploadResult = await cloudinary.uploader
    .upload(
        photo.path,
        { folder: 'pigeons' }
    )
    .catch((error) => {
        console.log(error);
        return res.status(500).send({ message: 'Erro ao fazer upload. Tente novamente mais tarde'});
    });
    
    const foto_path = uploadResult.secure_url;
    const newPigeonRegister = {
        anilha,
        foto_path
    };
    
    try {
        await Pigeon.create(newPigeonRegister);
        res.send({ message: 'Registro realizado' });
    } catch(err) {
        res.status(500).send({ message: 'Erro: tente novamente depois' });
        console.log(err);
    }
}



// export const EditPigeon = async (req, res) => {
//     const { name, lastname } = req.body;

//     if (!name || !lastname) return res.send({message: 'Dados não enviados'}).status(400);

//     const errors = [];

//     if (name.length < 3) errors.push('Nome deve ser maior ou igual a 3 caracteres.');
//     if (lastname.length < 3) errors.push('Sobrenome deve ser maior ou igual a 3 caracteres.');

//     if (errors.length) {
//         return res.status(400).send({message: errors});
//     }
    
//     try {
//         await User.update({ name: name, lastname: lastname }, { where: { id: req.session.user.user_id } });
//         res.send({message: 'Conta editada'});
//     } catch (err) {
//         res.send({ message: 'Erro ao editar usuário. Tente novamente mais tarde' }).status(500);
//         console.log(err);
//     }
// }

export const getPigeon = async (req, res) => {
    const { anilha } = req.body;

    if (!anilha) return res.send({ message: 'Número da anilha necessário' }).status(400);

    const register = await Pigeon.findOne({ where: { anilha: anilha }});

    if (register) {
        return res.send({pigeon: register});
    } else {
        return res.send({message: 'Anilha não registrada'}).status(500);
    }
}

