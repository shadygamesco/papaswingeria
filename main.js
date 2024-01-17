//Set save file name(MUST NOT HAVE A FILE EXTENTION)
var savefilename = 'example';


function getMainSave() {
  var mainSave = {};

  localStorageSave = Object.entries(localStorage);
  localStorageSave = btoa(JSON.stringify(localStorageSave));
  mainSave.localStorage = localStorageSave;

  cookiesSave = document.cookie;
  cookiesSave = btoa(cookiesSave);
  mainSave.cookies = cookiesSave;

  mainSave = btoa(JSON.stringify(mainSave));
  mainSave = CryptoJS.AES.encrypt(mainSave, 'save').toString();

  return mainSave;
}

function downloadMainSave() {
  var data = new Blob([getMainSave()]);
  var dataURL = URL.createObjectURL(data);

  var fakeElement = document.createElement('a');
  fakeElement.href = dataURL;
  fakeElement.download = savefilename + '.data';
  fakeElement.click();
  URL.revokeObjectURL(dataURL);
}

function getMainSaveFromUpload(data) {
  data = CryptoJS.AES.decrypt(data, 'save').toString(CryptoJS.enc.Utf8);

  var mainSave = JSON.parse(atob(data));
  var mainLocalStorageSave = JSON.parse(atob(mainSave.localStorage));
  var cookiesSave = atob(mainSave.cookies);

  for (let item in mainLocalStorageSave) {
    localStorage.setItem(mainLocalStorageSave[item][0], mainLocalStorageSave[item][1]);
  }

  document.cookie = cookiesSave;
}

function uploadMainSave() {
  var hiddenUpload = document.createElement('input');
  hiddenUpload.type = 'file';
  hiddenUpload.accept = '.data';
  document.body.appendChild(hiddenUpload);
  hiddenUpload.click();

  hiddenUpload.addEventListener('change', function (e) {
    var files = e.target.files;
    var file = files[0];

    if (!file) {
      return;
    }

    var reader = new FileReader();

    reader.onload = function (e) {
      getMainSaveFromUpload(e.target.result);

      var uploadResult = document.querySelector('.upload-result');
      uploadResult.innerText = 'Uploaded save!';
      setTimeout(function () {
        uploadResult.innerText = '';
      }, 3000);
    };

    reader.readAsText(file);

    document.body.removeChild(hiddenUpload);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  swfobject.embedSWF("https://jonasrhee1208wastaken.github.io/cacheoswf/jacksmith.swf", 'ruffle', 800, 600);
});
