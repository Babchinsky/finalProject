const bcrypt = require('bcrypt');

const saltRounds = 10;
const password = 'adminpassword123';

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Hash:', hash);
});
