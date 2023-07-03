import type { Post } from "./data";
import { initialUsers } from "./initialUsers";

const [taketo, takuya, kourin, jaro, nico ] = initialUsers

export const p20230704u3: Post = { 
  id: "p20230704u3",
  title: "【競馬AI③】ほぼコピペだけ！LightGBMを使って、競馬の着順を予想するモデルを作成する",
  description: "前回からの続きの記事になります。",
  body: "今回は、前回加工したデータを学習させて着順予想するモデルを作成していきます。\n\nここは一旦完全にコピペのみで作成していただき、後からパラメータなどを変更していきながら最適なモデルを模索していきます。\n\n早速コピペしていきましょう。\n\n## 目次\n\n1. モデル学習コード\n2. 結果の確認\n3. モデルの改善\n4. LightGBMについて\n5. まとめ\n\n## モデル学習コード\n### コード\n以下のコードをコピペでファイルを作成してください。\n```estimation.py\nimport pandas as pd\nimport lightgbm as lgb\nfrom sklearn.model_selection\nimport train_test_split\nfrom sklearn.metrics import mean_squared_error\n\n# データの読み込み\ndata = pd.read_csv('encoded/encoded_data.csv')\n\n# 特徴量とターゲットの分割\nX = data.drop(['着順'], axis=1)  # 着順を除いた特徴量\ny = data['着順']  # ターゲット（着順）\n\n# ラベルの修正\ny = y.apply(lambda x: min(x, 16))  # 17以上の値を16に置換\n# データセットの分割\nX_train, X_valid, y_train, y_valid = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# LightGBMデータセットの作成\ntrain_data = lgb.Dataset(X_train, label=y_train)\n valid_data = lgb.Dataset(X_valid, label=y_valid)\n\nparams = {\n\t\t'objective': 'regression',  # 回帰問題\n\t\t'metric': 'rmse',  # 回帰の評価指標\n\t\t'num_leaves': 31,  # Default value\n\t\t'max_depth': -1,  # No limit\n\t\t'learning_rate': 0.1,  # Default value\n\t\t'min_child_samples': 20  # Default value\n}\n #モデルの学習\nmodel = lgb.train(params, train_data)\n# テストデータの予測\ny_pred = model.predict(X_valid)\n\n# 評価\nmse = mean_squared_error(y_valid, y_pred)\nprint('Mean Squared Error:', mse)\n\n# モデルの保存\nmodel.save_model('model/model.txt')\n\nimport numpy as np\nrmse = np.sqrt(mse)\nprint('Root Mean Squared Error:', rmse)\n```\n※着順を除外している理由\n\n競馬の着順予想は、様々なデータからどの馬が速いのかを予測します。着順はあくまでもそのレースの結果であって、速さを表す指標ではありません。\n\nレースに出ていない馬との関係性はないのに、速いと誤解させてしまいます。\n\n例えばG1で連続で2桁着順の馬と未勝利戦や1勝クラスで連続で2~3位を取っている馬を比べた場合に、未勝利戦を走っている馬の方が速いと判断されてしまうようなイメージです。\n\n### 実行\n**※実行前に「model」フォルダの作成をお忘れなく！**\n\n実行するには以下のコマンドをターミナルで打ち込んでください。\n\n```\n python estimation.py\n```\n\n実行すると「model」フォルダにファイルが作成されているはずです。\n\n## 結果の確認\n実行するとターミナルに以下のような結果が出力されます。\n\nここで確認するのは「**Root Mean Squared Error**」の値です。\n\nこちらは**予想と確定順位のズレ**を表します。なのでこの値を**できるだけ小さくすること**が、予想の精度を上げるために必要な作業となります。\n\n![](/assets/pictures/image.png)\n\n## モデルの改善\nモデルを改善するには2つの方法があります。\n\n1. 学習データの追加\n2. ハイパーパラメータの修正\n\n### 学習データの追加\nスクレイピングでは取得できるデータをほとんど取得できているので、**直近5走のデータの追加**が考えられます。\n\n**コース、斤量、人気**などは使っていません。\n\nスクレイピングで取得していない払い戻し額なども使えるかもしれません。\n\n### パラメータの修正\nパラメータは以下の部分です。今回はデフォルトのまま学習しています。\n\n```python\n params = {\n    'objective': 'regression',  # 回帰問題\n    'metric': 'rmse',  # 回帰の評価指標\n    'num_leaves': 31,  # Default value\n    'max_depth': -1,  # No limit\n    'learning_rate': 0.1,  # Default value\n    'min_child_samples': 20  # Default value\n }\n```\n\n他に使用できるパラメータは以下の通りです。\n\n以下の値を修正しながら、「Root Mean Squared Error」の値が最小になる組み合わせを探し出してみてください。\n\n```\nparams = {\n\t\t'objective': 'regression',  # 回帰問題\n\t\t'num_class': len(y.unique()) + 1,  # クラス数（修正）\n\t\t'metric': 'rmse',  # 回帰の評価指標\n\t\t'num_leaves': 31,  # Default value\n\t\t'max_depth': -1,  # No limit\n\t\t'learning_rate': 0.1,  # Default value\n\t\t'n_estimators': 100,  # Default value\n\t\t'min_child_samples': 20  # Default value\n\t\t'reg_alpha': 0,  # Default value\n\t\t'reg_lambda': 0,  # Default value\n\t\t'colsample_bytree': 1,  # Default value\n\t\t'subsample': 1,  # Default value\n\t\t'subsample_freq': 0  # Default value\n}\n```\n## LightGBMについて\nモデルを改善するにしても、ここから先は**専門的な知識**が必要になってきます\n\n。コピペだけで出来ると言ってきましたが、それだけで競馬AIが出来てしまったら、**みんなが精度の高いAIを持てるようになってしまい優位性がなくなってしまいます**。\n\n他の人より優れた予想をしたいのであれば、**勉強してモデルを改善していく必要があります**。\n\n勉強するのであれば、最近発売された以下の書籍がおススメです！\n\n![](/assets/pictures/51l+9ycLhxL._SL250_.jpg)\n\n## まとめ\nパラメータの修正を行わなければ、コピペで学習したモデルの作成が完了したと思います。\n\nパラメータの組み合わせは無限と感じるほど多く、すべての組み合わせを試すのは無理だったのではないかと思います。\n\nモデルを作成するのにも時間がかかりますし。\n\n自動でパラメータチューニングする方法もあるので、またの機会にそちらのコードも記事にしようかと思います。\n\n次は実際のレースデータを活用し、予測する方法について説明します。",
  createdAt: "2023-07-04",
  updatedAt: "2023-07-05",
  publishedAt: "2023-07-04",
  numberOf: {
    nice: 0,
    hard: 0
  },
  user: {
    id: kourin.id,
    displayName: kourin.displayName,
    profileImageUrl: kourin.profileImageUrl
  }
}
