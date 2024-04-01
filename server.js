import app from './index.js';
import { sequelize } from './config/database.js';

sequelize.authenticate().then(() => {
    app.listen(3000, () => {
        console.log('App rodando na porta: http://localhost:3000');
    })
}).catch(err => {
    console.error('Não foi possível conectar-se ao banco de dados: ' + err);
});

