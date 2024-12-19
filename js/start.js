const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;

//어떤 결과를 가져올지를 정하는 배열
const select = [];
//배열에 따른 결과 (어떤 결과를 가져올지 배열 내의 요소 비율에따라 띄우기)
function calResult() {
  var pointArray = [
    { name: "mouse", value: 0, key: 0 },
    { name: "cow", value: 0, key: 1 },
    { name: "tiger", value: 0, key: 2 },
    { name: "rabbit", value: 0, key: 3 },
    { name: "dragon", value: 0, key: 4 },
    { name: "snake", value: 0, key: 5 },
    { name: "horse", value: 0, key: 6 },
    { name: "sheep", value: 0, key: 7 },
    { name: "monkey", value: 0, key: 8 },
    { name: "chick", value: 0, key: 9 },
    { name: "dog", value: 0, key: 10 },
    { name: "pig", value: 0, key: 11 },
  ];
  for (let i = 0; i < endPoint; i++) {
    var target = qnaList[i].a[select[i]];
    //질문 내의 type에 담겨있는 동물의 배열을 순환
    for (let j = 0; j < target.type.length; j++) {
      for (let k = 0; k < pointArray.length; k++) {
        if (target.type[j] === pointArray[k].name) {
          pointArray[k].value += 1;
        }
      }
    }
  }
  //정렬 (밸류값을 이용)
  var resultArray = pointArray.sort(function (a, b) {
    if (a.value > b.value) {
      return -1;
    }
    if (a.value < b.value) {
      return 1;
    }
    return 0;
  });
  console.log(resultArray)
  let resultword = resultArray[0].key;
  return resultword;
}

function goResult() {
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450); // 두 번째 setTimeout 닫음
  }); // 첫 번째 setTimeout 닫음
  console.log(select);
  calResult();
} // goResult 함수 닫음

function addAnswer(answerText, qIdx, idx) {
  var a = document.querySelector(".answerBox");
  var answer = document.createElement("button");
  answer.classList.add("answerList");
  //질문 사이의 간격추가
  answer.classList.add("my-3");
  answer.classList.add("py-3");
  answer.classList.add("mx-auto");
  answer.classList.add("fadeIn");
  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener(
    "click",
    function () {
      var children = document.querySelectorAll(".answerList");
      for (let i = 0; i < children.length; i++) {
        children[i].disabled = true;
        children[i].style.WebkitAnimation = "fadeOut 0.5s";
        children[i].style.animation = "fadeOut 0.5s";
      }
      setTimeout(() => {
        select[qIdx] = idx;
        for (let i = 0; i < children.length; i++) {
          children[i].style.display = "none";
        }
        goNext(++qIdx);
      }, 450);
    },
    false
  );
}
function goNext(qIdx) {
  if (qIdx === endPoint) {
    goResult();
    return;
  }
  var q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  //게이지바
  var status = document.querySelector(".statusBar");
  status.style.width = (100 / endPoint) * (qIdx + 1) + "%";
}
function begin() {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450);
    let qIdx = 0;
    //변수로 저장후 qnaList[n] 의 n이 정상적으로 수가 증가하게 작동할수있도록 함
    goNext(qIdx);
  }, 450);
}
