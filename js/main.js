'use strict';

{
  // クラス構文を使う
  class Panel {
    constructor() { //コンストラクターで要素の生成
      const section = document.createElement('section');
      section.classList.add('panel');

      this.img = document.createElement('img');
      this.img.src = this.getRandomImage();

      this.timeoutId = undefined;

      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop', 'inactive');
      // stopボタンのクリックイベントを指定
      this.stop.addEventListener('click', () => {
        // Stopボタン押すとそれ以降の処理はできない
        if (this.stop.classList.contains('inactive')) {
          return;
        }
        this.stop.classList.add('inactive');

        clearTimeout(this.timeoutId);

        panelsLeft--;

        if (panelsLeft === 0) {
          checkResult();
          // ゲームのリセット処理
          spin.classList.remove('inactive');
          panelsLeft = 3;
        }
      });

      // imgとstopをsectionの子要素として追加
      section.appendChild(this.img);
      section.appendChild(this.stop);

      // sectionをmainに追加
      const main = document.querySelector('main');
      // sectionをmainの子要素として追加
      main.appendChild(section);
    }

    // getRandomImageを定義
    getRandomImage() {
      const images = [
        'img/seven.png',
        'img/bell.png',
        'img/cherry.png',
      ];
      // returnにして、画像をランダムな要素に返す
      return images[Math.floor(Math.random() * images.length)];
    }

    // パネルクラスにspinメソッドを定義
    spin() {
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    }

    isUnmatched(p1, p2) {
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    unmatch() {
      this.img.classList.add('unmatched');
    }

    activate() {
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive');
    }
  }
  // パネルに対する処理
  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }
  // インスタンスを生成（配列を宣言）
  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  // あといくつ動いてるパネルが残っているかを変数で保持
  let panelsLeft = 3;

  // spinボタンにクリックイベント設定
  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    // spinボタンを押すとそれ以降の処理はできない
    if (spin.classList.contains('inavtive')) {
      return;
    }
    spin.classList.add('inactive');

    // forEachを使ってパネルの画像を切り替える
    panels.forEach(panel => {
      panel.activate();
      panel.spin();
    });
  });
}
