var click = new Audio('click.mp3');
var bing = new Audio('bing.mp3');
var count = 1;
var stage = 1;

function reset() {
  document.querySelector('.overlay.finished').classList.toggle('on')
  document.querySelector('.content').classList.toggle('animate');
  count = 1;
  stage = 1;
}

function tick() {
  setTimeout(function () {
    if (count % 40 < 30) {
      click.play();
      if (count % 40 == 0) {
        document.querySelector('.stage-' + stage + ' .rest').classList.toggle('on')
        document.querySelector('.stage-' + stage + ' .done').classList.toggle('on')
        stage++;
      }
    } else if (count % 40 == 30) {
      document.querySelector('.stage-' + stage + ' .timer').classList.toggle('off')
      document.querySelector('.stage-' + stage + ' .rest').classList.toggle('on')
      bing.play();
    }

    count++;

    if (count < 470) {
      tick();
    } else {
      bing.play();
      reset();
    }
  }, 1000);
}

document.querySelector('.overlay').addEventListener('click', function() {
  document.querySelector('.content').classList.toggle('animate');
  this.classList.toggle('on');
  tick();
});

document.querySelector('.mute').addEventListener('click', function() {
  click.volume = click.volume == 1 ? 0 : 1;
  bing.volume = bing.volume == 1 ? 0 : 1;
  this.classList.toggle('fa-volume-up');
  this.classList.toggle('fa-volume-off');
});
