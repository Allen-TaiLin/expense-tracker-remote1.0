# 老爸的私房錢 - expense-tracker

打造一個簡單的網路記帳工具。核心功能是讓使用者新增、修改與刪除「支出紀錄」，提供下拉分類選單。
![](/2_3A12_expense-tracker.png)

## Features - 產品功能

- 使用者在首頁可一次瀏覽所有支出的清單
- 使用者在首頁看到所有支出清單的總金額
- 使用者在首頁可以根據支出「類別」篩選支出項目
- 使用者可以新增一筆支出
- 使用者可以編輯支出的所有屬性 (一次只能編輯一筆)
- 使用者可以刪除任何一筆支出 (一次只能刪除一筆)
- 總金額的計算只會包括被篩選出來的支出總和

## Environment SetUp - 環境建置

1. [Node.js](https://nodejs.org/en/) (版本使用 10.15.0) - JavaScript 執行環境
2. [npm](https://nodejs.org/en/) (版本使用 6.4.1) - Node.js 的套件管理器
3. [Express](https://www.npmjs.com/package/express) (版本使用 4.17.1) - 應用程式架構
4. [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) (版本使用 5.2.0) - 模板引擎
5. [Nodemon](https://www.npmjs.com/package/nodemon) (版本使用 2.0.6) - 伺服器輔助
6. [Body-Parser](https://www.npmjs.com/package/body-parser) (版本使用 1.19.0) - Node.js body parsing middleware
7. [MongoDB](https://www.mongodb.com/) (版本使用 4.2.11) - 資料庫
8. [Mongoose](https://www.npmjs.com/package/mongoose) (版本使用 5.10.15) - MongoDB 的 ODM 可以在程式中與資料庫溝通
9. [Method-Override](https://www.npmjs.com/package/method-override) (版本使用 3.0.0) - Express 的 middleware「中介軟體」

## Use Tools - 使用工具

- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
- [Express](https://www.npmjs.com/package/express) - 應用程式架構
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎
- [MongoDB](https://www.mongodb.com/) - 資料庫
- [Robo 3T](https://robomongo.org/) - 和 MongoDB 搭配的圖形介面工具

## Installing - 專案安裝流程

1. 開啟終端機(Terminal) 或 (Git Bash) 到欲存放專案的本機位置並執行:

```
git clone https://github.com/Allen-TaiLin/expense-tracker-remote1.0.git
```

2. 開啟終端機(Terminal) 或 (Git Bash)，進入到存放此專案的資料夾

```
cd expense-tracker
```

3. 安裝 npm 套件

```
在 Git Bash 或 (Terminal) 輸入 npm install
```

4. 安裝 nodemon 套件

```
在 Git Bash 或 (Terminal) 輸入 npm install -g nodemon
```

5. 匯入種子資料到資料庫

```
在 Git Bash 或 (Terminal) 輸入 npm run seed
```

6. 啟動伺服器，執行 app.js 檔案

```
npm run dev
```

7. 當終端顯示出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
Express is listening on http://localhost:3000
mongodb connected!
```



