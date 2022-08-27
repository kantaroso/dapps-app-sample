# dapps-app-sample

## ローカル環境

※[構築メモ](https://github.com/kantaroso/dapps-app-sample/issues/1)

```
docker-compose up -d
```

### geth起動

```
docker exec -it dapps-app-sample_geth_1 sh
```

```
geth --networkid 2525 --nodiscover --datadir /geth/private_net \
--http  --http.addr 0.0.0.0 --http.port 8545  \
--http.api "eth,net,web3,personal" --miner.gaslimit "20000000" \
--http.vhosts "*" --allow-insecure-unlock console 2> /geth/private_net/error.log
```

### truffle

```
docker exec -it dapps-app-sample_truffle_1 sh
```

### tools

```
docker exec -it dapps-app-sample_node_1 sh
```

#### gethのアカウントをmetamaskにインポートする
```
# get_private_key.js を編集する
# ※以下の部分
# ---------
# const address = '0x3a23c2452c0683458db4abfaefbe3c930cb17c37';
# const json_path = '/var/app/private_net';
# const password = 'kantaro1';
# ---------
node tools/get_private_key.js
```
