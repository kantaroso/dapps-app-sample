const Web3 = require('web3');
const fs = require('fs');
const moment = require('moment');
const Tx = require('@ethereumjs/tx').Transaction;
const { Common } = require('@ethereumjs/common')

const jsonKantaroToken = JSON.parse(fs.readFileSync('./json_interface/KantaroToken.sol/KantaroToken.json', 'utf8'));
const addressKantaroToken = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

// api doc
// https://web3js.readthedocs.io/en/v1.8.2/web3-eth.html
// transaction tutorial
// https://docs.web3js.org/docs/guides/sign_and_send_tx/raw

// web3初期化
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://0.0.0.0:8545"));

// ------------------------------------------------
// アカウント一覧表示
/*
web3.eth.getAccounts()
.then(result => {
    result.forEach((val) => {
        web3.eth.getBalance(val)
        .then((result) => {
            my_log('eth.getBalance', val + ' : ' + web3.utils.fromWei(result, 'ether'));
        });
    });
})
.catch(error => {
    my_log('getAccounts', error);
});
*/

// ------------------------------------------------
// トランザクションカウント取得
/*
const targetAddress = '0x697B85884D834f37b39F9aBA42488733584c884b';
web3.eth.getTransactionCount(targetAddress)
.then(result => {
    my_log('eth.getTransactionCount', result);
})
.catch(error => {
    my_log('eth.getTransactionCount', error);
});
*/
// ------------------------------------------------
// Eth送金
/*
const fromAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
const toAddress = '0x697B85884D834f37b39F9aBA42488733584c884b';
web3.eth.sendTransaction({
    from: fromAddress,
    to: toAddress,
    value: Web3.utils.toWei('1000', 'ether'),
})
.then(receipt => {
    my_log('eth.sendTransaction', receipt);
});
*/
// ------------------------------------------------
// Eth送金(署名付き)
/*
const toAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const fromAddressPrivateKey = '9837de5a7443b612e0d1dce7ce6a41322d87490dbefb24f7952f8067933dafba';
const chainId = 31337;

// この中の値は16進数必須
const rawTx = {
    to: toAddress,
    value: web3.utils.numberToHex(Web3.utils.toWei('1', 'ether')),
    // Transaction gasPrice (0) is too low for the next block, which has a baseFeePerGas of 670197580'
    gasPrice: web3.utils.numberToHex(670197580),
    // Transaction requires at least 21000 gas but got 0
    gasLimit: web3.utils.numberToHex(21000),
    // > nonce: QUANTITY - 送信者がこのトランザクションより前に送信したトランザクションの数
    // https://ethereum.org/ja/developers/docs/apis/json-rpc/
    nonce: web3.utils.numberToHex(3),
};
// プライベートチェーン使う場合は定義が必要
// https://github.com/ethereumjs/ethereumjs-tx/blob/master/examples/custom-chain-tx.ts
// https://www.npmjs.com/package/@ethereumjs/common
const customCommon = Common.custom({ chainId: chainId })
const tx = new Tx(rawTx, { common: customCommon });
const signedTx = tx.sign(Buffer.from(fromAddressPrivateKey,'hex'));
const serializedTx = signedTx.serialize();
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
.then(result => {
    my_log('eth.sendSignedTransaction', result);
});
*/

// ------------------------------------------------
// アカウント作成
// ウォレット追加作成
/*
const newAccountObject = web3.eth.accounts.create();
const newAccountWalletObject = web3.eth.accounts.wallet.add(newAccountObject.privateKey);
my_log('accounts.create -> accounts.wallet.add', newAccountWalletObject);
*/
// ------------------------------------------------
// 秘密鍵からアカウント作成
// ウォレット追加作成
/*
const privateKeyToAccount = '9837de5a7443b612e0d1dce7ce6a41322d87490dbefb24f7952f8067933dafba';
const newAccountObject = web3.eth.accounts.privateKeyToAccount(privateKeyToAccount);
const newAccountWalletObject = web3.eth.accounts.wallet.add(newAccountObject.privateKey);
my_log('accounts.privateKeyToAccount -> accounts.wallet.add', newAccountWalletObject);
*/
// ------------------------------------------------
// アカウントサインイン
/*
const privateKey = '0x71793b467d8ed5931d3dedf555c23b5e4df19207130f9e96825e743bf19bb5e0';
web3.eth.accounts.signTransaction({},privateKey)
.then(result => {
    my_log('accounts.signTransaction', result);
})
.catch(error => {
    my_log('accounts.signTransaction', error);
});
*/
// ------------------------------------------------
// アカウントの署名処理
// https://tech.drecom.co.jp/dapps-use-web3-eth-personal-sign/ -> 参考
/*
const signedAddress = '0x9b2AE3b8d4d95DCA46acD9eDbA8dF57e049ac2B9';
const privateKey = '0x71793b467d8ed5931d3dedf555c23b5e4df19207130f9e96825e743bf19bb5e0';
const signatureObject = web3.eth.accounts.sign('message', privateKey);
const recoverAddress = web3.eth.accounts.recover(signatureObject);
console.log('check ------------------------------');
console.log(signedAddress);
console.log(recoverAddress);
*/
// ------------------------------------------------
// トランザクション確認
/*
const transactionAddress = '0xa1d69263fb5223409c89d20ce1047ab04c9d2c359053dc525ca587df1029117f';
web3.eth.getTransaction(addressKantaroToken)
.then(result => {
    my_log('getTransaction', result);
})
.catch(error => {
    my_log('getTransaction', error);
});
*/
// ------------------------------------------------
// コントラクト関連
const contract = new web3.eth.Contract(jsonKantaroToken.abi, addressKantaroToken);
// ------------------------------------------------
// nft発行
/*
// const fromAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const fromAddress = '0x697B85884D834f37b39F9aBA42488733584c884b';
const toAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const currentTime = moment();
const tokenId = currentTime.format("YYYYMMDDHHmmss");
console.log('tokentId:' + tokenId);
contract.methods.safeMint(toAddress, tokenId, tokenId).send({from:fromAddress})
.then(result => {
    my_log('safeMint', result);
})
.catch(error => {
    my_log('safeMint', error);
});
*/
// ------------------------------------------------
// role確認
/*
// const fromAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const fromAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const toAddress = '0x697B85884D834f37b39F9aBA42488733584c884b';
contract.methods.hasRole(web3.utils.keccak256('MINTER_ROLE'), toAddress).call({from:toAddress})
.then(result => {
    my_log('hasRole', result);
})
.catch(error => {
    my_log('hasRole', error);
});
*/
// ------------------------------------------------
// role付与
/*
// const fromAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const fromAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const toAddress = '0x697B85884D834f37b39F9aBA42488733584c884b';
contract.methods.grantRole(web3.utils.keccak256('MINTER_ROLE'), toAddress).send({from:fromAddress})
.then(result => {
    my_log('grantRole', result);
})
.catch(error => {
    my_log('grantRole', error);
});
*/
// ------------------------------------------------
// nft発行(署名付き)
// https://docs.web3js.org/docs/guides/sign_and_send_tx/raw/
/*
const fromAddressPrivateKey = '9837de5a7443b612e0d1dce7ce6a41322d87490dbefb24f7952f8067933dafba';
const toAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const chainId = 31337;
const currentTime = moment();
const tokenId = currentTime.format("YYYYMMDDHHmmss");
console.log('tokentId:' + tokenId);
const contractMethodABI = contract.methods.safeMint(toAddress, tokenId, tokenId);
// この中の値は16進数必須
const rawTx = {
    to: addressKantaroToken,
    // Transaction gasPrice (0) is too low for the next block, which has a baseFeePerGas of 670197580'
    gasPrice: web3.utils.numberToHex(670197580),
    // Transaction requires at least 54208 gas but got 21000
    // > "Error: Transaction reverted and Hardhat couldn't infer the reason." って出たからここをあげたら通った
    gasLimit: web3.utils.numberToHex(500000),
    // > nonce: QUANTITY - 送信者がこのトランザクションより前に送信したトランザクションの数
    // https://ethereum.org/ja/developers/docs/apis/json-rpc/
    nonce: web3.utils.numberToHex(10),
    // 参考：https://docs.web3js.org/docs/guides/sign_and_send_tx/raw
    data: contractMethodABI.encodeABI(),
};
// プライベートチェーン使う場合は定義が必要
// https://github.com/ethereumjs/ethereumjs-tx/blob/master/examples/custom-chain-tx.ts
// https://www.npmjs.com/package/@ethereumjs/common
const customCommon = Common.custom({ chainId: chainId });
const tx = new Tx(rawTx, { common: customCommon });
const signedTx = tx.sign(Buffer.from(fromAddressPrivateKey,'hex'));
const serializedTx = signedTx.serialize();
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
.then(result => {
    my_log('web3.eth.sendSignedTransaction(contract)', result);
});
*/
// ------------------------------------------------
// 所持nft数確認
/*
const toAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
contract.methods.balanceOf(toAddress).call()
.then(result => {
    my_log('balanceOf', result);
})
.catch(error => {
    my_log('balanceOf', error);
});
*/
// ------------------------------------------------
// nft所有者確認

const tokenId_ownerof = 20230327153214;
contract.methods.ownerOf(tokenId_ownerof).call()
.then(result => {
    my_log('ownerOf', result);
})
.catch(error => {
    my_log('ownerOf', error);
});

// ------------------------------------------------
// nftトークンURL確認
/*
const tokenId = 20230327153214;
contract.methods.tokenURI(tokenId).call()
.then(result => {
    my_log('tokenURI', result);
})
.catch(error => {
    my_log('tokenURI', error);
});
*/

// ----------------------------
// function

function my_log(title, result) {
    console.log('--------------');
    console.log(title + ' result:');
    console.log(result)
    console.log('--------------');
}
