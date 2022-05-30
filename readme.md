# Dashboard - React
ukázková aplikace ve FW React
## Instalace

stáhněte si repo

spusťte:
```shell script
npm install
npm run build
npx serve
```

Otevřte adresu :)

V konfiguračním souboru lze změnit nějaké drobnosti, například vypnout debug mód (nutno přebuildit):

```
src/config/config.json
```

## Zadání

Vytvořit jednoduchou prohlížecí nástěnku v React o dvou stránkách - výpis příspěvků a detail příspěvku - pro kterou máme data ze tří endpointů:
```
https://jsonplaceholder.typicode.com/posts
https://jsonplaceholder.typicode.com/users
https://jsonplaceholder.typicode.com/comments
```

API je pro tuto úlohu omezené, nemá například stránkování, musí se řešit přes FE, nedá se dotazovat na pole potřebných id apod.. Celá úloha je tedy omezena na načtení všeho na začátku, ať to momentálně vše potřebujeme nebo ne (v praxi bychom o možnosti API rozšířili).

- používat TypeScript
- styly vyřešit pomocí scss modulů
- routování - proklik do detailu změní URL a je možné se přes URL kdykoliv dostat rovnou do detailu
- výpis bude mít pouze informaci o počtu komentářů, proklik do detailu vypíše komentáře
- vzhledu se meze nekladou, pro tvorbu UI lze využít některý z CSS frameworků (já jsem zvolila vlastní formát)