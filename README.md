# 我的記帳小本本 (expense tracker)

#### 此專案使用Express與MongoDB打造的記帳應用程式。



:point_right:[點我體驗!](https://peaceful-reef-01916.herokuapp.com/)

> Demo Account
> 
> Email: root@example.com
> 
> Password: 12345678

### 登入畫面
![登入](https://user-images.githubusercontent.com/82774991/160234752-25eb7d2d-742c-46ba-8e9c-ca0b9e1a5a03.PNG)

### 註冊畫面
![註冊](https://user-images.githubusercontent.com/82774991/160235312-8340537d-e07e-491c-8cd4-3a239172065d.PNG)

### 首頁畫面
 ![首頁](https://user-images.githubusercontent.com/82774991/160162640-d3c4f790-acb0-4757-beb2-8e9c67df8771.PNG)
 
### 新增畫面
![新增](https://user-images.githubusercontent.com/82774991/160234923-d000d68f-d9ff-4533-99f6-26394226310b.PNG)

### 修改畫面
![修改](https://user-images.githubusercontent.com/82774991/160234990-bd0d3caa-1d10-4f10-9abc-2fa78d23f108.PNG)

### 登出畫面
![登出](https://user-images.githubusercontent.com/82774991/160235136-20b7e9b8-b7f6-490d-8389-57d0320c38d9.PNG)


## 功能描述 (features)
* 可使用自訂使用者名稱、Email、密碼進行註冊
* 使用註冊的Email及密碼登入，也能使用Facebook進行第三方登入
* 可瀏覽全部支出紀錄
* 支出內容可新增名稱、日期、類別及金額
* 可修改支出內容及刪除支出
## 環境建置與需求 (prerequisites)
* Node.js: 10.15.0 
* Express: 4.17.1
* MongoDB: 4.2.17
* Robo 3T: 1.4.3

## 安裝與執行步驟 (installation and execution)
1.開啟終端機並輸入以下指令
```
git clone https://github.com/a22627046/expense-tracker.git
```
2.安裝專案工具
```
cd expense-tracker  //切換該專案資料夾
```
```
npm install  //安裝相關套件
```
3.啟動本地 MongoDB 資料庫

4.於Robo 3T中建立"expense-tracker"資料庫

5.利用.env.example建立.env檔案並將對應的ID與SECRET填入

6.於終端機輸入以下指令
```
npm run seed
npm run start
```
7.若看到下列訊息，表示執行成功
```
App is running on http://localhost:3000
mongodb connected!
```
點選 http://localhost:3000 瀏覽專案功能
