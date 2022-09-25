# プラマイカウンター
[こちらがリンクとなります。](https://plusminuscounter.com).
ゲストユーザーとしてメールアドレスを(guest@gmail.com),パスワードを(guestguest)としてログインしてください。

![image](https://countercontainer.s3.ap-northeast-1.amazonaws.com/readme/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88+(9).png)

## なぜこのサービスを作ったのか
私たちは何か物を数えなければならない場面に遭遇します。しかし、それを面倒だと感じる人は多いと思います。数えるという行為自体を楽しめるようにしてしまえば、数えることに抵抗を感じなくなるのではないかと考えました。そのような理由から、「過程を楽しむ」をコンセプトにこのプラマイカウンターを作りました。子供から大人まで老若男女問わず楽しめると思います。

## 何ができるのか

画像、文字を最大10個まで選択した状態でカウントを行うことができます。

アカウント登録することで、達成したものをアルバムとして記録することができます。

SNSのように共有スペースで記録を共有できます。その際にいいね、コメント、閲覧数の表示の可否を予め選択できるようにしてあります。また、あとで設定を変更することもできます。

オプションとして、プロフィール画面の編集や自分のアカウントのホームで通知を受け取るかの設定などがあります。

## 使用技術

フロントエンド：Nuxt.js

バックエンド: Laravel

データベース: MySQL

サーバー: Microsoft Azure

画像保存先: aws S3

## 開発人数

個人開発

## 開発期間

2022年2月 サービス全体の大まかな構成、データベースのテーブル,カラムの定義

2022年3月 開発開始

2022年6月 Azureへデプロイ

## アウトプット

技育展2022登壇

## なぜ、フロントエンドにNuxt.js, バックエンドにLaravelを用いたのか

元々はVueとNode.jsを使った開発を行っていました。しかし、私はSPAのデメリットとしてSEO対策が難しいことが後にわかりました。そこで、少し調べたところ、SSRというものもあることを知りました。今回はそのSEO対策をきちんとしたかったので、Nuxt.jsを用いました。バックエンドに関しては、Node.jsは元々、JavaScriptがバックエンドとして使えるからという単純な理由で開発に使用していました。しかし、バックエンドを詳しく調べていくうちにLaravelの機能の豊富さに目がいきました。例えば、自動メール送信機能を実装するためにNode.jsではsendgridというAPIサービスを使っていましたが、Laravelはデフォルトでメール送信できる機能が揃っていたので、とても便利でした。

## このサービスの工夫したポイント

このサービスでは使うのが面倒だと思われたら使ってもらえなくなってしますので、説明や設定を簡潔にしました。また、ページ遷移を極力なくすことにより、新しい表示をスムーズに行えるようにしました。今回、API通信で行っているため、フロントエンドのみで解決できる問題はバックエンドに任せないようにすることで、無駄な通信をなくしました。

## 開発で苦労したところ

今回、Nuxt.jsとLaravelを使った開発は初めてだったので、とにかく調べることが多かったです。
機能を実装するためのコードを書くことよりもフロントエンドとバックエンドの接続やバックエンドとS3の接続といった接続をするための設定や環境構築が難しかったです。

## 開発で得たもの

Nuxt.js,Laravel,クラウドの知識

CSRF等のコンピュータサイエンスとしての知識

効率的な検索方法

Linuxコマンド(vim操作も含む)

Gitの知識

新しいことに挑戦することへの価値

継続力

## 今回の開発を経て思ったこと

自分でこれは無理だとすぐに限界を作らずに新しいことに挑戦してみることは大切だと感じました。今回の開発でも努力すれば自分が思っているよりもうまく行くことが多かったです。既存の知識だけでやろうとせずに新しい技術、知識を積極的に取り入れていく姿勢を今後も持ち続けたいです。
