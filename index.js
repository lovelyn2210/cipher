var express = require('express'); //Обьявляем пакет Express
var app = express(); //Инициализиуем экземпляр
const port = 3000; //Определяем на каком порту будет работать наше API
const cipher = require('./cipherLogic') //Логика получения CipherValue

//Обработчик /
app.get('/', async function (req, res) {
  //Ответ на запрос
  await res.send('Use this url to get Cipher Value -  /getcipher?password=PasswordToCipher&Key=ParsedKey&randomNum=ParsedrandomNum');
});

//Обработчик запроса к /getcipher
app.get('/getcipher', async function (req, res) {
    //Парсим необходимые данные из запроса
    const password = req.query.password;
    const Key = req.query.Key;
    const randomNum = req.query.randomNum;
    //Обьявляем переменную, в которой будет хранится CipherValue
    let CipherValue;
    try{
        //Получаем CipherValue
        CipherValue = cipher.GetCipher(password, Key, randomNum)
        //Отправляем полученное значение в ответ на запрос
        await res.status(200).send(CipherValue);
    }
    catch (ciphererror){
        //Ловим ошибку и отвечаем
        await res.status(500).send("Error! Can't get cipher of this password.");
    }
    
    //Выходим
    return;
    
  });

//Запуск сервера
app.listen(port, function () {
  console.log(`Joe Pesci listen at localhost:${port}!`);
});