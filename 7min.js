var click = new Audio('click.mp3');
var bing = new Audio('bing.mp3');
var count, stage, timer, stageCounter, stageRest, stageDone, stageTimer;
var overlay = document.querySelector('.overlay');

function reset() {
  document.querySelector('.stage-1').classList.add("active");
  document.querySelector('.stage-12').classList.remove("active");
  document.querySelector('.stage-12 .counter').innerHTML = "DONE";
  document.querySelectorAll('.stage .icons .fa').forEach(function(icon) {
    icon.classList.remove("on");
  });
  overlay.innerHTML = "<h1>Smashed it.</h1><p>Click anywhere to go again</p>";
  overlay.classList.toggle('on')
  document.querySelector('.content').classList.toggle('animate');
}

function initialiseCounters() {
  count = 1;
  stage = 1;
  timer = 3;
}

function setStageElements() {
  stageCounter = document.querySelector('.stage-' + stage + ' .counter');
  stageRest = document.querySelector('.stage-' + stage + ' .rest');
  stageDone = document.querySelector('.stage-' + stage + ' .done');
  stageTimer = document.querySelector('.stage-' + stage + ' .timer');
  stageActive = document.querySelector('.stage-' + stage);
}

function startExercise() {
  timer = 30;
  document.querySelectorAll('.stage .counter').forEach(function(counter) {
    counter.innerHTML = "--";
  });
  document.querySelector('.stage-1 .counter').innerHTML = "30";
  document.querySelector('.stage-1 .timer').classList.toggle('on')
  document.querySelector('.content').classList.toggle('animate');
  overlay.classList.toggle('on');
  overlay.classList.toggle('started')
  setStageElements();
  tick();
}

function tick(start) {
  setTimeout(function () {
    timer--;

    if (start) {
      overlay.innerHTML = timer;
      if (timer > 0) {
        tick(true)
      } else {
        startExercise()
      }
    } else {
      if (count % 40 < 30) {
        click.play();
        if (count % 40 == 0) {
          stageRest.classList.toggle('on')
          stageDone.classList.toggle('on')
          stageCounter.innerHTML = "DONE";
          stageActive.classList.toggle('active')
          stage++;
          timer = 30;
          setStageElements();
          stageActive.classList.toggle('active')
          stageTimer.classList.toggle('on')
        }
      } else if (count % 40 == 30) {
        bing.play();
        timer = 10;
        stageTimer.classList.toggle('on')
        stageRest.classList.toggle('on')
      }

      stageCounter.innerHTML = timer;
      count++;

      if (count <= 470) {
        tick();
      } else {
        bing.play();
        reset();
      }
    }
  }, 1000);
}

overlay.addEventListener('click', function() {
  if (overlay.classList.contains("started")) {
    return;
  }
  initialiseCounters();
  overlay.innerHTML = timer;
  tick(true);
  overlay.classList.toggle("started")
});

document.querySelector('.mute').addEventListener('click', function() {
  click.volume = click.volume == 1 ? 0 : 1;
  bing.volume = bing.volume == 1 ? 0 : 1;
  this.classList.toggle('fa-volume-up');
  this.classList.toggle('fa-volume-off');
});
