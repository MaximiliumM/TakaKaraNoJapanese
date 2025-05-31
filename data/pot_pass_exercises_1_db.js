const exercisesDB = {
  "fill": [
    {
      "jp": "私は日本語が____。",
      "kana": "わたしはにほんごが____。",
      "roma": "Watashi wa Nihongo ga ____. ",
      "hint": "yomu - Polido",
      "answer": "yomemasu",
      "pt": "Eu consigo ler japonês."
    },
    {
      "jp": "一人で旅行が____。",
      "kana": "ひとりでりょこうが____。",
      "roma": "Hitori de ryokō ga ____.",
      "hint": "suru",
      "answer": "dekiru",
      "pt": "Consigo viajar sozinho."
    },
    {
      "jp": "肉が____か。",
      "kana": "にくが____か。",
      "roma": "Niku ga ____ ka?",
      "hint": "taberu - Polido",
      "answer": "taberaremasu",
      "pt": "Você consegue comer carne?"
    },
    {
      "jp": "あの展望台に登れば、富士山が____。",
      "kana": "あのてんぼうだいにのぼれば、ふじさんが____。",
      "roma": "Ano tenbōdai ni noboreba, Fujisan ga ____.",
      "hint": "miru",
      "answer": "mirareru",
      "pt": "Se subir naquela plataforma de observação, dá para ver o Monte Fuji."
    },
    {
      "jp": "ピアノが____か。",
      "kana": "ぴあのが____か。",
      "roma": "Piano ga ____ ka?",
      "hint": "hiku - Polido",
      "answer": "hikemasu",
      "pt": "Você consegue tocar piano?"
    },
    {
      "jp": "日本語を読むことが____。",
      "kana": "にほんごをよむことが____。",
      "roma": "Nihongo o yomu koto ga ____. ",
      "hint": "suru - Polido",
      "answer": "dekimasu",
      "pt": "Sou capaz de ler japonês."
    },
    {
      "jp": "中国語も____。",
      "kana": "ちゅうごくごも____。",
      "roma": "Chūgokugo mo ____.",
      "hint": "hanasu - Polido",
      "answer": "hanasemasu",
      "pt": "Também consigo falar chinês."
    },
    {
      "jp": "今日は早く____。",
      "kana": "きょうははやく____。",
      "roma": "Kyō wa hayaku ____.",
      "hint": "neru - Polido Negativo",
      "answer": "neraremasen",
      "pt": "Hoje não consigo dormir cedo."
    },
    {
      "jp": "車を運転____。",
      "kana": "くるまをうんてん____。",
      "roma": "Kuruma o unten ____.",
      "hint": "suru - Polido",
      "answer": "dekimasu",
      "pt": "Consigo dirigir um carro."
    },
    {
      "jp": "水の中で長く息が____。",
      "kana": "みずのなかでながくいきが____。",
      "roma": "Mizu no naka de nagaku iki ga ____.",
      "hint": "tomeru",
      "answer": "tomeraremasu",
      "pt": "Consigo prender a respiração por muito tempo na água."
    },
    {
      "jp": "速く走ることが____。",
      "kana": "はやくはしることが____。",
      "roma": "Hayaku hashiru koto ga ____.",
      "hint": "suru",
      "answer": "dekiru",
      "pt": "Consigo correr rápido."
    },
    {
      "jp": "漢字が書け____か。",
      "kana": "かんじがかけ____か。",
      "roma": "Kanji ga kake____ ka?",
      "hint": "kaku - Polido",
      "answer": "kakemasu",
      "pt": "Você consegue escrever kanji?"
    },
    {
      "jp": "このアプリで予約が____。",
      "kana": "このあぷりでよやくが____。",
      "roma": "Kono apuri de yoyaku ga ____.",
      "hint": "dekiru - Polido",
      "answer": "dekimasu",
      "pt": "É possível fazer reserva com este aplicativo."
    },
    {
      "jp": "最近、年のせいで高い音が____。",
      "kana": "さいきん、としのせいでたかいおとが____。",
      "roma": "Saikin, toshi no sei de takai oto ga ____.",
      "hint": "kiku - Polido Negativo",
      "answer": "kikemasen",
      "pt": "Ultimamente, por causa da idade, não consigo ouvir sons agudos."
    },
    {
      "jp": "魚を上手に____。",
      "kana": "さかなをじょうずに____。",
      "roma": "Sakana o jōzu ni ____.",
      "hint": "tsukuru",
      "answer": "tsukureru",
      "pt": "Consigo cozinhar peixe bem."
    },
    {
      "jp": "暗くても本が____。",
      "kana": "くらくてもほんが____。",
      "roma": "Kura kute mo hon ga ____.",
      "hint": "yomeru - Polido",
      "answer": "yomemasu",
      "pt": "Mesmo no escuro consigo ler o livro."
    },
    {
      "jp": "先生に褒め____。",
      "kana": "せんせいにほめ____。",
      "roma": "Sensei ni home____.",
      "hint": "homeru - Polido Passado",
      "answer": "homeraremashita",
      "pt": "Fui elogiado pelo professor."
    },
    {
      "jp": "犬に靴を____。",
      "kana": "いぬにくつを____。",
      "roma": "Inu ni kutsu o ____.",
      "hint": "kamu - Passado",
      "answer": "kamareta",
      "pt": "Meu sapato foi mordido por um cachorro."
    },
    {
      "jp": "傘を忘れて雨に____。",
      "kana": "かさをわすれてあめに____。",
      "roma": "Kasa o wasurete ame ni ____. ",
      "hint": "furu - Passado",
      "answer": "furaremashita",
      "pt": "Esqueci o guarda-chuva e fui pego pela chuva."
    },
    {
      "jp": "泥棒に財布を____。",
      "kana": "どろぼうにさいふを____。",
      "roma": "Dorobō ni saifu o ____.",
      "hint": "nusumu - Passado",
      "answer": "nusumareta",
      "pt": "Minha carteira foi roubada por um ladrão."
    },
    {
      "jp": "大雨で試合が____。",
      "kana": "おおあめでしあいが____。",
      "roma": "Ōame de shiai ga ____. ",
      "hint": "chuushi suru - Polido",
      "answer": "chuushi saremasu",
      "pt": "O jogo é cancelado por causa da chuva forte."
    },
    {
      "jp": "友達に写真を____。",
      "kana": "ともだちにしゃしんを____。",
      "roma": "Tomodachi ni shashin o ____.",
      "hint": "toru - Passado",
      "answer": "torareta",
      "pt": "Tive minha foto tirada por um amigo."
    },
    {
      "jp": "親にゲームを____。",
      "kana": "おやにげーむを____。",
      "roma": "Oya ni geemu o ____.",
      "hint": "toriageru - Passado",
      "answer": "toriagerareta",
      "pt": "Meus pais confiscaram meu jogo."
    },
    {
      "jp": "よく犬に顔を____。",
      "kana": "よくいぬにかおを____。",
      "roma": "Yoku inu ni kao o ____. ",
      "hint": "nameru - Polido",
      "answer": "nameraremasu",
      "pt": "O cachorro frequentemente lambe meu rosto."
    },
    {
      "jp": "先生に____。",
      "kana": "せんせいに____。",
      "roma": "Sensei ni ____. ",
      "hint": "okoru - Polido Passado",
      "answer": "okoraremashita",
      "pt": "Levei uma bronca da professora."
    },
    {
      "jp": "部長に残業を____。",
      "kana": "ぶちょうにざんぎょうを____。",
      "roma": "Buchou ni zangyou o ____. ",
      "hint": "saserareru - Polido Passado",
      "answer": "saseraremashita",
      "pt": "Fui forçado a fazer hora extra pelo gerente."
    },
    {
      "jp": "妹にいつもテレビを____。",
      "kana": "いもうとにいつもテレビを____。",
      "roma": "Imouto ni itsumo terebi o ____. ",
      "hint": "kimeru - Polido",
      "answer": "kimeraremasu",
      "pt": "Minha irmã sempre decide o que assistir na TV por mim."
    },
    {
      "jp": "猫に顔を舐め____。",
      "kana": "ねこにかおをなめ____。",
      "roma": "Neko ni kao o name____.",
      "hint": "nameru - Passado",
      "answer": "namerareta",
      "pt": "Meu rosto foi lambido pelo gato."
    },
    {
      "jp": "みんなに____。",
      "kana": "みんなに____。",
      "roma": "Minna ni ____.",
      "hint": "warau - Passado",
      "answer": "warawareta",
      "pt": "Fui ridicularizado por todos. (Riram de mim)"
    },
    {
      "jp": "雪で電車が____。",
      "kana": "ゆきででんしゃが____。",
      "roma": "Yuki de densha ga ____.",
      "hint": "tomeru - Passado",
      "answer": "tomerareta",
      "pt": "O trem foi parado pela neve."
    },
    {
      "jp": "泥に靴を____。",
      "kana": "どろにくつを____。",
      "roma": "Doro ni kutsu o ____.",
      "hint": "yogosu - Passado",
      "answer": "yogosareta",
      "pt": "Meu sapato foi sujo pela lama."
    },
    {
      "jp": "台風で窓が____。",
      "kana": "たいふうでまどが____。",
      "roma": "Taifū de mado ga ____.",
      "hint": "kowasu - Passado",
      "answer": "kowasareta",
      "pt": "A janela foi quebrada pelo tufão."
    }
  ],
  "drag": [
    {
      "jp": "ここで写真が ____ 。",
      "kana": "ここでしゃしんが____。",
      "roma": "Koko de shashin ga ____.",
      "answer": "toremasu",
      "pt": "Aqui é possível tirar fotos."
    },
    {
      "jp": "途中で電車が ____ 。",
      "kana": "とちゅうででんしゃが____。",
      "roma": "Tochū de densha ga ____.",
      "answer": "tomerareta",
      "pt": "O trem foi parado no meio do caminho."
    },
    {
      "jp": "犬に顔を ____ 。",
      "kana": "いぬにかおを____。",
      "roma": "Inu ni kao o ____.",
      "answer": "namerareta",
      "pt": "Meu rosto foi lambido por um cachorro."
    },
    {
      "jp": "無料でWi‑Fiが ____ 。",
      "kana": "むりょうでわいふぁいが____。",
      "roma": "Muryou de Wi‑Fi ga ____.",
      "answer": "tsukaemasu",
      "pt": "Wi‑Fi grátis pode ser usado."
    },
    {
      "jp": "傘を忘れて雨に ____ 。",
      "kana": "かさをわすれてあめに____。",
      "roma": "Kasa o wasurete ame ni ____.",
      "answer": "furaremashita",
      "pt": "Fui pego pela chuva porque esqueci o guarda-chuva."
    },
    {
      "jp": "この川で ____ か？",
      "kana": "このかわで____か？",
      "roma": "Kono kawa de ____ ka?",
      "answer": "oyogemasu",
      "pt": "É possível nadar neste rio?"
    },
    {
      "jp": "荷物を ____ か？",
      "kana": "にもつを____か？",
      "roma": "Nimotsu o ____ ka?",
      "answer": "hakonde moraemasu",
      "pt": "Você pode carregar minha bagagem?"
    },
    {
      "jp": "鍵をなくして部屋に ____ 。",
      "kana": "かぎをなくしてへやに____。",
      "roma": "Kagi o nakushite heya ni ____.",
      "answer": "hairenai",
      "pt": "Não consigo entrar no quarto porque perdi a chave."
    },
    {
      "jp": "このアプリで防犯カメラの映像が____。",
      "kana": "このあぷりでぼうはんかめらのえいぞうが____。",
      "roma": "Kono apuri de bōhan kamera no eizō ga ____. ",
      "answer": "miraremasu",
      "pt": "Com este app, é possível ver as imagens da câmera de segurança."
    },
    {
      "jp": "友達に写真を ____ 。",
      "kana": "ともだちにしゃしんを____。",
      "roma": "Tomodachi ni shashin o ____.",
      "answer": "totte moraeta",
      "pt": "Consegui que meu amigo tirasse uma foto para mim."
    }
  ],
  "reorder": [
    {
      "sequence": [
        "watashi",
        "wa",
        "eiga",
        "ga",
        "mirarenai"
      ],
      "kanji": "私 は 映画 が 見られない",
      "kana": "わたし は えいが が みられない",
      "pt": "Não consigo assistir ao filme."
    },
    {
      "sequence": [
        "kare",
        "wa",
        "sensei",
        "ni",
        "homerareru"
      ],
      "kanji": "彼 は 先生 に 褒められる",
      "kana": "かれ は せんせい に ほめられる",
      "pt": "Ele é elogiado pelo professor."
    },
    {
      "sequence": [
        "inu",
        "ni",
        "oikakerareta"
      ],
      "kanji": "犬 に 追いかけられた",
      "kana": "いぬ に おいかけられた",
      "pt": "Fui perseguido por um cachorro."
    },
    {
      "sequence": [
        "nihongo",
        "ga",
        "yomemasu"
      ],
      "kanji": "日本語 が 読めます",
      "kana": "にほんご が よめます",
      "pt": "Consigo ler japonês."
    },
    {
      "sequence": [
        "piano",
        "ga",
        "hikemasu",
        "ka"
      ],
      "kanji": "ピアノ が 弾けます か",
      "kana": "ぴあの が ひけます か",
      "pt": "Você consegue tocar piano?"
    },
    {
      "sequence": [
        "tomodachi",
        "ni",
        "warawareta"
      ],
      "kanji": "友達 に 笑われた",
      "kana": "ともだち に わらわれた",
      "pt": "Fui zombado pelos amigos."
    },
    {
      "sequence": [
        "koko",
        "de",
        "oyogemasu",
        "ka"
      ],
      "kanji": "ここ で 泳げます か",
      "kana": "ここ で およげます か",
      "pt": "Posso nadar aqui?"
    },
    {
      "sequence": [
        "gakkou",
        "de",
        "sensei",
        "ni",
        "shitsumon",
        "saremasu"
      ],
      "kanji": "学校 で 先生 に 質問 されます",
      "kana": "がっこう で せんせい に しつもん されます",
      "pt": "O professor me faz perguntas na escola."
    },
    {
      "sequence": [
        "kanji",
        "ga",
        "kakemasu",
        "ka"
      ],
      "kanji": "漢字 が 書けます か",
      "kana": "かんじ が かけます か",
      "pt": "Você consegue escrever kanji?"
    },
    {
      "sequence": [
        "haha",
        "ni",
        "okoraremashita"
      ],
      "kanji": "母 に 怒られました",
      "kana": "はは に おこられました",
      "pt": "Levei bronca da minha mãe."
    },
    {
      "sequence": [
        "basu",
        "de",
        "tonari",
        "no",
        "hito",
        "ni",
        "ashi",
        "o",
        "fumaremashita"
      ],
      "kanji": "バス で 隣 の 人 に 足 を 踏まれました",
      "kana": "ばす で となり の ひと に あし を ふまれました",
      "pt": "Fui pisado no pé pela pessoa do lado no ônibus."
    },
    {
      "sequence": [
        "eki",
        "no",
        "chikaku",
        "de",
        "muryou",
        "no",
        "waifai",
        "ga",
        "tsukaemasu"
      ],
      "kanji": "駅 の 近く で 無料 の Wi‑Fi が 使えます",
      "kana": "えき の ちかく で むりょう の わいふぁい が つかえます",
      "pt": "Perto da estação, é possível usar Wi‑Fi gratuito."
    }
  ]
};
