// 書き換えて利用する
const address = '0x3a23c2452c0683458db4abfaefbe3c930cb17c37';
const json_path = '/var/app/private_net';
const password = 'kantaro1';

// 秘密鍵の取得に使用する
const keythereum = require("keythereum")

// 第一引数：ユーザーアカウントのアドレス
// 第二引数：key-storeディレクトリのパス
const keyObject = keythereum.importFromFile(address, json_path)

// 第一引数：↑で指定したユーザーアカウントのパスワード　第二引数：↑で作成したkeyObject
const privateKey = keythereum.recover(password, keyObject)

// 文字列に変換
console.log(privateKey.toString('hex'))
